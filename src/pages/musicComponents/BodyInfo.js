import React from 'react';
import Header from './Header';
import ReactPlayer from 'react-player';
import AuthApi from '../../components/AuthApi';


const BodyInfo = ({info,art,name,searcch,setSearch,Search,title}) =>{

const Auth = React.useContext(AuthApi)


const handlePlay = () => {
  
  Auth.setPlaying(true);
  //audioRef.current.play();
};

const handlePause = () => {
 
  Auth.setPlaying(false);
  //audioRef.current.pause();
};

const handlePlayPause = () => {
  if (Auth.playing) {
    handlePause();
  } else {
    handlePlay();
  }
};

const handleTimeUpdate = () => {
  Auth.setCurrentTime(Auth.currentTime);
  Auth.setDuration(Auth.duration);
};



return(<div className="body__info">
{ <img  src={art} alt="" />}
<div className="body__infoText">

  <strong>{info}</strong>
  <h2>{name}</h2>
  <p>{title}</p>
  <Header searcch={searcch} setSearch={setSearch} Search={Search} />
</div>

</div>)
    

}

export default BodyInfo;