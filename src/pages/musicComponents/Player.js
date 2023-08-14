import React from "react";
import Footer from "./Footer";
import "../../music-css/Player.css";
import { BrowserRouter as Router, Link, Redirect,useParams } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Body from "./Body";
import BodyContainer from "./BodyContainer";
import API from "../../components/API/API";
import AuthApi from "../../components/AuthApi";


function Player({ spotify,userData }) {

  const Auth = React.useContext(AuthApi);
  const {uniqId} = useParams();

const [dataSource,setDataSource] = React.useState(null);
const [ItemSource,setItemSource] = React.useState([]);
const [index,setIndex] = React.useState(0);
const [start,setStart] = React.useState(0);
const [hasMore,setHasMore] = React.useState(false)


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
 
  return arraySong;
  
}


React.useEffect(()=>{

API.API.MusicDataUniq(uniqId)
.then(response=>{


setDataSource(response[index])
setItemSource(hadleModify(response[index]))
Auth.setItem(hadleModify(response[index]))
Auth.setIndex(index)


})



  
},[])



  return (
    <div className="player">
      
      <div className="player__body">
        {/*<Sidebar />*/}
        {dataSource != null ?<Body dataSource={dataSource} />:<BodyContainer dataSource={dataSource} />}
      </div>
      
    </div>
  );
}

export default Player;
