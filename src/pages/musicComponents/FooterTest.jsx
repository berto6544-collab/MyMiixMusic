import React from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleFilled";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleFilled";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import "../../music-css/Footer.css";
import { Grid, Slider } from "@mui/material";
import AuthApi from "../../components/AuthApi";
import ReactPlayer from 'react-player';
//import AdsenseHorizontal from '../../components/Adsense-Component/AdsenseHorizontal';
function Footer({ spotify,itemSource,playing,setPlaying}) {

  
 
const Auth = React.useContext(AuthApi)
  


 
  const [songUrl,setSongUrl] = React.useState("");
  const [playingg,setPlayingg] = React.useState(playing);

const [sound, setSound] = React.useState(1);
const [loop, setLoop] = React.useState(false);
const [expand, setExpand] = React.useState(false);
const [isMuted, setisMuted] = React.useState(false);
const [expandPlaylist, setExpandPlaylist] = React.useState(false);
const audioRef = React.useRef(null);


const hadleModify = (items) =>{

  if(items.postimg != ""){
  const arraySong = [];
  const Song = items.postimg.split(",");
  Song.forEach((post, ind) => {
  
    
    arraySong.push({
      musicSrc:Song[ind],
      cover:items.art,
      name:items.SongData[ind].name,
      singer:items.SongData[ind].artist    

    })

  
    

  })
  
 

 return arraySong;
  }else{
    const arraySong = [];
    
    
    
      
      arraySong.push({
        musicSrc:items.URLData[0].url,
        cover:items.URLData[0].img,
        name:items.URLData[0].title,
        singer:""    
  
      })
  
    
      
  
      
     if(items?.types == "Youtube" || items?.types == "youtube"){
      Auth.setType("Youtube")
      reactLocalStorage.set("type","Youtube")
     }

     else if(items?.types == "Spotify"){

     
    }

     else{
      Auth.setType("normal")
      reactLocalStorage.set("type","normal")
     }
    
  console.log(arraySong)
  
   return arraySong;
    
  }
}


const skipNext = () =>{

  if(Auth.songIndex >= itemSource.length-1){

    if(Auth.index >= Auth.SongList.length-1)return;
    Auth.setSongIndex(0)
    //Auth.setPlaying(false)
    Auth.setIndex(Auth.index+1)
    Auth.setItemSongSource(hadleModify(Auth.SongList[Auth.index+1]))
   
    Auth.setPlaying(true)
  
    


  }else{

  var songIndex = Auth.songIndex+1
    Auth.setSongIndex(songIndex )
   
   
    //Auth.setItemSongSource(...itemSource[songIndex])
    Auth.setItemSongSource([...itemSource])
    
    
   
    Auth.setPlaying(true)
    setPlayingg(true)
   
  
}

  
}

const skipPrevious = () =>{
  if(Auth.songIndex <= 0){
  if(Auth.index <= 0)return;
  Auth.setSongIndex(0)
  Auth.setIndex(Auth.index-1)
  Auth.setPlaying(true)
  setPlayingg(true)
  Auth.setItemSongSource(hadleModify(Auth.SongList[Auth.index-1]))


  }else{
    var songIndex = Auth.songIndex+1
    Auth.setPlaying(true)
    setPlayingg(true)
    Auth.setSongIndex(songIndex)
  
  
    Auth.setItemSongSource([...itemSource])

  }

}



const handlePlay = () => {
  
  Auth.setPlaying(true);
  if(Auth.Type == "Youtube"){
    //Auth.setExpand(true)
  }
  //audioRef.current.play();
};

const handlePause = () => {
 
  Auth.setPlaying(false);
  //Auth.setExpand(false)
  //audioRef.current.pause();
};

const handlePlayPause = () => {
  if (Auth.playing) {
    handlePause();
    Auth.setDuration(audioRef.current.getDuration())
    Auth.setCurrentTime(audioRef.current.getCurrentTime());
  } else {
    handlePlay();
    Auth.setDuration(audioRef.current.getDuration())
    Auth.setCurrentTime(audioRef.current.getCurrentTime());
  }
};

const handleTimeUpdate = () => {
  Auth.setCurrentTime(audioRef.current.getCurrentTime());
  Auth.setDuration(audioRef.current.getDuration());
};

const handleSeekUpdate = () => {
  Auth.setCurrentTime(audioRef.current.getCurrentTime());
  Auth.setDuration(audioRef.current.getDuration());
};

const handleOnVolumeChange = () =>{

  if(audioRef.current.muted || audioRef.current.volume === 0){
    setisMuted(true)

  } else if(!audioRef.current.muted){
    setisMuted(false)
    setSound(audioRef.current.volume)

  }

}


const handleLoop = () =>{

  setLoop(!loop)
}

const handleExpand = () =>{
  Auth.setExpand(!Auth.expand);
}

const handleSeek = (e) => {
  audioRef.current.seekTo(e.target.value,'seconds');
  Auth.setCurrentTime(e.target.value);
};




function formatDuration(durationSeconds) {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
}

  return(

<div className={ !Auth?.expand?"footer": "expand"}>


<div className={!Auth?.expand?"footer__left":'footer__leftExpand'}>
{!Auth.expand?
<i onClick={handleExpand} style={{color:'white'}} class="fa fa-chevron-up"></i> 
:
<div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}><i onClick={handleExpand} style={{color:'white'}} class="fa fa-chevron-down"></i></div>
}
  {<div
    className={!Auth?.expand?"footer__albumLogo":"footer__albumLogoExpand"}
    style={{backgroundColor:'white'}}
    
    alt={''}
  />}
 

  {itemSource ? (
    <div className={!Auth?.expand?"footer__songInfo":"footer__songInfo_expand"}>
      <h4></h4>
      <p></p>
    </div>
  ) : (
    <div className="footer__songInfo">
      <h4>No song is playing</h4>
      <p>...</p>
    </div>
  )}
</div>



<div className={!Auth.expand ?"footer__center":"footer__centerExpand"}>
  
 <div style={{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}}> 
  
  <div style={{display:'flex',alignItems:'center'}}>
  <RepeatIcon style={{color:loop?'rgb(0, 123, 255)':'white',fontSize:30}} onClick={handleLoop} className="footer__green" />
  <SkipPreviousIcon onClick={skipPrevious} style={{fontSize:30}} className="footer__icon" />
  {Auth.playing ? (
    <PauseCircleOutlineIcon
      
      fontSize="large"
      className="footer__icon"
      style={{fontSize:50}}
    />
  ) : (
    <PlayCircleOutlineIcon
     
      fontSize="large"
      className="footer__icon"
      style={{fontSize:50}}
    />
  )}
  <SkipNextIcon style={{fontSize:30}} onClick={skipNext} className="footer__icon" />
  
  <PlaylistPlayIcon  style={{fontSize:30}} onClick={()=>{
    setExpandPlaylist(true)
    Auth.setExpand(true)          }}  />
  </div>
  <input
  type="range"
  min="0"
  max={Auth.duration}
  value={Auth.currentTime}
  className={'InputCurrentTime'}
  onChange={handleSeek}
  style={{width:'100%'}}
/>
  <div style={{display:'flex',justifyContent:'space-between',width:'100%'}} className="track-duration">
  <p>{formatDuration(Auth.currentTime)}</p>
  <p>{formatDuration(Auth.duration)}</p>
</div>
    </div>

    

</div>



<div className={!Auth.expand ?"footer__right":"footer__rightExpand"}>
  <Grid container spacing={2}>
    <Grid item>
      
    </Grid>
    <Grid item>
      {!isMuted?<VolumeDownIcon  />:<VolumeMuteIcon />}
    </Grid>
    <Grid item xs>
      <input type={'range'} defaultValue={1} style={{width:'100%'}} min={0} max={1} step={0.01} value={sound}
      
      aria-labelledby="continuous-slider" />
    </Grid>
  </Grid>
</div>


<div  className={!expandPlaylist ?'playlist': 'playlist active'}>
<div style={{width:'100%',display:'flex',paddingLeft:20,paddingRight:20,padding:10,alignItems:'center',justifyContent:'space-between'}}>
<h4 style={{color:'white'}}>Playlist</h4>
<i onClick={()=>setExpandPlaylist(false)} style={{color:'white'}} class="fa fa-chevron-down"></i>
</div>
<div style={{display:'flex',flexDirection:'column',height:'70vh',overflowY:'auto',alignItems:'center',width:'100%',padding:10,paddingLeft:20,paddingRight:20}}>
{itemSource.map((item,i)=>{

return(<div className="songRow" style={{marginLeft:0,width:'100%'}} key={i}>
<div className={'songRow__album'} style={{position:'relative',fontSize:40}}>
{i == Auth.songIndex?<i class="fa fa-play-circle play" style={{position:'absolute',bottom:'10%',left:'10%',color:'rgba(0,0,0,0.8)'}}></i>:null}
<img className="songRow__album" src={item.cover} alt="" />
</div>
<div className="songRow__info">
 <h1>{item.name}</h1>
 <p>{item.singer}</p>
</div>
</div>)
})}

</div>


</div>


</div>

  );

  
 
}

export default Footer;
