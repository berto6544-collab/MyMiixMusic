import React from "react";
import "../../music-css/Body.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongArtistRow";
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthApi from "../../components/AuthApi";
import BodyInfo from "./BodyInfo";
import {reactLocalStorage} from 'reactjs-localstorage';
import { Button } from "@mui/material";


function Body({dataSource,setItemSource,searcch,setSearch,Search,ScrollData,userData}) {
const Auth = React.useContext(AuthApi)
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


const Follow = async() => {
  
    
  await fetch('https://music.mymiix.com/api/follow?id='+userData?.UserId+"&status=Profile&func=Follow",{
    method:'POST'
  });
 
 if(userData.following == "0"){
  userData['following'] = "1"; 
  
 }else{
  userData['following'] = "0"; 
 }
  
   
   
   
   }



if(userData == null) return null;
  return (
    <div className="body-artist">
  

      

      <BodyInfo art={userData.profileimg} searcch={searcch} setSearch={setSearch} Search={Search}  info={'Artist'}  name={userData.username} title={''} />

      <div className="body__songs_artists">
        <div className="body__icons">
          {Auth.playing == false?<PlayCircleFilledIcon
            className="body__shuffle"
            onClick={()=>{
              Auth.setPlaying(true)
              Auth.setItemSongSource(hadleModify(dataSource[0]))
     
     
      
     Auth.setIndex(0)
     Auth.setSongIndex(0)
     Auth.setType("normal")
     reactLocalStorage.set("type","normal")
     
            }}
            
          />
        :<PauseCircleFilledIcon  
        className="body__shuffle"
        onClick={()=>{
        Auth.setPlaying(false)
        }}
        
        />
        
        }


          {userData?.following == "0"?<Button variant={'contained'} style={{borderRadius:'3rem',padding:10,paddingLeft:20,paddingRight:20}} onClick={()=>Follow()}>Follow</Button>:<Button variant={'outlined'} style={{borderRadius:'3rem',padding:10,paddingLeft:20,paddingRight:20,color:'white',border:'1px solid white'}} onClick={()=>Follow()}>Following</Button>}
          
         
          {/*<FavoriteIcon style={{color:userData?.following == "0"?"white":"#007bff"}} fontSize="large" />*/}
          <MoreHorizIcon style={{marginLeft:20}} />
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
