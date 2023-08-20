import React from 'react';

import '../css/Topnavbar.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import AuthApi from "./AuthApi";
import Cookies, { set } from 'js-cookie';
import { Link } from 'react-router-dom';

import Utils from '../Utility/Utils';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Dialogg from '../dialog-components/DialogFull';
import DialogSmall from '../dialog-components/DialogSmall';
import Donate from '../pages/DonateDialog';
import List from '@mui/material/List';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';

import {reactLocalStorage} from 'reactjs-localstorage';
import ExploreIcon from '@mui/icons-material/Explore';
import * as Themes from '../Utility/Theme';
import Logo from '../assets/logo.png'
import { WindowSharp } from '@mui/icons-material';
const urlParams = new URLSearchParams(window.location.search);
let theme = "light";
  


const readTheme = () =>{
    theme =  reactLocalStorage.get('theme')
   
    if(theme){
     Utils.setThemeMode(theme);
    }else{
    Utils.setThemeMode('light');
     
    }
 
    return theme;
  }







const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide  direction={'left'} ref={ref} {...props} />;
});
//<a href="/NewPost"><i className="fa fa-plus-square"/></a>
function NavbarHome(props){
const Auth = React.useContext(AuthApi);
const [show,setShow] = React.useState(false);
const [showStripe,setShowStripe] = React.useState(false);
const [showInvite,setShowInvite] = React.useState(false);
const [name, setName] = React.useState('');
const [Credit, setCredit] = React.useState('0');
const [showDonate,setShowDonate] = React.useState(false);
const [showCredit,setShowCredit] = React.useState(false);
const [username, setUserName] = React.useState('');
const [profile, setProfile] = React.useState('');
const [verification, setVerification] = React.useState(0);
const [StripeAccount, setStripeAccount] = React.useState('');
const [Status, setStatus] = React.useState('');
const [dataSource, setdataSource] = React.useState([]);
const [showLogin, setShowLogin] = React.useState(false);
const [state, setState] = React.useState({
  checkedB: true,
});
const[userType,setuserType] = React.useState("");




const handleOnClickLogOut = () =>{
    
  
  
  Cookies.remove('SCOM',{domain:'.mymiix.com'})
    Cookies.remove('SCOM_',{domain:'.mymiix.com'})
    Cookies.remove('userId',{domain:'.mymiix.com'})
    Auth.setAuth("");
    Auth.setuserId("");
    Auth.setUserData([]);
    Auth.setTheme(theme)
    
   
   
    reactLocalStorage.clear();
    document.body.style.backgroundColor = Themes[theme].BackgroundColor;
document.body.style.color = Themes[theme].Color;
Utils.setThemeMode(theme);
Auth.setTheme(theme);
window.location.href = "/";


fetch('https://mymiix.com/public/logout.php')
.then(response => {response.text()})
.then(responseJSON => {
  Auth.setAuth("");
  document.body.style.backgroundColor = Themes['light'].BackgroundColor;
document.body.style.color = Themes['light'].Color;
Utils.setThemeMode('light');
Auth.setTheme('light');

})
  
  
}

const handleOnClicksignin = () =>{
    
 document.location.href = "/signin";
  
  
}


const handleClose = () => {
  setShow(false);
};



React.useEffect(()=>{



  readTheme();

  


},[])


const fetchNav = ()=>{

fetch(process.env.REACT_APP_SITE+'/api/GameHostUserAuth?token='+Auth.auth)
.then(res=>res.json())
.then(response=>{

if(response.length > 0){

  setStatus(response[0].Status)
  Utils.setStatusType(response[0].Status)

}

})

}



const handleChange = (event) => {

  if(Utils.getThemeMode() == 'dark'){
    setState({checkedB: false});
    reactLocalStorage.set('theme','light');
    Utils.setThemeMode('light');
    Auth.setTheme('light');
    document.body.style.backgroundColor = Themes['light'].BackgroundColor;
    document.body.style.color = Themes['light'].Color;

  }else{
    setState({checkedB: true});
    reactLocalStorage.set('theme','light');
    Utils.setThemeMode('light');
    Auth.setTheme('light');
    document.body.style.backgroundColor = Themes['light'].BackgroundColor;
    document.body.style.color = Themes['light'].Color;
  }
 
};

const onClicks = () =>{
 
    setShow(true);
    
}



    return(
        <>
        <div style={{backgroundColor: 'black',color:'white',position:'sticky',top:0}}  className="navbar" >
          
            <div className="leftContainer">
            <i  className={Auth.openMenu == false?"fa fa-chevron-right arrow":"fa fa-chevron-left arrow" } 
            onClick={()=>{
              Auth.setOpenMenu(!Auth.openMenu)
            }}
            style={{color:'white',borderRight:'0.1px solid rgba(255,255,255, 0.2)'}}></i>
            <a href={'/'} style={{display:'flex',paddingLeft:10,flexDirection:'row',alignItems:'center'}}>
            <img src={'https://mymiix.com/public/assets/img/logowhite.png'}  className="logo"></img>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',lineHeight:1,position:'relative'}}>
            <b style={{textDecoration:'none',fontSize:30,color:'white'}}>iix</b>
            <b style={{textDecoration:'none',color:'#0d6efd',bottom:0,position:'absolute',bottom:-10}}>Music</b>
            </div>
            </a>
            
            </div>

            <div className="middleContainer">
            
            </div>
            
            <div className="rightContainer">
            <div className={'navtop'}>
           
            </div>
            
            
            {<a  onClick={()=>{

              window.location.href = "/create/post"
            }} style={{color:'rgb(0, 123, 255)',fontWeight:'bold',fontSize:15,padding:10,marginRight:5,paddingLeft:15,paddingRight:15,backgroundColor:'white',borderRadius:30 }} >Upload</a>}
            



            <div className={'navtop'}>
            {/*window.location.href.match(/(donate)/gi)?null:<a  style={{color:'white',fontSize:15,padding:10,marginRight:5,paddingLeft:15,paddingRight:15,backgroundColor:'rgb(0, 123, 255)',borderRadius:30 }} onClick={()=>setShowDonate(true)}>Donate</a>*/}
            </div>
            {Auth.UserDatta.length > 0 && Auth.UserDatta[0].ProfileImage ? <img onClick={onClicks} style={{width:40,cursor:'pointer',height:40,objectFit:'cover',borderRadius:40,marginRight:10}} src={Auth.UserDatta[0].ProfileImage} />:<i onClick={onClicks} style={{fontSize:'25px'}} className="fa fa-bars"/>}
            
           
            </div>
            
            </div>

      


      <div style={{backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,height:'100%',color:Themes[Utils.getThemeMode()].Color}}>
    
      <Dialog  PaperProps={{
         style: {
           backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,
           position:'absolute',
           width:'70%',
           right:0,

           

           '.css-919eu4':{
            backgroundColor:'rgba(0, 0, 0, 0.9)'

          }
         }
      }}
       BackdropProps={{
        style:{
          backgroundColor:'rgba(0, 0, 0, 0.9)'
        }
       }}



     
      
      fullScreen open={show}    onClose={handleClose} TransitionComponent={Transition}>
          
          
          <Toolbar style={{flex:'display',justifyContent:'end'}} >
        
            
            <IconButton edge="end" style={{color:Themes[Utils.getThemeMode()].Color}}  onClick={handleClose} aria-label="close">
              <CloseIcon  color={Themes[Utils.getThemeMode()].Color} />
            </IconButton>
          </Toolbar>
       
        <List style={{backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,height:'100%',marginTop:35}}>
        {Cookies.get('SCOM')?<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,alignItems:'center'}}>

         


            <div style={{ width:'100%'}} > <div style={{width:'100%',display:'flex',padding:10,flexDirection:'column',alignItems:'center'}}>
            
            <img src={props.userData[0].ProfileImage} style={{width:100,height:100,borderRadius:140,objectFit:'cover'}} />
            <a href={'https://mymiix.com/@'+props.userData[0].UserName}><h4 style={{color:Themes[Utils.getThemeMode()].Color}} >{props.userData[0].UserName}</h4></a>
            
            </div></div>
           

           
            <a style={{ width:'100%',textDecoration:'none',color:Themes[Utils.getThemeMode()].Color}} href={'https://mymiix.com/account/'}> <div style={{width:'100%',height:50,padding:10,flexDirection:'row',alignItems:'center'}}>
            <div  style={{width:'100%',flexDirection:'row',alignItems:'center',}}><i className="fa fa-cog"></i>Account<i  style={{float:'right', alignSelf:'center',}} className="fa fa-chevron-right"></i></div>
            
            </div></a>
            <a style={{ width:'100%',textDecoration:'none',color:Themes[Utils.getThemeMode()].Color}} href={'https://mymiix.com/creator-portal'}> <div style={{width:'100%',height:50,padding:10,flexDirection:'row',alignItems:'center'}}>
            <div  style={{width:'100%',flexDirection:'row',alignItems:'center',}}><i className="fa fa-cog"></i>creator portal<i  style={{float:'right', alignSelf:'center',}} className="fa fa-chevron-right"></i></div>
            
            </div></a>
            
           

          
          
            

           
           
            <Divider/>
            
            
            
            
           
            
            
            <a style={{ width:'100%',textDecoration:'none',color:Themes[Utils.getThemeMode()].Color}} href={'https://games.mymiix.com/donate'}> <div style={{width:'100%',height:50,padding:10,flexDirection:'row',alignItems:'center'}}>
            <div  style={{width:'100%',flexDirection:'row',alignItems:'center',}}><i className="fa fa-cog"></i>Donate<i  style={{float:'right', alignSelf:'center',}} className="fa fa-chevron-right"></i></div>
            
            </div></a>


            <a style={{ width:'100%',textDecoration:'none',color:Themes[Utils.getThemeMode()].Color}} href='https://mymiix.com/support/'><div style={{width:'100%',height:50,padding:10,flexDirection:'row',alignItems:'center'}}>
            <div  style={{width:'100%',flexDirection:'row',alignItems:'center',}}><i className="fa fa-globe"></i>Support <i  style={{float:'right', alignSelf:'center',}} className="fa fa-chevron-right"></i></div>
            
            </div></a>

            <Divider/>

            
            <a style={{ width:'100%',textDecoration:'none',color:Themes[Utils.getThemeMode()].Color}} onClick={(e)=>{
              //e.preventDefault();
              handleOnClickLogOut();
            }}><div style={{width:'100%',height:50,padding:10,flexDirection:'row',alignItems:'center'}}>
            <div  style={{width:'100%',flexDirection:'row',alignItems:'center',}}><i className="fa fa-sign-out"></i>sign out <i  style={{float:'right', alignSelf:'center',}} className="fa fa-chevron-right"></i></div>
            
            </div></a>

          </div>:
          <div style={{width:'100%',height:'100%',flexDirection:'column',backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,alignItems:'center'}}>

         

          
         
         
           
           
          
        
          
          
      

          

          <a href={'https://mymiix.com/signin'} style={{width:'100%',textDecoration:'none',color:Themes[Utils.getThemeMode()].Color,height:50,padding:10,flexDirection:'row',color:Themes[Utils.getThemeMode()].Color,alignItems:'center'}}>
            <div  style={{width:'100%',flexDirection:'row',alignItems:'center',}}><i className="fa fa-sign-in"></i> Sign in <i  style={{float:'right', alignSelf:'center',}} className="fa fa-chevron-right"></i></div>
            
            </a>
          
          
        
          <a style={{ width:'100%',textDecoration:'none',color:Themes[Utils.getThemeMode()].Color}} href={'https://mymiix.com/createaccount'}> <div style={{width:'100%',fontWeight:'bold',marginTop:20,backgroundColor:Themes[Utils.getThemeMode()].CyanTextColor,color:Themes[Utils.getThemeMode()].MainButtonColorText,height:50,padding:10,flexDirection:'row',alignItems:'center'}}>
          <div  style={{width:'100%',flexDirection:'row',alignItems:'center'}}><i className="fa fa-credit-card"></i> Sign up<i  style={{float:'right', alignSelf:'center',}} className="fa fa-chevron-right"></i></div>
          
          </div></a>
     
          
          
          
        
          
          

         
          

        </div>
          
          
          }
        </List>
      </Dialog>
      
      <Dialogg isOpen={showLogin} handleClose={()=>setShowLogin(false)}  Data={<iframe  style={{width:'100%',height:'100%',position:'absolute',border:0}} src={"https://mymiix.com/signin?redirect="+window.location.href}  allowFullScreen={true}   ></iframe>} /> 
      <DialogSmall Title={'Donate'} isOpen={showDonate} handleClose={()=>setShowDonate(false)}  Data={<Donate Title={'Donate'} userData={props.userData} username={''} />} /> 
      <DialogSmall Title={'Credit'} isOpen={showCredit} handleClose={()=>setShowCredit(false)}  Data={
      <div style={{display:'flex',flexDirection:'column',textAlign:'center',alignItems:'center'}}>
        <h1>Credit</h1>
        <p>When you finish your credit, you will need to make payment to an artist on mymiix</p>
        <p>By paying artists, you will be supporting real artists continuing their artistry.</p>


      </div>} /> 
  
      
      
       </div>



            </>
    )
}




export default NavbarHome