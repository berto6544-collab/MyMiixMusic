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
} from "../react-share/src/";

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
} from "../react-share/src/";



export default function FormDialog(props) {
  const [open, setOpen] = React.useState(props.open);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.showStripe(false)
  };

  return (
 
      <Dialog open={props.open}  onClose={handleClose}>

       

         <DialogActions>
          
          <IconButton edge="end" style={{alignSelf:'end'}} color='black' onClick={handleClose}  aria-label="close">
            <CloseIcon />
          </IconButton>

       
        </DialogActions>
    

    
        <DialogContent style={{position:'relative',display:'flex',alignItems:'center',flexDirection:'column'}} >
        

        <DialogTitle>Invite A Friend To DropIn Today!</DialogTitle> 
       
          
          

         <div style={{display:'flex',alignItems:'center',width:'100%',marginBottom:5}}>
        <input  disabled={true}  style={{width:'100%'}} value={'https://mymiix.com/room/'+props.stream} />
        <Button variant={'contained' } onClick={()=>{
          window.navigator.clipboard.writeText('https://mymiix.com/room/'+props.stream+'')
        }} >CopyLink</Button>
      </div>
         
<div style={{display:'flex',alignItems:'center'}}>
         <FacebookShareButton  url={'https://mymiix.com/room/'+props.stream+''} quote={'DropIn Today!'} >
         <FacebookIcon size={42} round={true} />
         </FacebookShareButton>
         
         <TwitterShareButton  url={'https://mymiix.com/room/'+props.stream+''} title={'DropIn Today!'} >
         <TwitterIcon size={42} round={true} />
         </TwitterShareButton>

         <EmailShareButton url={'https://mymiix.com/room/'+props.stream+''}  body={props.username+' has sent you an Exclusive Invite to DropIn to talk!'} subject={props.username+' Exclusive INVITE To MyMiix Unite!'} >
         <EmailIcon size={42} round={true} />
         </EmailShareButton>
         
         <RedditShareButton url={'https://mymiix.com/room/'+props.stream+''} title={'DropIn Today!'} >
         <RedditIcon size={42} round={true} />
         </RedditShareButton>
         
         <TelegramShareButton url={'https://mymiix.com/room/'+props.stream+''} title={'DropIn Today!'}  >
         <TelegramIcon size={42} round={true} />
         </TelegramShareButton>

         </div>

         

        </DialogContent>
        
      </Dialog>
  )
}