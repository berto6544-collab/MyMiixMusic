import React from "react";
import Footer from "./Footer";
import "../../music-css/Player.css";

import Sidebar from "./Sidebar";
import Body from "./MainBody";
import API from "../../components/API/API";


function Player({ spotify,userData }) {

const [dataSource,setDataSource] = React.useState(null);
const [ItemSource,setItemSource] = React.useState(null);
const [ItemSourceSong,setItemSongSource] = React.useState([]);
const [index,setIndex] = React.useState(0);
const [start,setStart] = React.useState(0);
const [hasMore,setHasMore] = React.useState(false)

React.useEffect(()=>{

API.API.MusicData(start)
.then(response=>{
  console.log(response)

  setDataSource(response)
  setItemSource(response.TopHits[index])

  //setItemSongSource(response.TopHits[index])


})



  
},[])



  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body spotify={spotify} dataSource={dataSource} />
      </div>
      <Footer spotify={spotify} itemSource={ItemSourceSong} index={index} />
    </div>
  );
}

export default Player;
