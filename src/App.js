import React, { useState } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, Tab, Tabs, Button, IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EquipmentSelector from './components/EquipmentSelector';
import PricingCalculator from './components/PricingCalculator';
import ControlSummary from './components/ControlSummary';
import SettingsModal from './components/SettingsModal';
import ProjectNameInput from './components/ProjectNameInput';
import SaveManagerModal from './components/SaveManagerModal';
import { EquipmentProvider } from './contexts/EquipmentContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saveManagerOpen, setSaveManagerOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };
  
  const handleSaveManagerOpen = () => {
    setSaveManagerOpen(true);
  };
  
  const handleSaveManagerClose = () => {
    setSaveManagerOpen(false);
  };

  return (
    <EquipmentProvider>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <ProjectNameInput />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HVAC Equipment Price Calculator
            </Typography>
            <Tooltip title="Manage Projects">
              <IconButton 
                color="inherit" 
                onClick={handleSaveManagerOpen}
                sx={{ mr: 1 }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Button 
              color="inherit"
              onClick={handleSettingsOpen}
            >
              Settings
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="calculator tabs">
              <Tab label="Equipment Calculator" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Control Summary" id="tab-1" aria-controls="tabpanel-1" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <EquipmentSelector />
            <PricingCalculator />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <ControlSummary />
          </TabPanel>
        </Container>

        <SettingsModal open={settingsOpen} onClose={handleSettingsClose} />
        <SaveManagerModal open={saveManagerOpen} onClose={handleSaveManagerClose} />
      </Box>
    </EquipmentProvider>
  );
}

export default App;
