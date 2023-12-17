import React from "react";
import "../../music-css/Body.css";
import Header from "./Header";

import SongRow from "./SongExplorerRow";
import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';
import InfiniteScroll  from "react-infinite-scroll-component";
import BodyInfo from "./BodyInfo";
import '../../music-css/SongColumn.css'
import Sidebar from "./Sidebar";



function Body({dataSource,q,scroll,searcch,setSearch,Search}) {
const Auth = React.useContext(AuthApi);



const [index,setIndex] =  React.useState(0);



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
  
  reactLocalStorage.setObject("SongData",arraySong)

 return arraySong;
  
}

if(dataSource.length === 0) return null;
  return (
    <div className="body-artist">


      
<BodyInfo art={q == "TopHits"? "https://cdn-profiles.tunein.com/s221182/images/logod.png?t=637726155150000000"
:dataSource[0].art || dataSource[0].SongData[0]?.img
} 
searcch={searcch} 
setSearch={setSearch} 
Search={Search}
info={''}  name={q} title={''} />




      <div className="body__songs_artists">
        
      
      <InfiniteScroll 
dataLength={dataSource.length}
className={'grid'}
style={{ width:"100%" }} //To put endMessage and loader to the top.
inverse={false}
hasMore={true}
endMessage={false}
next={scroll}
scrollThreshold={0.8}
>


{dataSource.map((item,i)=>{



 
return(<SongRow key={item.id} q={q} item={item} index={i} setIndex={setIndex}  />)        



})}

</InfiniteScroll>

      </div>
    </div>
  );
}

export default Body;
