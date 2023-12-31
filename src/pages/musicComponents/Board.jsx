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
const [search,setSearch] = React.useState("");
const [hasMore,setHasMore] = React.useState(false)

React.useEffect(()=>{

API.API.MusicData(start,search)
.then(response=>{
  console.log(response)

  setDataSource(response)
  setItemSource(response.TopHits[index])

  


})



  
},[])



const Search = () =>{

  setDataSource(null)
  setItemSource(null)
  API.API.MusicData(start,search)
.then(response=>{
  console.log(response)

  setDataSource(response)
  setItemSource(response.TopHits[index])

  //setItemSongSource(response.TopHits[index])


})

}


  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body setSearch={setSearch} searcch={search} Search={Search} spotify={spotify} dataSource={dataSource} />
      </div>
      
    </div>
  );
}

export default Player;
