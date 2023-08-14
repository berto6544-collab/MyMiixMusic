import React from "react";
import "../../music-css/SongRow.css";
import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';

function SongRow({item,dataSource,setItemSource,index,setIndex}) {
  const Auth = React.useContext(AuthApi)

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
   
    reactLocalStorage.setObject("SongData",arraySong)

   return arraySong;
    
  }
  return (
    <div className="songRow" key={index} onClick={() =>{
     //Auth.setItems(item)
     //setItemSource(hadleModify(item))
     setIndex(index)
      
    Auth.setItemSongSource(hadleModify(item))
    Auth.setPlaying(true)
    Auth.setIndex(index)
    Auth.setSongIndex(0)


    }}>
      <div className={'songRow__album'} style={{position:'relative',fontSize:40}}>
      {index == Auth.index?<i class="fa fa-play-circle play" style={{position:'absolute',bottom:'10%',left:'10%',color:'rgba(0,0,0,0.8)'}}></i>:null}
      <img className="songRow__album" src={item.art} alt="" />
      </div>
      <div className="songRow__info">
        <h1>{item.SongData[0].name}</h1>
        <p>{item.SongData[0].artist}</p>
      </div>
    </div>
  );
}

export default SongRow;
