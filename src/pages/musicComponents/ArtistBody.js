import React from "react";
import "../../music-css/Body.css";
import "../../music-css/DropDownMenu.css";

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

import 
{FacebookShareButton,
 FacebookIcon,
 RedditShareButton,
 RedditIcon,
 EmailShareButton,
 EmailIcon,
 TwitterShareButton,
 TwitterIcon,
 PinterestShareButton,
 PinterestIcon,
 WhatsappShareButton,
 WhatsappIcon,
 TelegramShareButton,
 TelegramIcon,
 FacebookMessengerShareButton,
 FacebookMessengerIcon

} from 'next-share';


function Body({dataSource,setItemSource,searcch,setSearch,Search,ScrollData,userData}) {
const Auth = React.useContext(AuthApi)
const [index,setIndex] =  React.useState(0);
const [isTrue,setIsTrue] =  React.useState(false);


const hadleModify = (items) =>{

  const arraySong = [];
  const Song = items.postimg.split(",");
  if(items.SongData.length > 0){

  items.SongData.forEach((post, ind) => {
  
    
    arraySong.push({
      musicSrc:Song[index],
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
        <div className="body__icons" style={{position:'relative'}}>
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
          <dropdown 
            
            
            
            >

          <MoreHorizIcon id={"toggle1"}   onClick={()=>setIsTrue(!isTrue)} style={{marginLeft:20,fontSize:35,cursor:'pointer'}} />
  
  {isTrue?<ul onBlur={(e)=>{ setIsTrue(false) }}  class="animate ulAnimate">
    <li onClick={()=>{
      navigator.clipboard.writeText('https://music.mymiix.com/a/'+dataSource[0].username)
      setIsTrue(false)
      
      }} class="animate">
        <i style={{fontSize:20,marginRight:-7}} class="fa fa-copy"></i>Copylink</li>

<li class="animate">
<FacebookShareButton
      url={'https://music.mymiix.com/a/'+dataSource[0].username}
  
>
  <FacebookIcon size={30} round />
   Facebook
</FacebookShareButton>
</li>

<li class="animate">
<TwitterShareButton
      url={'https://music.mymiix.com/a/'+dataSource[0].username}
     
>
  <TwitterIcon size={30} round />
  Twitter
</TwitterShareButton>

</li>

<li class="animate">
<RedditShareButton
      url={'https://music.mymiix.com/a/'+dataSource[0].username}
      title={"Come follow "+dataSource[0].username+" MyMiix Music"}
>
  <RedditIcon size={30} round />
   Reddit
</RedditShareButton>

</li>

  </ul>:null}
</dropdown>
         
          

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
