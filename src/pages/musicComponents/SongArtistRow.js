import React from "react";
import "../../music-css/SongRow.css";
import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';

function SongRow({item,dataSource,setItemSource,index,setIndex}) {
  const Auth = React.useContext(AuthApi)

  

  const hadleModify = (items) =>{

    if(items.postimg != ""){
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
    <div className="songRow" key={index} onClick={() =>{
     //Auth.setItems(item)
     //setItemSource(hadleModify(item))
     setIndex(index)
      
    Auth.setItemSongSource(hadleModify(item))
    Auth.setPlaying(true)
    Auth.setIndex(index)
    Auth.setSongIndex(0)

    
      

      if(item.types == "spotify" || item.types == "Spotify"){
        Auth.setType("Spotify")
        Auth.setExpand(true);
        reactLocalStorage.set("type","Spotify")
        
      }
    else if(item.types == "Youtube" || item.types == "youtube"){
      Auth.setType("Youtube")
      reactLocalStorage.set("type","Youtube")
     }

     else{
      Auth.setType("normal")
      reactLocalStorage.set("type","normal")
     }

    }}>
      <div className={'songRow__album'} style={{position:'relative',fontSize:40}}>
      {index == Auth.index?<i class="fa fa-play-circle play" style={{position:'absolute',bottom:'10%',left:'10%',color:'rgba(0,0,0,0.8)'}}></i>:null}
      <img className="songRow__album" src={item.SongData.length > 0?item.art:item.URLData[0].img} alt="" />
      </div>
      <div className="songRow__info">
        <h1>{item.SongData.length > 0? item.SongData[0].name:item.title}</h1>
        <p>{item.SongData.length > 0? item.SongData[0].artist:item.types}</p>
      </div>
    </div>
  );
}

export default SongRow;
