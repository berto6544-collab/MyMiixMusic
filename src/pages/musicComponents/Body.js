import React from "react";
import "../../music-css/Body.css";
import Header from "./Header";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongRow";
import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';
import BodyInfo from "./BodyInfo";


function Body({dataSource}) {
const Auth = React.useContext(AuthApi);



const [index,setIndex] =  React.useState(0);



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

if(dataSource == null) return null;
  return (
    <div className="body-artist">


      
<BodyInfo art={dataSource.art} info={'PLAYLIST'}  name={dataSource.SongData[Auth.songIndex].name} title={''} />

      <div className="body__songs_artists">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={()=>{
              

             Auth.setItemSongSource(hadleModify(dataSource))
     
     
      
     //Auth.setItemSongSource(hadleModify(dataSource.SongData[0]))
     Auth.setIndex(0)
     Auth.setSongIndex(0)
     Auth.setPlaying(true)

            }}
          />
          <FavoriteIcon style={{color:dataSource?.following == "0"?"white":"#007bff"}} fontSize="large" />
          <MoreHorizIcon />
        </div>

      {dataSource.SongData.map((item,i)=>{

      return(<SongRow item={item} index={i} setIndex={setIndex} dataSource={dataSource} />)        

      })}


      </div>
    </div>
  );
}

export default Body;
