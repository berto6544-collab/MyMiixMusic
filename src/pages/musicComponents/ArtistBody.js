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



const hadleModify = (item) =>{

  const arraySong = [];
  const Song = item.postimg.split(",");
  item.SongData.map((post,ind)=>{
    
    arraySong.push({
      
      musicSrc:Song[ind],
      cover:item.art,
      name:post.name,
      singer:post.artist    

    });

  
    

  });
  
  return arraySong;
  
}

if(userData == null) return null;
  return (
    <div className="body-artist">
  

      <div className="body__info_artists">
        <img src={userData.profileimg} alt="" />
        <div className="body__infoText_artist">
          <strong>Artist</strong>
          <h2>{userData.username}</h2>
         
        </div>
      </div>

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
