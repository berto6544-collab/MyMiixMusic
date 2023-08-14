import React from "react";

import "../../music-css/Player.css";
import { BrowserRouter as Router, Link, Redirect,useParams } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Body from "./BodyExplore";
import BodyContainer from "./BodyContainer";
import API from "../../components/API/API";
import AuthApi from "../../components/AuthApi";


function Player({ spotify,userData }) {

  const Auth = React.useContext(AuthApi);
  const {q} = useParams();

const [dataSource,setDataSource] = React.useState([]);
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

API.API.MusicDataExplore(q,start)
.then(response=>{


  if(response.length > 0 ){
setDataSource(response)
setItemSource(hadleModify(response[index]))
Auth.setItem(hadleModify(response[index]))
setStart(start+1)
Auth.setIndex(index)

  }
})



  
},[])

const Scroll = () =>{

  API.API.MusicDataExplore(q,start)
.then(response=>{


  if(response.length > 0 ){
setDataSource(dataSource.concat(response))
setStart(start+1)

  }
})

}

  return (
    <div className="player">
      
      <div className="player__body">
        {/*<Sidebar />*/}
        {dataSource != null ?<Body dataSource={dataSource} scroll={Scroll} q={q} />:<BodyContainer dataSource={dataSource} />}
      </div>
      
    </div>
  );
}

export default Player;
