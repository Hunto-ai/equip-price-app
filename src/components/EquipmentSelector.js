import React, { useState, useEffect } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Button, 
  Typography, 
  Grid,
  Paper,
  InputAdornment
} from '@mui/material';
import { useEquipment } from '../contexts/EquipmentContext';

const EquipmentSelector = () => {
  const { equipmentData, addEquipment } = useEquipment();
  
  // State for form fields
  const [selectedType, setSelectedType] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [specs, setSpecs] = useState({});
  const [controls, setControls] = useState({});
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  
  // Reset form when equipment type changes
  useEffect(() => {
    if (selectedType) {
      const equipment = equipmentData.find(item => item.type === selectedType);
      setSelectedEquipment(equipment);
      
      // Initialize specs based on equipment type
      const initialSpecs = {};
      if (equipment) {
        if (equipment.pricingType === 'per-ton' && equipment.specs.tons) {
          initialSpecs.tons = equipment.specs.tons.min;
          initialSpecs.pricePerTon = equipment.specs.pricePerTon;
        } else if (equipment.pricingType === 'per-btu' && equipment.specs.btu) {
          initialSpecs.btu = equipment.specs.btu.min;
          initialSpecs.pricePerBtu = equipment.specs.pricePerBtu;
        } else if (equipment.pricingType === 'per-cfm' && equipment.specs.cfm) {
          initialSpecs.cfm = equipment.specs.cfm.min;
          initialSpecs.pricePerCfm = equipment.specs.pricePerCfm;
        } else if (equipment.pricingType === 'per-hp' && equipment.specs.hp) {
          initialSpecs.hp = equipment.specs.hp.min;
          initialSpecs.pricePerHp = equipment.specs.pricePerHp;
        } else if (equipment.pricingType === 'fixed') {
          initialSpecs.basePrice = equipment.specs.basePrice;
        }
      }
      setSpecs(initialSpecs);
      
      // Initialize controls based on equipment type
      if (equipment && equipment.controls) {
        setControls({ ...equipment.controls });
      } else {
        setControls({});
      }
    } else {
      setSelectedEquipment(null);
      setSpecs({});
      setControls({});
    }
  }, [selectedType, equipmentData]);
  
  // Calculate price when specs or quantity changes
  useEffect(() => {
    if (selectedEquipment && specs) {
      let price = 0;
      
      switch (selectedEquipment.pricingType) {
        case 'per-ton':
          price = (specs.tons || 0) * (specs.pricePerTon || selectedEquipment.specs.pricePerTon);
          break;
        case 'per-btu':
          price = (specs.btu || 0) * (specs.pricePerBtu || selectedEquipment.specs.pricePerBtu);
          break;
        case 'per-cfm':
          price = (specs.cfm || 0) * (specs.pricePerCfm || selectedEquipment.specs.pricePerCfm);
          break;
        case 'per-hp':
          price = (specs.hp || 0) * (specs.pricePerHp || selectedEquipment.specs.pricePerHp);
          break;
        case 'fixed':
          price = specs.basePrice || selectedEquipment.specs.basePrice;
          break;
        default:
          price = 0;
      }
      
      setCalculatedPrice(price * quantity);
    } else {
      setCalculatedPrice(0);
    }
  }, [selectedEquipment, specs, quantity]);
  
  // Handle form submission
  const handleAddEquipment = () => {
    if (selectedEquipment) {
      const newEquipment = {
        type: selectedType,
        name: selectedEquipment.name,
        quantity,
        specs,
        controls,
        calculatedPrice,
      };
      
      addEquipment(newEquipment);
      
      // Reset form
      setSelectedType('');
      setQuantity(1);
      setSpecs({});
      setControls({});
    }
  };
  
  // Handle spec changes
  const handleSpecChange = (specName, value) => {
    const numValue = parseFloat(value) || 0;
    
    // Update the spec
    setSpecs(prevSpecs => ({
      ...prevSpecs,
      [specName]: numValue,
    }));
    
    // If changing tonnage, update price per ton (and vice versa)
    if (selectedEquipment && selectedEquipment.pricingType === 'per-ton') {
      if (specName === 'tons' && calculatedPrice > 0 && specs.pricePerTon) {
        const newPricePerTon = numValue > 0 ? calculatedPrice / (numValue * quantity) : specs.pricePerTon;
        setSpecs(prevSpecs => ({
          ...prevSpecs,
          pricePerTon: newPricePerTon,
        }));
      } else if (specName === 'pricePerTon' && specs.tons) {
        // Price per ton changed, no need to update tons
      }
    }
    
    // Similar logic for other pricing types
    // ...
  };
  
  // Handle control count changes
  const handleControlChange = (controlType, value) => {
    const numValue = parseInt(value, 10) || 0;
    setControls(prevControls => ({
      ...prevControls,
      [controlType]: numValue,
    }));
  };
  
  // Render spec inputs based on equipment type
  const renderSpecInputs = () => {
    if (!selectedEquipment) return null;
    
    const inputs = [];
    
    switch (selectedEquipment.pricingType) {
      case 'per-ton':
        inputs.push(
          <Grid item xs={12} sm={6} key="tons">
            <TextField
              fullWidth
              label="Tonnage"
              type="number"
              value={specs.tons || ''}
              onChange={(e) => handleSpecChange('tons', e.target.value)}
              inputProps={{ min: selectedEquipment.specs.tons.min, max: selectedEquipment.specs.tons.max, step: 0.1 }}
            />
          </Grid>
        );
        inputs.push(
          <Grid item xs={12} sm={6} key="pricePerTon">
            <TextField
              fullWidth
              label="Price per Ton"
              type="number"
              value={specs.pricePerTon || ''}
              onChange={(e) => handleSpecChange('pricePerTon', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        );
        break;
      case 'per-btu':
        inputs.push(
          <Grid item xs={12} sm={6} key="btu">
            <TextField
              fullWidth
              label="BTU"
              type="number"
              value={specs.btu || ''}
              onChange={(e) => handleSpecChange('btu', e.target.value)}
              inputProps={{ min: selectedEquipment.specs.btu.min, max: selectedEquipment.specs.btu.max, step: 1000 }}
            />
          </Grid>
        );
        inputs.push(
          <Grid item xs={12} sm={6} key="pricePerBtu">
            <TextField
              fullWidth
              label="Price per BTU"
              type="number"
              value={specs.pricePerBtu || ''}
              onChange={(e) => handleSpecChange('pricePerBtu', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        );
        break;
      case 'per-cfm':
        inputs.push(
          <Grid item xs={12} sm={6} key="cfm">
            <TextField
              fullWidth
              label="CFM"
              type="number"
              value={specs.cfm || ''}
              onChange={(e) => handleSpecChange('cfm', e.target.value)}
              inputProps={{ min: selectedEquipment.specs.cfm.min, max: selectedEquipment.specs.cfm.max, step: 100 }}
            />
          </Grid>
        );
        inputs.push(
          <Grid item xs={12} sm={6} key="pricePerCfm">
            <TextField
              fullWidth
              label="Price per CFM"
              type="number"
              value={specs.pricePerCfm || ''}
              onChange={(e) => handleSpecChange('pricePerCfm', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        );
        break;
      case 'per-hp':
        inputs.push(
          <Grid item xs={12} sm={6} key="hp">
            <TextField
              fullWidth
              label="Horsepower"
              type="number"
              value={specs.hp || ''}
              onChange={(e) => handleSpecChange('hp', e.target.value)}
              inputProps={{ min: selectedEquipment.specs.hp.min, max: selectedEquipment.specs.hp.max, step: 0.5 }}
            />
          </Grid>
        );
        inputs.push(
          <Grid item xs={12} sm={6} key="pricePerHp">
            <TextField
              fullWidth
              label="Price per HP"
              type="number"
              value={specs.pricePerHp || ''}
              onChange={(e) => handleSpecChange('pricePerHp', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        );
        break;
      case 'fixed':
        inputs.push(
          <Grid item xs={12} key="basePrice">
            <TextField
              fullWidth
              label="Base Price"
              type="number"
              value={specs.basePrice || ''}
              onChange={(e) => handleSpecChange('basePrice', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        );
        break;
      default:
        break;
    }
    
    return inputs;
  };
  
  // Render control inputs
  const renderControlInputs = () => {
    if (!selectedEquipment) return null;
    
    const controlTypes = ['ST', 'SW', 'SEN', 'REL', 'VA'];
    
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Control Components</Typography>
        </Grid>
        {controlTypes.map(controlType => (
          <Grid item xs={4} sm={2.4} key={controlType}>
            <TextField
              fullWidth
              label={controlType}
              type="number"
              value={controls[controlType] || 0}
              onChange={(e) => handleControlChange(controlType, e.target.value)}
              inputProps={{ min: 0, step: 1 }}
            />
          </Grid>
        ))}
      </Grid>
    );
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Equipment
      </Typography>
      
      <Grid container spacing={3}>
        {/* Equipment Type Selection */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Equipment Type</InputLabel>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              label="Equipment Type"
            >
              {equipmentData.map((equipment) => (
                <MenuItem key={equipment.id} value={equipment.type}>
                  {equipment.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {/* Quantity */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            inputProps={{ min: 1, step: 1 }}
          />
        </Grid>
        
        {/* Spec Inputs */}
        {renderSpecInputs()}
        
        {/* Control Inputs */}
        <Grid item xs={12}>
          {renderControlInputs()}
        </Grid>
        
        {/* Calculated Price */}
        <Grid item xs={12}>
          <Typography variant="h6">
            Total Price: ${calculatedPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        </Grid>
        
        {/* Add Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEquipment}
            disabled={!selectedEquipment}
            fullWidth
          >
            Add to List
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EquipmentSelector;
