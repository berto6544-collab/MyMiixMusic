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
  const [Next, setNext] = React.useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.showStripe(false)
  };

  return (
 
      <Dialog open={props.open}>




      {Next == 3 ?<div style={{width:'100%'}}> 
      <DialogTitle>Invite a Friend</DialogTitle> 
        <DialogContent >
          <img src={'https://mymiix.com/stripe.jpg'} style={{width:'100%', height:150, objectFit:'cover'}} />
          <DialogContentText style={{color:'black'}}>
           Earn Followers by sharing your invite link through social media. Go to <a href={'https://mymiix.com/account'}>account</a> to see your Monetization criterias.
         </DialogContentText>
        
        

      
      <div style={{display:'flex',alignItems:'center',width:'100%'}}>
        <input  disabled={true}  style={{width:'100%'}} value={'https://mymiix.com/invite/'+props.username} />
        <Button variant={'contained' } onClick={()=>{
          window.navigator.clipboard.writeText('https://mymiix.com/invite/'+props.username+'')
        }} >CopyLink</Button>
      </div>

         <FacebookShareButton hashtag={"#join"} url={'https://mymiix.com/invite/'+props.username+''} quote={'SignUp and join the MyMiix Family Today!'} >
         <FacebookIcon size={42} round={false} />
         </FacebookShareButton>
         
         <TwitterShareButton  url={'https://mymiix.com/invite/'+props.username+''} title={'SignUp and join the MyMiix Family Today!'} >
         <TwitterIcon size={42} round={false} />
         </TwitterShareButton>

         <EmailShareButton url={'https://mymiix.com/invite/'+props.username+''}  body={props.username+' has sent you an Exclusive Invite to join the MyMiix family!'} subject={'MyMiix Exclusive INVITE. Signup and join the MyMiix Family Today!'} >
         <EmailIcon size={42} round={false} />
         </EmailShareButton>
         
         <RedditShareButton url={'https://mymiix.com/invite/'+props.username+''} title={'SignUp and join the MyMiix Family Today!'} >
         <RedditIcon size={42} round={false} />
         </RedditShareButton>
         
         <TelegramShareButton url={'https://mymiix.com/invite/'+props.username+''} title={'SignUp and join the MyMiix Family Today!'}  >
         <TelegramIcon size={42} round={false} />
         </TelegramShareButton>

        </DialogContent>
        </div>: Next ==  2 ? <div style={{width:'100%'}}> 
      <DialogTitle>Connect with Stripe </DialogTitle> 
        <DialogContent >
          <img src={'https://mymiix.com/social.png'} style={{width:'100%', height:150, objectFit:'cover'}} />
          <DialogContentText style={{color:'black'}}>
           Connect with Stripe to Monetize your posts, livestream and get subscriptions. Go to <a href={'https://mymiix.com/account'}>account</a> to see your Monetization criterias.
           When your ready Tap the start button to connect with stripe OR <i className="fa fa-bars"/> icon on the top right and tap the words Connect with Stripe.
         </DialogContentText>
         <Button style={{backgroundColor:'#007bff'}} ><a  style={{color:'white'}} href={"https://mymiix.com/wallet?reffer="+props.refferer+""} >Start</a></Button>
        

        </DialogContent>
        </div>: Next ==  1 ? <div style={{width:'100%'}}> 
      <DialogTitle>Create Your First Post </DialogTitle> 
        <DialogContent >
          <img src={'https://mymiix.com/createPost.png'} style={{width:'100%', height:150, objectFit:'cover'}} />
          <DialogContentText style={{color:'black'}}>
           <div>To Create more posts Tap <i style={{color:'#007bff'}} className="fa fa-plus-square"></i> icon on the top right</div>
         </DialogContentText>
         <Button style={{backgroundColor:'#007bff'}} ><Link style={{color:'white'}} to={'/create/post'} >Create your first post here</Link></Button>
        

        </DialogContent>
        </div>:<></>}

        <DialogActions>
          {Next == 1 ? <Button onClick={handleClose}>Skip</Button>:<></>}
          {Next > 1 ? <Button onClick={()=>{if(Next <= 1 ){ }else{ setNext(Next-1)}}}>Back</Button>:<></>}
           {Next < 3 ?<Button onClick={()=>{setNext(Next+1)}}>Next</Button>:<Button onClick={handleClose}>Finish</Button>}
        </DialogActions>
      </Dialog>
    
  );
}