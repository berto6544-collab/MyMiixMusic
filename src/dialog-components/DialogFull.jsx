import React from 'react';

import '../css/Topnavbar.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';


import Cookies, { set } from 'js-cookie';
import { Link } from 'react-router-dom';


import Dialog from '@mui/material/Dialog';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

import Slide from '@mui/material/Slide';







 
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide  direction={'up'} ref={ref} {...props} />;
});
function DialogsFunc(props) {

    const [show,setShow] = React.useState(false);

 

    const handleClose = () => {
        setShow(false)
      };


     return ( 
         
<Dialog fullScreen open={props.isOpen}   onClose={props.handleClose} >
       
           {
          <Toolbar>
           
           
            <IconButton onClick={props.handleClose} edge="start" color='black'  aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
     }
       
        
        <div style={{width:'100%',height:'100%',flexDirection:'column',alignItems:'center'}}>

        {props.Data}

          </div>
        
      </Dialog>

 
     
     )
 
 }
 
 export default DialogsFunc;