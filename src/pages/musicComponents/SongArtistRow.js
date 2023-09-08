import React from "react";
import "../../music-css/SongRow.css";
import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';
import { Button } from "@mui/material";


function SongRow({item,dataSource,setItemSource,index,setIndex}) {
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
    <div className="songRow"style={{width:'100%',justifyContent:'space-between'}} key={index} onClick={() =>{
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
      <div style={{display:'flex',alignItems:'center'}}>
      <div className={'songRow__album'} style={{position:'relative',fontSize:40}}>
      {index == Auth.index?<i class="fa fa-play-circle play" style={{position:'absolute',bottom:'10%',left:'10%',color:'rgba(0,0,0,0.8)'}}></i>:null}
      <img className="songRow__album" src={item.SongData.length > 0?item.art:item.URLData.length > 0 ?item.URLData[0].img:item?.art||item?.postimg.split(',')[0]} alt="" />
      </div>
      <div className="songRow__info">
        <h1>{item.SongData.length > 0? item.SongData[0].name:item.title}</h1>
        <p>{item.SongData.length > 0? item.SongData[0].artist:item.types}</p>
      </div>
      </div>
      <div className="body__icons" style={{display:'flex',zIndex:2,alignItems:'center',flexDirection:'column',justifySelf:'flex-end'}}>
      {item.stat == "Donor" && item.DonorStatCount == 0? <h3 >${item.price}</h3>:null}
 {item.stat == "Donor" && item.DonorStatCount == 0 ? <Button variant={'contained'} onClick={()=>{
  window.location.href = "https://mymiix.com/post/payment/"+item.uniqId+"?redirect="+window.location.href
 }} >Buy</Button>:null}
 
      </div>
    </div>
  );
}

export default SongRow;
