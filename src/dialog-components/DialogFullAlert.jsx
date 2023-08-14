import React from 'react';
import Dialog from '@mui/material/Dialog';

import 'font-awesome/css/font-awesome.min.css';
import Slide from '@mui/material/Slide';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DialogsFunc(props) {

    const [show,setShow] = React.useState(false);

  
 

    const handleClose = () => {
        setShow(false)
      };


     return ( 
         
<Dialog  open={props.isOpen}  onClose={props.handleClose} TransitionComponent={Transition}>
        {/*<AppBar className={classes.appBar}>
          <Toolbar>
           
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
            <IconButton edge="start" color='black' onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
     </AppBar>*/}

        <DialogTitle id="alert-dialog-title">{"Add Link"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Add Your URL so your followers can see your website.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <div style={{width:'100%',height:'100%',flexDirection:'column',alignItems:'center'}}>

        {props.Data}

        </div>
        </DialogActions>

        
        
        
      </Dialog>

 
     
     )
 
 }
 
 export default DialogsFunc;