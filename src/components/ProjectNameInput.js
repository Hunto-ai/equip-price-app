import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, ClickAwayListener, Tooltip } from '@mui/material';
import { useEquipment } from '../contexts/EquipmentContext';

const ProjectNameInput = () => {
  const { projectName, setProjectName } = useEquipment();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(projectName);
  const inputRef = useRef(null);

  useEffect(() => {
    // Update the edit value when the project name changes
    setEditValue(projectName);
  }, [projectName]);

  useEffect(() => {
    // Focus the input when entering edit mode
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleFinishEditing = () => {
    if (editValue.trim() !== '') {
      setProjectName(editValue.trim());
    } else {
      setEditValue(projectName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFinishEditing();
    } else if (e.key === 'Escape') {
      setEditValue(projectName);
      setIsEditing(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
      {isEditing ? (
        <ClickAwayListener onClickAway={handleFinishEditing}>
          <TextField
            inputRef={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            variant="standard"
            autoComplete="off"
            sx={{
              width: '200px',
              '& .MuiInputBase-root': {
                color: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'inherit',
              },
            }}
          />
        </ClickAwayListener>
      ) : (
        <Tooltip title="Click to rename project">
          <Typography
            variant="h6"
            component="div"
            onClick={handleStartEditing}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {projectName}
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
};

export default ProjectNameInput;
