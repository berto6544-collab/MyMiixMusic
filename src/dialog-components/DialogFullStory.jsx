import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';;
import Slide from '@mui/material/Slide';



  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DialogsFunc(props) {

    const [show,setShow] = React.useState(false);

    const classes = useStyles();
 

    const handleClose = () => {
        setShow(false)
      };


     return ( 
         
<Dialog style={{backgroundColor:'black',color:'white'}} fullScreen open={props.isOpen}  onClose={props.handleClose} >
     
        
        <div style={{width:'100%',height:'100%',backgroundColor:'black',flexDirection:'column',alignItems:'center',position:'absolute'}}>
        

        {props.Data}

          </div>
        
      </Dialog>

 
     
     )
 
 }
 
 export default DialogsFunc;