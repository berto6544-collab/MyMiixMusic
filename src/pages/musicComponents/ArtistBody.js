import React from "react";
import "../../music-css/Body.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongArtistRow";
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthApi from "../../components/AuthApi";
import BodyInfo from "./BodyInfo";


function Body({dataSource,setItemSource,ScrollData,userData}) {
const Auth = React.useContext(AuthApi)
const [index,setIndex] =  React.useState(0);



const hadleModify = (items) =>{

  if(items.postimg == ""){
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
  
 

 return arraySong;
  }else{
    const arraySong = [];
    
    
    
      
      arraySong.push({
        musicSrc:items.URLData[0].url,
        cover:items.URLData[0].img,
        name:items.URLData[0].title,
        singer:""    
  
      })
  
    
      
  
   
    
  
  
   return arraySong;
    
  }
}

if(userData == null) return null;
  return (
    <div className="body-artist">
  

      

      <BodyInfo art={userData.profileimg} info={'Artist'}  name={userData.username} title={''} />

      <div className="body__songs_artists">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={()=>{
              Auth.setItemSongSource(hadleModify(dataSource[0]))
     
     
      
     Auth.setItemSongSource(hadleModify(dataSource[0]))
     Auth.setIndex(0)
     Auth.setSongIndex(0)
     Auth.setPlaying(true)
            }}
            
          />
          <FavoriteIcon style={{color:userData?.following == "0"?"white":"#007bff"}} fontSize="large" />
          <MoreHorizIcon />
        </div>

<InfiniteScroll 
dataLength={dataSource.length}
style={{ width:"100%" }} //To put endMessage and loader to the top.
inverse={false}
hasMore={true}
endMessage={false}
next={ScrollData}
scrollThreshold={0.8}
>


{dataSource.map((item,i)=>{



 
return(<SongRow key={item.id}   item={item} index={i} setIndex={setIndex} setItemSource={setItemSource}  />)        



})}

</InfiniteScroll>

      


      </div>
    </div>
  );
}

export default Body;
