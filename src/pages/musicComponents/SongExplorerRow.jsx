import React from "react";

import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';
import '../../music-css/SongColumn.css'

function SongRow({item,dataSource,setItemSource,q,index,setIndex}) {
  const Auth = React.useContext(AuthApi)

  const hadleModify = (items) =>{

    const arraySong = [];
    const Song = items.postimg.split(",");
    if(items.SongData.length > 0){
    
    items.SongData.forEach((post, ind) => {
    
      
      arraySong.push({
        musicSrc:Song[ind],
        cover:items.art,
        name:post.name,
        singer:post.artist    
  
      })
  
    
      
  
    })
    
   
    reactLocalStorage.setObject("SongData",arraySong)
   return arraySong;
    }else{
      const arraySong = [];
      
      
      
        if(items.URLData.length > 0){
        arraySong.push({
          musicSrc:items.URLData[0].url,
          cover:items.URLData[0].img,
          name:items.URLData[0].title,
          singer:""    
    
        })
    
        }else{
          arraySong.push({
            musicSrc:Song[0],
            cover:items.art,
            name:items?.title,
            singer:""    
      
          })
  
        }
        
    
     
      
        reactLocalStorage.setObject("SongData",arraySong)
    
     return arraySong;
      
    }
  }
  return (
    <div className="songRoww" key={index} onClick={() =>{
   
    if(q== "TopArtists"){
window.location.href = "/artist/"+item.username

      }else{
        window.location.href = "/song/"+item.uniqId

}

    }}>
      <div className={'songRow__albumm'} style={{position:'relative',fontSize:40}}>
     
      <img className="songRow__albumm" src={q== "TopArtists" ? item.profileimg :item.art|| item.SongData[0].img} alt="" />
      </div>
      <div className="songRow__info">
        <h1>{q== "TopArtists" ? item.username: item.SongData[0]?.name || item.SongData[0].title}</h1>
        <p>{q== "TopArtists" ? '': ''}</p>
      </div>
    </div>
  );
}

export default SongRow;
