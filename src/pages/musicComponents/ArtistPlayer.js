import React from "react";
import Footer from "./Footer";
import "../../music-css/Player.css";
import { BrowserRouter as Router, Link, Redirect,useParams } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Body from "./ArtistBody";
import BodyContainer from "../../components/ViewerComp/ArtistBodyContainer"
import API from "../../components/API/API";
import AuthApi from "../../components/AuthApi";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'



function Player({ spotify,userData }) {

  const Auth = React.useContext(AuthApi);
  const {user} = useParams();

const [dataSource,setDataSource] = React.useState([]);
const [dataUserSource,setDataUserSource] = React.useState(null);
const [ItemSource,setItemSource] = React.useState([]);
const [index,setIndex] = React.useState(0);
const [start,setStart] = React.useState(0);
const [hasMore,setHasMore] = React.useState(false)

React.useEffect(()=>{

API.API.MusicDataUser(user,start)
.then(response=>{


setDataSource(response.Data)
setDataUserSource(response);

setItemSource(hadleModify(response.Data[0]))
//Auth.setItemSongSource(hadleModify(response.Data[0]))
Auth.setItem(response.Data[0])
Auth.setSongList(response.Data)
//Auth.setIndex(index)
setStart(start +1)

})



  
},[])


const hadleModify = (item) =>{

  const arraySong = [];
  const Song = item.postimg.split(",");
  item.SongData.map((post,ind)=>{
    
    arraySong.push({
      musicSrc:Song[ind],
      cover:item.art,
      name:post.name,
      singer:post.artist    

    })

  
    

  })
  console.log(arraySong)
  return [...arraySong];
  
}


const ScrollData = () =>{

API.API.MusicDataUserScroll(user,start)
.then(response=>{

if(response.length > 0){ 
setDataSource(dataSource.concat(response))
Auth.setSongList(Auth.SongList.concat(response))
setStart(start +1)

}

})
}


  return (
    <div className="player">
      <div className="player__body">
        {/*<Sidebar />*/}
        {dataSource.length > 0?<Body dataSource={dataSource} setItemSource={setItemSource}  ItemSource={ItemSource} ScrollData={ScrollData} setIndex={setIndex} userData={dataUserSource} setDataSource={setDataSource} />
        :<BodyContainer dataSource={dataSource} setItemSource={setItemSource}  ItemSource={ItemSource} ScrollData={ScrollData} setIndex={setIndex} userData={dataUserSource} setDataSource={setDataSource}  />}
     
      
   
    
    
      </div>

    


     
    
    </div>
  );
}

export default Player;
