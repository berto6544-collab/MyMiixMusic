import React from "react";
import "../../music-css/Body.css";
import "../../music-css/DropDownMenu.css";
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

import 
{FacebookShareButton,
 FacebookIcon,
 RedditShareButton,
 RedditIcon,
 EmailShareButton,
 EmailIcon,
 TwitterShareButton,
 TwitterIcon,
 WhatsappShareButton,
 WhatsappIcon,


} from 'next-share';
import { Button } from "@mui/material";

function Body({dataSource}) {
const Auth = React.useContext(AuthApi);



const [index,setIndex] =  React.useState(0);
const [isTrue,setIsTrue] =  React.useState(false);


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

          {dataSource.stat == "Contributor" && dataSource.DonorStatCount == 0 ? <Button variant={'contained'} onClick={()=>{
            window.location.href = "https://mymiix.com/@"+dataSource.username+"/subscription?redirect="+window.location.href
          }} >Subscribe</Button>:null}

          <dropdown 
            
            
            
            >

          <MoreHorizIcon id={"toggle1"}   onClick={()=>setIsTrue(!isTrue)} style={{marginLeft:20,fontSize:35,cursor:'pointer'}} />
  
  {isTrue?<ul onBlur={(e)=>{ setIsTrue(false) }}  class="animate ulAnimate">
    <li onClick={()=>{
      navigator.clipboard.writeText('https://music.mymiix.com/s/'+dataSource?.uniqId)
      setIsTrue(false)
      
      }} class="animate">
        <i style={{fontSize:20,marginRight:-7}} class="fa fa-copy"></i>Copylink</li>

<li class="animate">
<FacebookShareButton
      url={'https://music.mymiix.com/s/'+dataSource?.uniqId}
  
>
  <FacebookIcon size={30} round />
   Facebook
</FacebookShareButton>
</li>

<li class="animate">
<TwitterShareButton
      url={'https://music.mymiix.com/s/'+dataSource?.uniqId}
     
>
  <TwitterIcon size={30} round />
  Twitter
</TwitterShareButton>

</li>

<li class="animate">
<RedditShareButton
      url={'https://music.mymiix.com/s/'+dataSource?.uniqId}
      title={dataSource?.title}
>
  <RedditIcon size={30} round />
   Reddit
</RedditShareButton>

</li>

  </ul>:null}
</dropdown>


        </div>
        
        <div className="body__icons" style={{display:'flex',alignItems:'center'}}>
      {dataSource.stat == "Donor" && dataSource.DonorStatCount == 0? <h3 style={{marginLeft:50,marginRight:20}}>${dataSource.price}</h3>:null}
 {dataSource.stat == "Donor" && dataSource.DonorStatCount == 0 ? <Button variant={'contained'} onClick={()=>{
  window.location.href = "https://mymiix.com/post/payment/"+dataSource.uniqId+"?redirect="+window.location.href
 }} >Buy</Button>:null}
 
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
