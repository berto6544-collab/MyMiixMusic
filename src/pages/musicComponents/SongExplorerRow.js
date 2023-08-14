import React from "react";
import "../../music-css/SongRow.css";
import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';

function SongRow({item,dataSource,setItemSource,q,index,setIndex}) {
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
   
    if(q== "TopArtists"){
window.location.href = "/artist/"+item.username

      }else{
        window.location.href = "/song/"+item.uniqId

}

    }}>
      <div className={'songRow__album'} style={{position:'relative',fontSize:40}}>
     
      <img className="songRow__album" src={q== "TopArtists" ? item.profileimg :item.art} alt="" />
      </div>
      <div className="songRow__info">
        <h1>{q== "TopArtists" ? item.username: item.SongData[0].name}</h1>
        <p>{q== "TopArtists" ? '': ''}</p>
      </div>
    </div>
  );
}

export default SongRow;
