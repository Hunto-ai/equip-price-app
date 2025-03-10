import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
} from '@mui/material';
import { useEquipment } from '../contexts/EquipmentContext';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SettingsModal = ({ open, onClose }) => {
  const { equipmentData, updateEquipmentData, resetSession } = useEquipment();
  
  const [editedEquipmentData, setEditedEquipmentData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Initialize edited data when modal opens
  useEffect(() => {
    if (open) {
      setEditedEquipmentData([...equipmentData]);
      setEditingItem(null);
      setTabValue(0);
    }
  }, [open, equipmentData]);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle edit button click
  const handleEditClick = (item) => {
    setEditingItem({ ...item });
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingItem(null);
  };
  
  // Handle save edit
  const handleSaveEdit = () => {
    if (editingItem) {
      const updatedData = editedEquipmentData.map((item) =>
        item.id === editingItem.id ? editingItem : item
      );
      setEditedEquipmentData(updatedData);
      setEditingItem(null);
    }
  };
  
  // Handle spec change
  const handleSpecChange = (specType, specName, value) => {
    const numValue = parseFloat(value) || 0;
    
    setEditingItem((prev) => ({
      ...prev,
      specs: {
        ...prev.specs,
        [specType]: {
          ...prev.specs[specType],
          [specName]: numValue,
        },
      },
    }));
  };
  
  // Handle price change
  const handlePriceChange = (priceName, value) => {
    const numValue = parseFloat(value) || 0;
    
    setEditingItem((prev) => ({
      ...prev,
      specs: {
        ...prev.specs,
        [priceName]: numValue,
      },
    }));
  };
  
  // Handle control change
  const handleControlChange = (controlType, value) => {
    const numValue = parseInt(value, 10) || 0;
    
    setEditingItem((prev) => ({
      ...prev,
      controls: {
        ...prev.controls,
        [controlType]: numValue,
      },
    }));
  };
  
  // Handle save settings
  const handleSaveSettings = () => {
    updateEquipmentData(editedEquipmentData);
    onClose();
  };
  
  // Handle reset session
  const handleResetSession = () => {
    if (window.confirm('Are you sure you want to reset the session? This will clear all added equipment.')) {
      resetSession();
      onClose();
    }
  };
  
  // Render equipment table
  const renderEquipmentTable = () => {
    return (
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Equipment Type</TableCell>
              <TableCell>Specifications</TableCell>
              <TableCell>Controls</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editedEquipmentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.pricingType === 'per-ton' && (
                    <>
                      <div>Tonnage: {item.specs.tons.min} - {item.specs.tons.max}</div>
                      <div>Price per Ton: ${item.specs.pricePerTon}</div>
                    </>
                  )}
                  {item.pricingType === 'per-btu' && (
                    <>
                      <div>BTU: {item.specs.btu.min.toLocaleString()} - {item.specs.btu.max.toLocaleString()}</div>
                      <div>Price per BTU: ${item.specs.pricePerBtu}</div>
                    </>
                  )}
                  {item.pricingType === 'per-cfm' && (
                    <>
                      <div>CFM: {item.specs.cfm.min.toLocaleString()} - {item.specs.cfm.max.toLocaleString()}</div>
                      <div>Price per CFM: ${item.specs.pricePerCfm}</div>
                    </>
                  )}
                  {item.pricingType === 'per-hp' && (
                    <>
                      <div>HP: {item.specs.hp.min} - {item.specs.hp.max}</div>
                      <div>Price per HP: ${item.specs.pricePerHp}</div>
                    </>
                  )}
                  {item.pricingType === 'fixed' && (
                    <div>Base Price: ${item.specs.basePrice}</div>
                  )}
                </TableCell>
                <TableCell>
                  <div>ST: {item.controls.ST}</div>
                  <div>SW: {item.controls.SW}</div>
                  <div>SEN: {item.controls.SEN}</div>
                  <div>REL: {item.controls.REL}</div>
                  <div>VA: {item.controls.VA}</div>
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    onClick={() => handleEditClick(item)}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  // Render edit form
  const renderEditForm = () => {
    if (!editingItem) return null;
    
    return (
      <Box sx={{ mt: 3, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Edit {editingItem.name}
        </Typography>
        
        <Grid container spacing={3}>
          {/* Pricing Specs */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Pricing Specifications</Typography>
            
            {editingItem.pricingType === 'per-ton' && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Min Tonnage"
                      type="number"
                      value={editingItem.specs.tons.min}
                      onChange={(e) => handleSpecChange('tons', 'min', e.target.value)}
                      size="small"
                      margin="normal"
                      inputProps={{ step: 0.1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Max Tonnage"
                      type="number"
                      value={editingItem.specs.tons.max}
                      onChange={(e) => handleSpecChange('tons', 'max', e.target.value)}
                      size="small"
                      margin="normal"
                      inputProps={{ step: 0.1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Price per Ton"
                      type="number"
                      value={editingItem.specs.pricePerTon}
                      onChange={(e) => handlePriceChange('pricePerTon', e.target.value)}
                      size="small"
                      margin="normal"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            
            {editingItem.pricingType === 'per-btu' && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Min BTU"
                      type="number"
                      value={editingItem.specs.btu.min}
                      onChange={(e) => handleSpecChange('btu', 'min', e.target.value)}
                      size="small"
                      margin="normal"
                      inputProps={{ step: 1000 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Max BTU"
                      type="number"
                      value={editingItem.specs.btu.max}
                      onChange={(e) => handleSpecChange('btu', 'max', e.target.value)}
                      size="small"
                      margin="normal"
                      inputProps={{ step: 1000 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Price per BTU"
                      type="number"
                      value={editingItem.specs.pricePerBtu}
                      onChange={(e) => handlePriceChange('pricePerBtu', e.target.value)}
                      size="small"
                      margin="normal"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            
            {editingItem.pricingType === 'per-cfm' && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Min CFM"
                      type="number"
                      value={editingItem.specs.cfm.min}
                      onChange={(e) => handleSpecChange('cfm', 'min', e.target.value)}
                      size="small"
                      margin="normal"
                      inputProps={{ step: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Max CFM"
                      type="number"
                      value={editingItem.specs.cfm.max}
                      onChange={(e) => handleSpecChange('cfm', 'max', e.target.value)}
                      size="small"
                      margin="normal"
                      inputProps={{ step: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Price per CFM"
                      type="number"
                      value={editingItem.specs.pricePerCfm}
                      onChange={(e) => handlePriceChange('pricePerCfm', e.target.value)}
                      size="small"
                      margin="normal"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            
            {editingItem.pricingType === 'per-hp' && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Min HP"
                      type="number"
                      value={editingItem.specs.hp.min}
                      onChange={(e) => handleSpecChange('hp', 'min', e.target.value)}
                      size="small"
                      margin="normal"
                      inputProps={{ step: 0.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Max HP"
                      type="number"
                      value={editingItem.specs.hp.max}
                      onChange={(e) => handleSpecChange('hp', 'max', e.target.value)}
                      size="small"
                      margin="normal"
                      inputProps={{ step: 0.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Price per HP"
                      type="number"
                      value={editingItem.specs.pricePerHp}
                      onChange={(e) => handlePriceChange('pricePerHp', e.target.value)}
                      size="small"
                      margin="normal"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            
            {editingItem.pricingType === 'fixed' && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Base Price"
                    type="number"
                    value={editingItem.specs.basePrice}
                    onChange={(e) => handlePriceChange('basePrice', e.target.value)}
                    size="small"
                    margin="normal"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          
          {/* Control Components */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">Control Components</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={2.4}>
                <TextField
                  fullWidth
                  label="ST"
                  type="number"
                  value={editingItem.controls.ST}
                  onChange={(e) => handleControlChange('ST', e.target.value)}
                  size="small"
                  margin="normal"
                  inputProps={{ min: 0, step: 1 }}
                />
              </Grid>
              <Grid item xs={4} sm={2.4}>
                <TextField
                  fullWidth
                  label="SW"
                  type="number"
                  value={editingItem.controls.SW}
                  onChange={(e) => handleControlChange('SW', e.target.value)}
                  size="small"
                  margin="normal"
                  inputProps={{ min: 0, step: 1 }}
                />
              </Grid>
              <Grid item xs={4} sm={2.4}>
                <TextField
                  fullWidth
                  label="SEN"
                  type="number"
                  value={editingItem.controls.SEN}
                  onChange={(e) => handleControlChange('SEN', e.target.value)}
                  size="small"
                  margin="normal"
                  inputProps={{ min: 0, step: 1 }}
                />
              </Grid>
              <Grid item xs={4} sm={2.4}>
                <TextField
                  fullWidth
                  label="REL"
                  type="number"
                  value={editingItem.controls.REL}
                  onChange={(e) => handleControlChange('REL', e.target.value)}
                  size="small"
                  margin="normal"
                  inputProps={{ min: 0, step: 1 }}
                />
              </Grid>
              <Grid item xs={4} sm={2.4}>
                <TextField
                  fullWidth
                  label="VA"
                  type="number"
                  value={editingItem.controls.VA}
                  onChange={(e) => handleControlChange('VA', e.target.value)}
                  size="small"
                  margin="normal"
                  inputProps={{ min: 0, step: 1 }}
                />
              </Grid>
            </Grid>
          </Grid>
          
          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveEdit}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  // Render session management tab
  const renderSessionManagement = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Session Management
        </Typography>
        
        <Accordion>
          <AccordionSummary>
            <Typography color="error">Reset Session Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              This will clear all equipment items you've added to the calculator. This action cannot be undone.
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={handleResetSession}
            >
              Reset Session
            </Button>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary>
            <Typography>About Local Storage</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              This application automatically saves your session data to your browser's local storage.
              This means your equipment list and settings will persist even if you close the browser or refresh the page.
            </Typography>
            <Typography paragraph>
              Local storage is specific to this browser on this device. If you switch browsers or devices,
              your data will not be available.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Equipment Data" />
          <Tab label="Session Management" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          {renderEquipmentTable()}
          {renderEditForm()}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {renderSessionManagement()}
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveSettings} variant="contained" color="primary">
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsModal;
