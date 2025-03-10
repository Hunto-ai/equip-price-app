import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  Box,
  Alert,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddIcon from '@mui/icons-material/Add';
import { useEquipment } from '../contexts/EquipmentContext';

const SaveManagerModal = ({ open, onClose }) => {
  const { 
    savedProjects, 
    projectId, 
    loadProject, 
    deleteProject, 
    createNewProject 
  } = useEquipment();
  
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loadError, setLoadError] = useState(false);

  const handleLoadProject = (id) => {
    const success = loadProject(id);
    if (success) {
      onClose();
    } else {
      setLoadError(true);
      setTimeout(() => setLoadError(false), 3000);
    }
  };

  const handleDeleteProject = (id) => {
    if (confirmDelete === id) {
      deleteProject(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      // Auto-reset confirmation after 3 seconds
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const handleCreateNewProject = () => {
    createNewProject();
    onClose();
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      aria-labelledby="save-manager-dialog-title"
    >
      <DialogTitle id="save-manager-dialog-title">
        Project Manager
      </DialogTitle>
      
      <DialogContent>
        {loadError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load project. The save file may be corrupted.
          </Alert>
        )}
        
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleCreateNewProject}
            fullWidth
          >
            Create New Project
          </Button>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          Saved Projects
        </Typography>
        
        {savedProjects.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            No saved projects found. Create a new project to get started.
          </Typography>
        ) : (
          <List>
            {savedProjects.map((project) => (
              <ListItem
                key={project.id}
                sx={{
                  bgcolor: project.id === projectId ? 'action.selected' : 'inherit',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: project.id === projectId ? 'bold' : 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {project.name}
                    </Typography>
                  }
                  secondary={`Last modified: ${formatDate(project.lastModified)}`}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Load project">
                    <IconButton
                      edge="end"
                      aria-label="load"
                      onClick={() => handleLoadProject(project.id)}
                      disabled={project.id === projectId}
                    >
                      <FolderOpenIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={confirmDelete === project.id ? "Click again to confirm" : "Delete project"}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteProject(project.id)}
                      color={confirmDelete === project.id ? "error" : "default"}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveManagerModal;
