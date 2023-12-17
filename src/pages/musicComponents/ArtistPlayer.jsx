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
const [search,setSearch] = React.useState("")
const [hasMore,setHasMore] = React.useState(false)

React.useEffect(()=>{

API.API.MusicDataUser(user,start)
.then(response=>{



 setDataUserSource(response);

 if(response.Data.length == 0) return;
 setStart(start +1)
setDataSource(response.Data)
setItemSource(hadleModify(response.Data[0]))
Auth.setItem(response.Data[0])
Auth.setSongList(response.Data)



})



  
},[])


const hadleModify = (items) =>{
  const arraySong = [];
  if(items.postimg != ""){
  
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
    
    
    
    
      
      arraySong.push({
        musicSrc:items.URLData[0].url,
        cover:items.URLData[0].img,
        name:items.URLData[0].title,
        singer:""    
  
      })
  
    
      
  
   
    
  
  
   
      return arraySong; 
  }
}


const SearchData = () =>{
  setStart(0)
  
  API.API.MusicDataUserScroll(user,0,search)
  .then(response=>{
  
    if(response.length == 0) return;
setDataSource(response)


setItemSource(hadleModify(response[0]))

Auth.setItem(response[0])
Auth.setSongList(response)
//Auth.setIndex(index)
setStart(start +1)
  
  
  
  })


  }


const ScrollData = () =>{

API.API.MusicDataUserScroll(user,start,search)
.then(response=>{

if(response.length == 0) return;
setDataSource(dataSource.concat(response))
Auth.setSongList(Auth.SongList.concat(response))
setStart(start +1)



})
}


  return (
    <div className="player">
      <div className="player__body">
        {<Sidebar />}
        {dataSource.length > 0?<Body dataSource={dataSource} searcch={search} setSearch={setSearch} Search={SearchData} setItemSource={setItemSource}  ItemSource={ItemSource} ScrollData={ScrollData} setIndex={setIndex} userData={dataUserSource} setDataSource={setDataSource} />
        :<BodyContainer dataSource={dataSource} setItemSource={setItemSource}  ItemSource={ItemSource} ScrollData={ScrollData} setIndex={setIndex} userData={dataUserSource} setDataSource={setDataSource}  />}
     
      
   
    
    
      </div>

    


     
    
    </div>
  );
}

export default Player;
