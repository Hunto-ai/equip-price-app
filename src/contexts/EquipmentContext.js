import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import { initialEquipmentData } from '../data/equipmentData';
import { v4 as uuidv4 } from 'uuid';
import debounce from 'lodash.debounce';

// Create the context
const EquipmentContext = createContext();

// Define action types
const actionTypes = {
  SET_EQUIPMENT_LIST: 'SET_EQUIPMENT_LIST',
  ADD_EQUIPMENT: 'ADD_EQUIPMENT',
  REMOVE_EQUIPMENT: 'REMOVE_EQUIPMENT',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  RESET_SESSION: 'RESET_SESSION',
  LOAD_SESSION: 'LOAD_SESSION',
  SET_PROJECT_NAME: 'SET_PROJECT_NAME',
};

// Initial state
const initialState = {
  equipmentData: initialEquipmentData,
  equipmentList: [],
  settings: {
    priceAdjustments: {},
    controlCounts: {},
    lastModified: new Date().toISOString(),
  },
  projectName: 'Unnamed Project',
  projectId: uuidv4(),
};

// Reducer function
const equipmentReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_EQUIPMENT_LIST:
      return {
        ...state,
        equipmentList: action.payload,
      };
    case actionTypes.SET_PROJECT_NAME:
      return {
        ...state,
        projectName: action.payload,
      };
    case actionTypes.ADD_EQUIPMENT:
      return {
        ...state,
        equipmentList: [...state.equipmentList, action.payload],
      };
    case actionTypes.REMOVE_EQUIPMENT:
      return {
        ...state,
        equipmentList: state.equipmentList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case actionTypes.UPDATE_EQUIPMENT:
      return {
        ...state,
        equipmentList: state.equipmentList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case actionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
          lastModified: new Date().toISOString(),
        },
      };
    case actionTypes.RESET_SESSION:
      return {
        ...initialState,
        equipmentData: state.equipmentData,
      };
    case actionTypes.LOAD_SESSION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const EquipmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(equipmentReducer, initialState);
  const [savedProjects, setSavedProjects] = useState([]);

  // Load saved projects list from localStorage on initial render
  useEffect(() => {
    const savedProjectsList = localStorage.getItem('equipPriceSavedProjects');
    if (savedProjectsList) {
      try {
        const parsedProjects = JSON.parse(savedProjectsList);
        setSavedProjects(parsedProjects);
      } catch (error) {
        console.error('Error loading saved projects from localStorage:', error);
      }
    }
  }, []);

  // Load current project from localStorage on initial render
  useEffect(() => {
    const currentProjectId = localStorage.getItem('equipPriceCurrentProject');
    if (currentProjectId) {
      loadProject(currentProjectId);
    } else {
      // If no current project, check for the legacy session
      const savedSession = localStorage.getItem('equipPriceSession');
      if (savedSession) {
        try {
          const parsedSession = JSON.parse(savedSession);
          dispatch({
            type: actionTypes.LOAD_SESSION,
            payload: {
              ...parsedSession,
              projectId: state.projectId,
              projectName: state.projectName
            },
          });
        } catch (error) {
          console.error('Error loading session from localStorage:', error);
        }
      }
    }
  }, []);

  // Create debounced save function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSaveProject = useCallback(
    debounce((projectData) => {
      const projectKey = `equipPrice_project_${projectData.projectId}`;
      localStorage.setItem(projectKey, JSON.stringify(projectData));
      
      // Update the projects list if this is a new project
      const existingProjectIndex = savedProjects.findIndex(p => p.id === projectData.projectId);
      if (existingProjectIndex === -1) {
        const newProjectsList = [
          ...savedProjects,
          {
            id: projectData.projectId,
            name: projectData.projectName,
            lastModified: new Date().toISOString()
          }
        ];
        setSavedProjects(newProjectsList);
        localStorage.setItem('equipPriceSavedProjects', JSON.stringify(newProjectsList));
      } else {
        // Update the existing project in the list
        const updatedProjects = [...savedProjects];
        updatedProjects[existingProjectIndex] = {
          ...updatedProjects[existingProjectIndex],
          name: projectData.projectName,
          lastModified: new Date().toISOString()
        };
        setSavedProjects(updatedProjects);
        localStorage.setItem('equipPriceSavedProjects', JSON.stringify(updatedProjects));
      }
      
      // Set as current project
      localStorage.setItem('equipPriceCurrentProject', projectData.projectId);
    }, 1000),
    [savedProjects]
  );

  // Auto-save project whenever state changes
  useEffect(() => {
    const projectData = {
      projectId: state.projectId,
      projectName: state.projectName,
      equipmentList: state.equipmentList,
      settings: state.settings,
    };
    
    debouncedSaveProject(projectData);
  }, [state.equipmentList, state.settings, state.projectName, state.projectId, debouncedSaveProject]);

  // Calculate total price for an equipment item
  const calculateItemPrice = (item) => {
    const { type, specs, quantity } = item;
    const equipmentType = state.equipmentData.find((e) => e.type === type);
    
    if (!equipmentType) return 0;

    let basePrice = 0;
    
    switch (equipmentType.pricingType) {
      case 'per-ton':
        basePrice = specs.tons * (specs.pricePerTon || equipmentType.specs.pricePerTon);
        break;
      case 'per-btu':
        basePrice = specs.btu * (specs.pricePerBtu || equipmentType.specs.pricePerBtu);
        break;
      case 'per-cfm':
        basePrice = specs.cfm * (specs.pricePerCfm || equipmentType.specs.pricePerCfm);
        break;
      case 'per-hp':
        basePrice = specs.hp * (specs.pricePerHp || equipmentType.specs.pricePerHp);
        break;
      case 'fixed':
        basePrice = specs.basePrice || equipmentType.specs.basePrice;
        break;
      default:
        basePrice = 0;
    }
    
    return basePrice * (quantity || 1);
  };

  // Calculate total price for all equipment
  const calculateTotalPrice = () => {
    return state.equipmentList.reduce(
      (total, item) => total + calculateItemPrice(item),
      0
    );
  };

  // Calculate control totals
  const calculateControlTotals = () => {
    const totals = { ST: 0, SW: 0, SEN: 0, REL: 0, VA: 0 };
    
    state.equipmentList.forEach((item) => {
      const equipmentType = state.equipmentData.find((e) => e.type === item.type);
      if (equipmentType) {
        const quantity = item.quantity || 1;
        Object.keys(totals).forEach((controlType) => {
          const controlCount = item.controls?.[controlType] !== undefined 
            ? item.controls[controlType] 
            : equipmentType.controls[controlType];
          totals[controlType] += controlCount * quantity;
        });
      }
    });
    
    return totals;
  };

  // Group equipment by type
  const getEquipmentByType = () => {
    const grouped = {};
    
    state.equipmentList.forEach((item) => {
      if (!grouped[item.type]) {
        grouped[item.type] = [];
      }
      grouped[item.type].push(item);
    });
    
    return grouped;
  };

  // Add a new equipment item
  const addEquipment = (equipment) => {
    const newEquipment = {
      ...equipment,
      id: `${equipment.type}-${Date.now()}`,
    };
    
    dispatch({
      type: actionTypes.ADD_EQUIPMENT,
      payload: newEquipment,
    });
  };

  // Remove an equipment item
  const removeEquipment = (id) => {
    dispatch({
      type: actionTypes.REMOVE_EQUIPMENT,
      payload: id,
    });
  };

  // Update an equipment item
  const updateEquipment = (equipment) => {
    dispatch({
      type: actionTypes.UPDATE_EQUIPMENT,
      payload: equipment,
    });
  };

  // Update settings
  const updateSettings = (settings) => {
    dispatch({
      type: actionTypes.UPDATE_SETTINGS,
      payload: settings,
    });
  };

  // Reset session
  const resetSession = () => {
    dispatch({
      type: actionTypes.RESET_SESSION,
    });
  };

  // Update equipment data
  const updateEquipmentData = (newEquipmentData) => {
    dispatch({
      type: actionTypes.LOAD_SESSION,
      payload: {
        equipmentData: newEquipmentData,
      },
    });
  };

  // Set project name
  const setProjectName = (name) => {
    dispatch({
      type: actionTypes.SET_PROJECT_NAME,
      payload: name,
    });
  };

  // Create a new project
  const createNewProject = () => {
    const newProjectId = uuidv4();
    dispatch({
      type: actionTypes.RESET_SESSION,
    });
    dispatch({
      type: actionTypes.SET_PROJECT_NAME,
      payload: 'Unnamed Project',
    });
    dispatch({
      type: actionTypes.LOAD_SESSION,
      payload: {
        projectId: newProjectId,
      },
    });
  };

  // Load a project
  const loadProject = (projectId) => {
    const projectKey = `equipPrice_project_${projectId}`;
    const savedProject = localStorage.getItem(projectKey);
    
    if (savedProject) {
      try {
        const parsedProject = JSON.parse(savedProject);
        dispatch({
          type: actionTypes.LOAD_SESSION,
          payload: parsedProject,
        });
        localStorage.setItem('equipPriceCurrentProject', projectId);
        return true;
      } catch (error) {
        console.error('Error loading project from localStorage:', error);
        return false;
      }
    }
    return false;
  };

  // Delete a project
  const deleteProject = (projectId) => {
    // Remove from localStorage
    const projectKey = `equipPrice_project_${projectId}`;
    localStorage.removeItem(projectKey);
    
    // Update projects list
    const updatedProjects = savedProjects.filter(p => p.id !== projectId);
    setSavedProjects(updatedProjects);
    localStorage.setItem('equipPriceSavedProjects', JSON.stringify(updatedProjects));
    
    // If the deleted project was the current one, create a new project
    if (projectId === state.projectId) {
      createNewProject();
    }
  };

  // Context value
  const value = {
    equipmentData: state.equipmentData,
    equipmentList: state.equipmentList,
    settings: state.settings,
    projectName: state.projectName,
    projectId: state.projectId,
    savedProjects,
    addEquipment,
    removeEquipment,
    updateEquipment,
    updateSettings,
    resetSession,
    updateEquipmentData,
    calculateItemPrice,
    calculateTotalPrice,
    calculateControlTotals,
    getEquipmentByType,
    setProjectName,
    createNewProject,
    loadProject,
    deleteProject,
  };

  return (
    <EquipmentContext.Provider value={value}>
      {children}
    </EquipmentContext.Provider>
  );
};

// Custom hook to use the equipment context
export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};
