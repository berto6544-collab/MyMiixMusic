
import React, { Component,Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route,Navigate, useLocation } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import Utils from './Utility/Utils';
import AuthApi from "./components/AuthApi";
import Cookies from 'js-cookie';
import * as Themes from './Utility/Theme';
import NavBar from './components/Navbar';
import NavBarUser from './components/userNavbar';
import Footer from './pages/musicComponents/Footer';
import FooterSpotify from './pages/musicComponents/FooterSpotify';
import {loadStripe} from '@stripe/stripe-js';
import API from './components/API/API';
import {
 Elements,
} from '@stripe/react-stripe-js';



const Landing = React.lazy(() =>  import("./pages/LandingPage"));
const Player= React.lazy(() =>  import("./pages/musicComponents/Player"));
const PlayerExplorer= React.lazy(() =>  import("./pages/musicComponents/PlayerExplore"));
const ArtistPlayer= React.lazy(() =>  import("./pages/musicComponents/ArtistPlayer"));
const Board= React.lazy(() =>  import("./pages/musicComponents/Board"));
const Donate = React.lazy(() =>  import("./pages/Donate"));
const Post = React.lazy(() =>  import("./components/PostFeed"));
let themme = "light";










const readTheme = () =>{
  themme =  reactLocalStorage.get('theme')

  if(themme){
    Utils.setThemeMode(themme);
   document.body.style.backgroundColor = Themes[themme].BackgroundColor;
   document.body.style.color = Themes[themme].Color;
  }else{
    Utils.setThemeMode('light');
  document.body.style.backgroundColor = Themes['light'].BackgroundColor;
  document.body.style.color = Themes['light'].Color;
   
  }

  //return themme;
}



readTheme();

function App() {
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_PBKEY);

const music = [{
  name: 'Despacito',
  singer: 'Luis Fonsi',
  cover:
    'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
  musicSrc:
    'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',
 
},
{
  name: 'Dorost Nemisham',
  singer: 'Sirvan Khosravi',
  cover:
    'https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg',
  musicSrc:
    'https://res.cloudinary.com/ehsanahmadi/video/upload/v1573550770/Sirvan-Khosravi-Dorost-Nemisham-128_kb8urq.mp3',
}];
const [auth, setAuth] = React.useState("");
const [openMenu, setOpenMenu] = React.useState(false);
const [UserDatta, setUserData] = React.useState([]);
const [userid,setuserId] = React.useState(0);
const [Items,setItem] = React.useState(null);
const [songUrl,setSongUrl] = React.useState("");
const [currentTime, setCurrentTime] = React.useState(0);
const [duration, setDuration] = React.useState(0);
const [ItemSongSource,setItemSongSource] = React.useState([]);
const [SongList,setSongList] = React.useState([]);
const [dataSource,setDataSource] = React.useState(null);
const [index,setIndex] = React.useState(0);
const [songIndex,setSongIndex] = React.useState(0);
const [loading,setloading] = React.useState(false);
const [playing,setPlaying] = React.useState(false);
const [expand,setExpand] = React.useState(false);
const [theme,setTheme] = React.useState('light');
const [Type,setType] = React.useState('normal');









const readCookie = () =>{
  const token =  Cookies.get('SCOM');
  const userId = Cookies.get('userId');
  if(token){
    setAuth(token);
    setuserId(userId);
   

  }else{
    setAuth("");
   
  }
}


 

const readUser = () =>{
API.API.readUser()
 .then(responseJSON =>{
console.log(responseJSON)
 
  if(responseJSON.length > 0){
  setUserData(responseJSON)
  if(reactLocalStorage.getObject('user')){

  }else{
    reactLocalStorage.setObject('user',responseJSON)
  }
  }else{
Cookies.remove('SCOM');
Cookies.remove('SCOM_');
Cookies.remove('userId');
reactLocalStorage.clear();
window.location.href = 'https://music.mymiix.com/';
  }
  
 })
}

React.useEffect(() =>{
    readCookie();
    //readTheme();
    
    if(Cookies.get('SCOM')){
    readUser()
    }
    
    if(reactLocalStorage.get("type")){
      setType(reactLocalStorage.get("type"))
      }

    if(Object.keys(reactLocalStorage.getObject('SongData')).length > 0){
      setItemSongSource(reactLocalStorage.getObject('SongData'))
      setSongUrl(reactLocalStorage.getObject('SongData')[0].musicSrc)
    }
    
    
},[])

    return ( 
        <>
        <Router >
        <Elements  stripe={stripePromise}>
        <AuthApi.Provider value={{auth,setAuth,setSongUrl,songUrl,setOpenMenu,openMenu,userid,setuserId,setSongIndex,setExpand,expand,setType,Type,songIndex,setPlaying,playing,SongList,setSongList,currentTime,setCurrentTime,duration,setDuration,setIndex,index,setItemSongSource,ItemSongSource,dataSource,setDataSource,setItem,Items,setUserData,UserDatta}}>
       

        
       
        {UserDatta.length >0?<NavBar userData={UserDatta.length >0 ?UserDatta:[]} />:<NavBarUser  />}
         <React.Suspense fallback={<div></div>}>
          <Routess UserData={UserDatta.length >0 ?UserDatta:[]} />
         
         
         </React.Suspense>
        
         
        
         {<div style={{width:'100%'}}>
       
           {Type == "Spotify" || Type == "spotify"?<FooterSpotify itemSource={ItemSongSource} index={index} setPlaying={setPlaying} playing={playing} />:<Footer itemSource={ItemSongSource} index={index} setPlaying={setPlaying} playing={playing} />}</div>} 
        
        </AuthApi.Provider>
        </Elements>

          
        </Router>
        
        
        </>
    );
}


const Routess = ({UserData}) =>{
    const Auth = React.useContext(AuthApi);
    const location = useLocation();
   
    return(
      
        <Routes >
            <Route path={"/song/:uniqId"} exact  element={<Player spotify={UserData.length > 0 ?UserData:[]} userData={UserData.length > 0 ?UserData:[]} />}  />
            <Route path={"/upload/"} exact  element={<Post spotify={UserData.length > 0 ?UserData:[]} userData={UserData.length > 0 ?UserData:[]} />}  />
            <Route path={"/artist/:user"} exact  element={<ArtistPlayer spotify={UserData.length > 0 ?UserData:[]} userData={UserData.length > 0 ?UserData:[]} />}  />
            <Route path={"/explore/:q"} exact  element={<PlayerExplorer spotify={UserData.length > 0 ?UserData:[]} userData={UserData.length > 0 ?UserData:[]} />}  />
            <Route path={"/Donate/:user"} exact userData={UserData.length > 0 ?UserData:[]} element={<Donate userData={UserData.length > 0 ?UserData:[]} />}  />
            <Route path={"/Donate"} exact userData={UserData.length > 0 ?UserData:[]} element={<Donate userData={UserData.length > 0 ?UserData:[]} />}  />
            <Route path={"/"} exact  element={<Board userData={UserData.length > 0 ?UserData:[]} />}  />
            
            
            
            
            
            


            
           
        </Routes>
    )
}





export default App;
