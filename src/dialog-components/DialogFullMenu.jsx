import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import {Link} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@mui/material/Slide';





  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

function DialogsFunc(props) {

    const [show,setShow] = React.useState(false);

    const classes = useStyles();
 

    const handleClose = () => {
        setShow(false)
      };


     return ( 
         
<Dialog fullScreen open={props.isOpen}  style={{width:'100%'}} onClose={props.handleClose} TransitionComponent={Transition}>
        
{<AppBar >
          <Toolbar>
           
            <Typography variant="h6" >
             
            </Typography>
            <IconButton edge="start" color='black'  aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
     </AppBar>}
       
        
        <div style={{width:'100%',height:'100%',flexDirection:'column',backgroundColor:'rgb(240, 244, 248)',display:'flex',alignItems:'center'}}>

        


          </div>
        
      </Dialog>

 
     
     )
 
 }
 
 export default DialogsFunc;