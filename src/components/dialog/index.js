import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Badge, Chip } from '@mui/material';
import { grey } from '@mui/material/colors';
import baseTheme from '../../style/theme';
import { ThemeProvider } from '@emotion/react';


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props}  
  />
    </Draggable>
  );
}

const DraggableDialog = ({ title, text, buttonText, startIcon, variant, badgeContent, chipIcon, handleReset }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <ThemeProvider theme={baseTheme} >
      <Badge badgeContent={badgeContent} color="primary">
        <Button
          onClick={handleClickOpen}
          startIcon={startIcon}
          size="small"
          variant={variant}
        >
          {buttonText}
        </Button>
      </Badge>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth='md'        
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <Chip icon={chipIcon} label={title} sx={{fontWeight : 600}}  onClick={handleReset} />    
        </DialogTitle>
        <DialogContent sx={{  backgroundColor : grey[100]  }}>
          {text}
        </DialogContent>
        <DialogActions sx={{m:2}}>
          <Button autoFocus onClick={handleClose} variant='outlined' size='small'>
          Annuler
          </Button>
          <Button onClick={handleClose} variant='contained' size='small'>Appliquer</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default DraggableDialog;
