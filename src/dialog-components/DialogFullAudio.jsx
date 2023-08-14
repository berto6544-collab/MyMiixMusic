import React from 'react';

import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';




  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DialogsFunc(props) {

    const [show,setShow] = React.useState(false);

 
 

    const handleClose = () => {
        setShow(false)
      };


     return ( 
         
<Dialog fullScreen open={props.isOpen}  onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={'tt'}>
          <Toolbar>
           
            <Typography variant="h6" className={'tt'}>
              {props.title}
            </Typography>
            <IconButton edge="start" color='black' onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <div style={{width:'100%',height:'100%',flexDirection:'column',position:'relative',alignItems:'center'}}>

        {props.Data}

          </div>
        
      </Dialog>

 
     
     )
 
 }
 
 export default DialogsFunc;