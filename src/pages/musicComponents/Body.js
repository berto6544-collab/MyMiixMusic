import React from "react";
import "../../music-css/Body.css";
import Header from "./Header";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongRow";
import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';
import BodyInfo from "./BodyInfo";
import Sidebar from "./Sidebar";


function Body({dataSource}) {
const Auth = React.useContext(AuthApi);



const [index,setIndex] =  React.useState(0);



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

if(dataSource == null) return null;
  return (
    <div className="body-artist">


     
<BodyInfo art={dataSource.art != ""?dataSource.art : dataSource.URLData[Auth.songIndex].img } info={'PLAYLIST'} dataSource={dataSource}  name={dataSource.postimg != "" ?dataSource.SongData[Auth.songIndex].name:dataSource.URLData[Auth.songIndex].title} title={''} />


      <div className="body__songs_artists">
        
        <div className="body__icons">
          {Auth.playing == false?<PlayCircleFilledIcon
            className="body__shuffle"
            onClick={()=>{
              
              Auth.setPlaying(true)

             //Auth.setItemSongSource(hadleModify(dataSource))
             Auth.setItemSongSource(hadleModify(dataSource))
     
      
    
     Auth.setIndex(0)
     Auth.setSongIndex(0)
     
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



            }}
          />:
          <PauseCircleFilledIcon 
          className="body__shuffle"
            onClick={()=>{

              Auth.setPlaying(false)

            }}
          
          />}


          <FavoriteIcon style={{color:dataSource?.following == "0"?"white":"#007bff"}} fontSize="large" />
          <MoreHorizIcon />
        </div>

      {dataSource.SongData.map((item,i)=>{

      return(<SongRow item={item} index={i} setIndex={setIndex} dataSource={dataSource} />)        

      })}

{dataSource.URLData.map((item,i)=>{

return(<SongRow item={item} index={i} setIndex={setIndex} dataSource={dataSource} />)        

})}

      </div>
    </div>
  );
}

export default Body;
