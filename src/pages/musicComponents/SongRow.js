import React from "react";
import "../../music-css/SongRow.css";
import {reactLocalStorage} from 'reactjs-localstorage';
import AuthApi from "../../components/AuthApi";
//reactLocalStorage.setObject("SongData",arraySong)
function SongRow({item,dataSource,index,setIndex}) {
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

    if(dataSource.types == "Spotify" || dataSource.types == "spotify" ){

      Auth.setType("Spotify")
      reactLocalStorage.set("type","Spotify")
     }
     else if(dataSource.types == "Youtube" || dataSource.types == "youtube"){

      Auth.setType("Youtube")
      reactLocalStorage.set("type","Youtube")
      Auth.setExpand(true)

     }
     
     else {
      Auth.setType("normal")
      reactLocalStorage.set("type","normal")
     }

  
 
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
