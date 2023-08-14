import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@material-ui/icons/Close';
import 'font-awesome/css/font-awesome.min.css';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "../react-share/src/index";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "../react-share/src/index";


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(props.open);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.showStripe(false)
  };

  return (
 
      <Dialog open={props.open} >

       




    
        <DialogContent style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}} >
        

      
       
          <img src={'https://mymiix.com/stripe.jpg'} style={{width:'100%',marginBottom:5, height:150, objectFit:'cover'}} />
          <DialogContentText style={{color:'black'}}>
         Donate OR Login
         
         </DialogContentText>

         <DialogContentText style={{color:'black',marginBottom:5}}>
           Do You wish to <a href={'https://mymiix.com/donate/'+props.username}><b>DONATE</b></a>
         </DialogContentText>


<DialogContentText style={{color:'black',marginBottom:5}}>
  OR
</DialogContentText>


        <a onClick={(e)=>{
e.preventDefault();

props.loginHandler()

        }} href={'https://mymiix.com/login'} ><b>Log in</b></a>

        </DialogContent>
        
      </Dialog>
  )
}