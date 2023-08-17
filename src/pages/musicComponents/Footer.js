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
import ReactPlayer from 'react-player';

function Footer({ spotify,itemSource,playing,setPlaying}) {

  
 
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



  document.addEventListener("DOMContentLoaded", function() {
   

    // Prevent the default behavior of the link and continue playing the audio
      audioRef.current.addEventListener("click", function(event) {
        event.preventDefault();
        audioRef.current.play();
    });
});


  //setPlayingg(playing)
  if(audioRef.current != null){
  audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
  return () => {
    audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
  };

  }

},[])



const hadleModify = (items) =>{

  const arraySong = [];
  const Song = items.postimg.split(",");
  Song.forEach((post, ind) => {
  
    
    arraySong.push({
      musicSrc:post,
      cover:items.art,
      name:items.SongData[ind].name,
      singer:items.SongData[ind].artist    

    })

  
    

  })
  console.log(arraySong)
  reactLocalStorage.setObject("SongData",arraySong)

 return arraySong;
  
}


const skipNext = () =>{

  if(Auth.songIndex >= itemSource.length-1){

    if(Auth.index >= Auth.SongList.length-1)return;
    Auth.setSongIndex(0)
    Auth.setIndex(Auth.index+1)
    Auth.setPlaying(true)
    setPlayingg(true)
    Auth.setItemSongSource(hadleModify(Auth.SongList[Auth.index+1]))
    


  }else{

  
    Auth.setPlaying(true)
    setPlayingg(true)
    Auth.setSongIndex(Auth.songIndex+1)

  
}

  
}

const skipPrevious = () =>{
  if(Auth.songIndex <= 0){
  if(Auth.index >= Auth.SongList.length-1)return;
  Auth.setSongIndex(0)
  Auth.setIndex(Auth.index-1)
  Auth.setPlaying(true)
  setPlayingg(true)
  Auth.setItemSongSource(hadleModify(Auth.SongList[Auth.index]))


  }else{
    Auth.setPlaying(true)
    setPlayingg(true)
    Auth.setSongIndex(Auth.songIndex-1)
  

  }

}



const handlePlay = () => {
  
  setPlayingg(true);
  //audioRef.current.play();
};

const handlePause = () => {
 
  setPlayingg(false);
  //audioRef.current.pause();
};

const handlePlayPause = () => {
  if (playingg) {
    handlePause();
  } else {
    handlePlay();
  }
};

const handleTimeUpdate = () => {
  setCurrentTime(audioRef.current.getCurrentTime());
  setDuration(audioRef.current.getDuration());
};

const handleSeekUpdate = () => {
  setCurrentTime(audioRef.current.getCurrentTime());
  setDuration(audioRef.current.getDuration());
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
  setExpand(!expand);
}

const handleSeek = (e) => {
  audioRef.current.seekTo(e.target.value,'seconds');
  setCurrentTime(e.target.value);
};

function formatDuration(durationSeconds) {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
}

  if(itemSource.length  == 0)return(

<div className="footer">
      <div className="footer__left">
     
        <img
          className="footer__albumLogo"
          src={''}
          alt={''}
        />
        {itemSource ? (
          <div className="footer__songInfo">
            <h4>Title</h4>
            <p>Artist name</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        
        <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
        {playingg ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
        <RepeatIcon onClick={handleLoop} className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon  />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider defaultValue={100} aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>

      
    </div>

  );
  return (
    <div className={ !expand?"footer": "expand"}>


      <div className={!expand?"footer__left":'footer__leftExpand'}>
      {!expand?
      <i onClick={handleExpand} style={{color:'white'}} class="fa fa-chevron-up"></i> 
      :
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}><i onClick={handleExpand} style={{color:'white'}} class="fa fa-chevron-down"></i></div>
      }
        <img
          className={!expand?"footer__albumLogo":"footer__albumLogoExpand"}
          src={itemSource[Auth.songIndex].cover}
          alt={''}
        />
        {itemSource ? (
          <div className={!expand?"footer__songInfo":"footer__songInfo_expand"}>
            <h4>{itemSource[Auth.songIndex]?.name.substring(0,25)}</h4>
            <p>{itemSource[Auth.songIndex]?.singer}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className={!expand ?"footer__center":"footer__centerExpand"}>
        
       <div style={{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}}> 
        
        <div style={{display:'flex',alignItems:'center'}}>
        <RepeatIcon style={{color:loop?'rgb(0, 123, 255)':'white'}} onClick={handleLoop} className="footer__green" />
        <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
        {playingg ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipNext} className="footer__icon" />
        
        <PlaylistPlayIcon onClick={()=>{
          setExpandPlaylist(true)
          setExpand(true)          }}  />
        </div>
        <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        className={'InputCurrentTime'}
        onChange={handleSeek}
        style={{width:'100%'}}
      />
        <div style={{display:'flex',justifyContent:'space-between',width:'100%'}} className="track-duration">
        <p>{formatDuration(currentTime)}</p>
        <p>{formatDuration(duration)}</p>
      </div>
          </div>

      </div>
      <div className={!expand ?"footer__right":"footer__rightExpand"}>
        <Grid container spacing={2}>
          <Grid item>
            
          </Grid>
          <Grid item>
            {!isMuted?<VolumeDownIcon />:<VolumeMuteIcon />}
          </Grid>
          <Grid item xs>
            <input type={'range'} defaultValue={1} style={{width:'100%'}} min={0} max={1} step={0.01} value={sound}
            onChange={(e)=>{
              setSound(Number(e.target.value))
              audioRef.current.volume = Number(e.target.value);
              if(audioRef.current.volume === 0){
                audioRef.current.muted = true;
              }else{
                audioRef.current.muted = false;
              }

            }}
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

  return(<div className="songRow" style={{marginLeft:0,width:'100%'}} key={i} onClick={() =>{
    
    Auth.setIndex(Auth.index)
   Auth.setItemSongSource(itemSource)
   Auth.setPlaying(true)
   Auth.setSongIndex(i)


   }}>
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
<ReactPlayer style={{display:'none'}}
      onCanPlay={(e)=>{
        //Auth.setPlaying
        setPlayingg(playing)
      }}

      
      
      autoPlay={playingg} ref={audioRef} onEnded={(e)=>{

       if(!loop) return skipNext();



      }} 
      
      onPlay={handleTimeUpdate}
      onSeek={handleTimeUpdate}
      onProgress={handleTimeUpdate}
      onVolumeChange={handleOnVolumeChange}
      volume={sound}
      
      loop={loop} progressInterval={currentTime} playing={playingg} playsInline={true} url={itemSource[Auth.songIndex]?.musicSrc} >
        
       

      </ReactPlayer>

    </div>
  );
}

export default Footer;
