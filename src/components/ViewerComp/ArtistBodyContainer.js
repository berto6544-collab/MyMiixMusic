import React from "react";
import "../../music-css/Body.css";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "../../pages/musicComponents/SongArtistRow";
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthApi from "../AuthApi";
import { Button } from "@mui/material";


function Body({setItemSource,ScrollData}) {
const Auth = React.useContext(AuthApi)
const [index,setIndex] =  React.useState(0);
const [dataSource, setDataSource] = React.useState([
    
    {
       art:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
       SongData: [{
            musicSrc:"",
            cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
            name:"title",
            artist:"name"   
      
          }]

        },
    
        {
            art:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
            SongData: [{
                 musicSrc:"",
                 cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
                 name:"title",
                 artist:"name"   
           
               }]
     
             },
             {
                art:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
                SongData: [{
                     musicSrc:"",
                     cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
                     name:"title",
                     artist:"name"   
               
                   }]
         
                 },
                 {
                    art:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
                    SongData: [{
                         musicSrc:"",
                         cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
                         name:"title",
                         artist:"name"   
                   
                       }]
             
                     },
                     {
                        art:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
                        SongData: [{
                             musicSrc:"",
                             cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
                             name:"title",
                             artist:"name"   
                       
                           }]
                 
                         }
    
    
    ]);






  return (
    <div className="body-artist">
  

      <div className="body__info_artists">
        
        <div className="body__infoText_artist">
           <span >Artist</span>
          
           <h2 >Artist Name</h2>
         
        </div>
      </div>

      <div className="body__songs_artists">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            
            
          />
         <Button variant={'contained'} style={{borderRadius:'3rem',padding:10,paddingLeft:20,paddingRight:20}}>Follow</Button>
          <MoreHorizIcon style={{marginLeft:20}} />
        </div>

<InfiniteScroll 
dataLength={dataSource.length}
style={{ width:"100%" }} //To put endMessage and loader to the top.
inverse={false}
hasMore={true}
endMessage={false}

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
