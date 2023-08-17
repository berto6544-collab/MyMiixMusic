import React from "react";
import "../../music-css/SongRow.css";
import {reactLocalStorage} from 'reactjs-localstorage';
import AuthApi from "../../components/AuthApi";

function SongRow({item,dataSource,index,setIndex}) {
  const Auth = React.useContext(AuthApi)

  const hadleModify = (items) =>{

    if(items.type == ""){
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
    }else{
      const arraySong = [];
      
      
      
        
        arraySong.push({
          musicSrc:items.URLData[0].url,
          cover:items.URLData[0].img,
          name:items.URLData[0].title,
          singer:""    
    
        })
    
      
        
    
     
      
      reactLocalStorage.setObject("SongData",arraySong)
    
     return arraySong;
      
    }
  }
  
  return (
    <div className="songRow" onClick={() =>{
      //Auth.setItems(item)
      //setItemSource(hadleModify(item))
      
       
     Auth.setItemSongSource(hadleModify(dataSource))
     Auth.setPlaying(true)
     setIndex(index)
      
     //Auth.setItemSongSource(hadleModify(item))
     Auth.setIndex(index)
     Auth.setSongIndex(index)
     Auth.setPlaying(true)
 
     }}>
      <img className="songRow__album" src={dataSource.art || item?.img} alt="" />
      <div className="songRow__info">
        <h1>{item?.name || item.title }</h1>
        <p>{item?.artist || ""}</p>
      </div>
     
    </div>
  );
}

export default SongRow;
