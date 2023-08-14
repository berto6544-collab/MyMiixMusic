import React from 'react';

import '../css/Topnavbar.css';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import AuthApi from "./AuthApi";
import Cookies, { set } from 'js-cookie';
import { Link,useParams } from 'react-router-dom';

import Utils from '../Utility/Utils';
import Utills from '../Utility/Utils';

import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Dialogg from '../dialog-components/DialogFull';
import DialogSmall from '../dialog-components/DialogSmall';
import List from '@mui/material/List';
import Donate from '../pages/DonateDialog';
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
const urlParams = new URLSearchParams(window.location.search);
let theme = "light";
  









const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide  direction="left" ref={ref} {...props} />;
});
//<a href="/NewPost"><i className="fa fa-plus-square"/></a>
function NavbarHome(props){
const Auth = React.useContext(AuthApi);
let {refferal} = useParams();
let refer = refferal != undefined?refferal:''

const [show,setShow] = React.useState(false);
const [showStripe,setShowStripe] = React.useState(false);
const [showDonate,setShowDonate] = React.useState(false);
const [showInvite,setShowInvite] = React.useState(false);
const [name, setName] = React.useState('');
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
    
  
    
  
      Auth.setAuth("");
      Auth.setuserId("");
      Auth.setUserData([]);
      Auth.setTheme(theme)
      Cookies.remove('SCOM')
      Cookies.remove('userId')
      reactLocalStorage.clear();
      document.body.style.backgroundColor = Themes[theme].BackgroundColor;
  document.body.style.color = Themes[theme].Color;
  Utils.setThemeMode(theme);
  Auth.setTheme(theme);

   
    
    
}

const handleOnClicksignin = () =>{
    
 document.location.href = "/signin";
  
  
}

const handleClose = () => {
  setShow(false);
};



React.useEffect(()=>{






},[])


const fetchNav = ()=>{

fetch(process.env.REACT_APP_SITE+'/api/GameHostUserAuth?token='+Auth.auth)
.then(res=>res.json())
.then(response=>{

if(response.length > 0){

  setStatus(response[0].Status)
  Utils.setStatusType(response[0].Status)
  //setStatusType
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
    reactLocalStorage.set('theme','dark');
    Utils.setThemeMode('dark');
    Auth.setTheme('dark');
    document.body.style.backgroundColor = Themes['dark'].BackgroundColor;
    document.body.style.color = Themes['dark'].Color;
  }
 
};

const onClicks = () =>{
 
    setShow(true);
    
}



    return(
        <>
        <div style={{backgroundColor: 'black',color:'white',position:'sticky',top:0}}  className="navbar" >
          
            <div className="leftContainer">
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
            
            {Cookies.get('SCOM')?<div className="rightContainer">
            <div className={'navtop'}>
            
            {/*<a className={'FontsHeader'} style={{color:Themes[Utills.getThemeMode()].Color}} href={'/search/startups/'}>Find Startups</a>*/}
            
            
            </div>
            <i onClick={onClicks} style={{fontSize:'25px',color:Themes[Utills.getThemeMode()].Color}} className="fa fa-bars"/>
            
           
            </div>:<div className="rightContainer">
           
            
            {window.location.href.match(/(donate)/gi)?null:<a  style={{color:'white',fontSize:15,padding:10,marginRight:5,paddingLeft:15,paddingRight:15,backgroundColor:'rgb(0, 123, 255)',borderRadius:30 }} onClick={()=>setShowDonate(true)}>Donate</a>}
            
            
           
            <a style={{color:'rgb(0, 123, 255)',fontSize:15,padding:10,marginRight:15,paddingLeft:15,paddingRight:15,border:'1px solid rgb(0, 123, 255)',borderRadius:30 }} href={'https://mymiix.com/signin?redirect='+window.location.href}>Sign in</a>
            
           
            </div>}
            
            </div>

      


      <div style={{backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,height:'100%',color:Themes[Utils.getThemeMode()].Color}}>
    
      <Dialog  PaperProps={{
         style: {
          backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,
          position:'absolute',
          width:'70%',
          right:0

        }
      }} 
     
      
      
      fullScreen open={show}   onClose={handleClose} TransitionComponent={Transition}>
          
          
          <Toolbar style={{flex:'display',justifyContent:'end'}} >
        
            
            <IconButton edge="end"  style={{color: Themes[Utills.getThemeMode()].Color}} onClick={handleClose} aria-label="close">
              <CloseIcon style={{color: Themes[Utills.getThemeMode()].Color}}  />
            </IconButton>
          </Toolbar>
       
        <List style={{backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,height:'100%',marginTop:35}}>
        
          <div style={{width:'100%',height:'100%',flexDirection:'column',backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,alignItems:'center'}}>

         

      



          <Divider/>

          
          <a style={{ width:'100%',textDecoration:'none',color:Themes[Utills.getThemeMode()].Color}} href='https://mymiix.com/signin?redirect=https://ai.mymiix.com'><div style={{width:'100%',height:50,padding:10,flexDirection:'row',alignItems:'center'}}>
          <div  style={{width:'100%',flexDirection:'row',alignItems:'center'}}><i className="fa fa-sign-in"></i> Signin <i  style={{float:'right', alignSelf:'center'}} className="fa fa-chevron-right"></i></div>
          
          </div></a>
          
        
          <a style={{ width:'100%',textDecoration:'none'}} href={'https://mymiix.com/signup?redirect=https://ai.mymiix.com'}> <div style={{width:'100%',marginTop:20,height:50,padding:10,flexDirection:'row',alignItems:'center'}}>
          <div  style={{width:'100%',flexDirection:'row',alignItems:'center',fontWeight:500}}><i className="fa fa-user-circle"></i> Signin<i  style={{float:'right', alignSelf:'center',}} className="fa fa-chevron-right"></i></div>
          
          </div></a>
     
          
          
          
        
          
          

         
          

        </div>
          
          
        
        </List>
      </Dialog>
      
      <Dialogg isOpen={showLogin} handleClose={()=>setShowLogin(false)}  Data={<iframe  style={{width:'100%',height:'100%',position:'absolute',border:0}} src={"https://mymiix.com/signin?redirect=ai.mymiix.com"}  frameBorder={0} allowFullScreen={true}   ></iframe>} /> 
      <DialogSmall Title={'Donate'} isOpen={showDonate} handleClose={()=>setShowDonate(false)}  Data={<Donate userData={[]} username={''} Title={'Donate'} />} /> 
  
    
       </div>



            </>
    )
}




export default NavbarHome