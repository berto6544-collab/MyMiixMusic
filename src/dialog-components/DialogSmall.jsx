import React from 'react';


import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
    setOpen(false);
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
  <div style={{ display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
        <DialogTitle id="max-width-dialog-title">{props.Title}</DialogTitle>     
           
           <IconButton onClick={()=>props.handleClose()} edge="start" color='black'  aria-label="close">
             <CloseIcon />
           </IconButton>
         </div>
      
        <DialogContent>
        
         {props.Data}
        </DialogContent>
       
      </Dialog>
    </React.Fragment>
  );
}