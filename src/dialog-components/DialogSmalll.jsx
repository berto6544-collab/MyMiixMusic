import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



export default function MaxWidthDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

 

  const handleClose = () => {
    props.setshow(false)
    
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      
    
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.isOpen}
        
        aria-labelledby="max-width-dialog-title"
      >
        <DialogActions>
          
          <IconButton edge="end" style={{alignSelf:'end'}} color='black' onClick={handleClose}  aria-label="close">
            <CloseIcon />
          </IconButton>

       
        </DialogActions>

        <DialogTitle id="max-width-dialog-title">{props.Title}</DialogTitle>
        <DialogContent>
        {props.Data}
        </DialogContent>
       
      </Dialog>
    </React.Fragment>
  );
}