import React, { useEffect, useState } from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import "../../music-css/Footer.css";
import { Grid, Slider } from "@mui/material";
import AuthApi from "../../components/AuthApi";
import ReactSpotify from 'react-spotify-player';
import ReactPlayer from 'react-player';

function FooterSpotify({ spotify,itemSource,playing,setPlaying}) {

  
 
const Auth = React.useContext(AuthApi)
  


  const [songIndex,setsongIndex] = React.useState(0);
  const [playingg,setPlayingg] = React.useState(playing);
  const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [sound, setSound] = useState(1);
const [loop, setLoop] = useState(false);
const [expand, setExpand] = useState(false);
const [isMuted, setisMuted] = useState(false);
const [expandPlaylist, setExpandPlaylist] = useState(false);
  const audioRef = React.useRef(null);

React.useEffect(()=>{



 

},[])





  if(itemSource.length  == 0)return(

<div className="footter">
     
     <div style={{display:'flex',position:'relative',flexDirection:'row',alignItems:'center',width:'100%',height:'100%'}}>

      <div style={{borderRadius:'0.5rem',width:100,height:100,backgroundColor:'GrayText'}}>

      </div>
      <div style={{backgroundColor:'hsla(0,0%,100%,.3)',borderRadius:'.125rem',width:'100%',height:4}}></div>


     </div>

      
    </div>

  );
  return (
    <div className={ !expand?"footter": "expand"}>
    
    {UrlForMedia(itemSource[0].musicSrc,"",[],"Spotify",audioRef)}

    </div>
  );
}

export default FooterSpotify;








function UrlForMedia(dataBody,postimage,Data,typeFunction,iframeReff) {

     
  if(dataBody != undefined){
        
  if (typeof(dataBody === 'string')) {

const datapast = dataBody.split(/\s/);

const content = datapast.map(function(word,i) {
  var separator = i < (datapast.length - 1) ? ' ' : '';

 
  const size = {
    width: '100%',
    height: '100%',
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'

  
  if (word.match(/^https?\:\//)) {

   

if(postimage == ""){
if (word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?(music\.)?youtube\.com\/([a-zA-Z0-9_]+)/) && typeFunction == "Youtube"){
  //console.log(word);
  return(null)
}


else if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/) && typeFunction == "Soundcloud") {

  return(null)
}



if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\/([a-zA-Z0-9_]+)/)  && typeFunction == "Spotify") {

        
  if(postimage == ""){

    var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\//,'');
  return (
 
   

   
    <iframe 
  style={{width:'100%',height:'90%'}} 
  ref={iframeReff}
  loading="lazy"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  src={'https://open.spotify.com/embed/track/'+U+'?utm_source=generator&theme=0'} ></iframe>
  

 
  
  )
  }

}





if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\/([a-zA-Z0-9_]+)/) && typeFunction == "Spotify") {

  
  if(postimage == ""){

    var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\//,'');
  return (
    
    <iframe 
    
  style={{width:'100%',height:'100%'}} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" frameBorder="0" src={'https://open.spotify.com/embed/album/'+U+'?utm_source=generator&theme=0'} ></iframe>)
  }

}

if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?album\/([a-zA-Z0-9_]+)/) && typeFunction == "Spotify") {

        
  if(postimage == ""){

    var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?album\//,'');
  return (
    
    <iframe 
  style={{width:'100%',height:'100%'}} frameBorder="0" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src={'https://open.spotify.com/embed/album/'+U+'?utm_source=generator&theme=0'} ></iframe>)
  }

}

if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\/([a-zA-Z0-9_]+)/) && typeFunction == "Spotify") {

  
  if(postimage == ""){

    var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\//,'');
  return (
   
    <iframe 
   style={{width:'100%',height:'100%'}} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" frameBorder="0" src={'https://open.spotify.com/embed/playlist/'+U+'?utm_source=generator&theme=0'} ></iframe>)
  }

}


if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?playlist\/([a-zA-Z0-9_]+)/) && typeFunction == "Spotify") {

        
  if(postimage == ""){

    var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?playlist\//,'');
  return (
 
 
  <iframe 
  style={{width:'100%',height:'100%'}} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" frameBorder="0" src={'https://open.spotify.com/embed/playlist/'+U+'?utm_source=generator&theme=0'} ></iframe>
 )
  }

}

else if(word.match(/http(?:s)?:\/\/?([a-zA-Z0-9_]+)\.?([a-zA-Z0-9_]+)/) && 
!dataBody.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?youtube\.com\/([a-zA-Z0-9_]+)/gi) && 
!dataBody.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/gi) && 
!dataBody.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/gi) &&
!dataBody.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?discord\.com\/widget/gi) &&
!dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\/([a-zA-Z0-9_]+)/gi) &&
!dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?track\/([a-zA-Z0-9_]+)/gi) &&
!dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\/([a-zA-Z0-9_]+)/gi) &&
!dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?album\/([a-zA-Z0-9_]+)/gi)&&
!dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\/([a-zA-Z0-9_]+)/gi) &&
!dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?playlist\/([a-zA-Z0-9_]+)/gi)){



  


return(null)

}else{
 
 return(null)
}

}

  }
else{
//return(<p>{separator + word}</p>)
}


})


const contents = datapast.map(function(word,i) {
  var separator = i < (datapast.length - 1) ? ' ' : '';


  if (word.match(/^https?\:\//)) {


if(postimage == ""){
if (word.match(/http(?:s)?:\/\/(?:www\.)?youtube\.com\/([a-zA-Z0-9_]+)/)){
  
}

else if(word.match(/http(?:s)?:\/\/(?:www\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/)) {

}
else if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {

}

}

else{
  return(null)
 }

  }
else{

if (word.match(/#(\w+)/g)) {

}
else  if (word.match(/@(\w+)/g)) {
  return(null);
}
else{

return(null)
}

}


})


const contentss = datapast.map(function(word,i) {
  var separator = i < (datapast.length - 1) ? ' ' : '';

  if (word.match(/#(\w+)/g)) {

return(null);
  }
  else if (word.match(/@(\w+)/g)){
    
  }



})


return(
  <div style={{flexDirection:'row',width:'100%',flexWrap:'wrap'}}>
<div style={{flexDirection:'row', width:'100%', display:'flex',flexWrap:'wrap'}}>{contents}</div>
<div style={{flexDirection:'row', display:'flex',flexWrap:'wrap'}}>{contentss}</div>
{content}
</div>

)
    }
  }


}

