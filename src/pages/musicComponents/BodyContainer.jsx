import React from "react";
import "../../music-css/Body.css";
import Header from "./Header";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongRow";
import AuthApi from "../../components/AuthApi";
import {reactLocalStorage} from 'reactjs-localstorage';


function Body() {
const Auth = React.useContext(AuthApi);



const [index,setIndex] =  React.useState(0);
const [dataSource,setDataSource] = React.useState({

art:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
SongData: [
    {
    musicSrc:"",
    cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
    name:"title",
    artist:"name"   

  },
  {
    musicSrc:"",
    cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
    name:"title",
    artist:"name"   

  },
  {
    musicSrc:"",
    cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
    name:"title",
    artist:"name"   

  },
  {
    musicSrc:"",
    cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
    name:"title",
    artist:"name"   

  },
  {
    musicSrc:"",
    cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
    name:"title",
    artist:"name"   

  },
  {
    musicSrc:"",
    cover:"https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-frost.png",
    name:"title",
    artist:"name"   

  }

]

})






  return (
    <div className="body-artist">


      <div className="body__info">
        <img src={dataSource.art} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Title</h2>
          <p>Name</p>
        </div>
      </div>

      <div className="body__songs_artists">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
           
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

      {dataSource.SongData.map((item,i)=>{

      return(<SongRow item={item} index={i} setIndex={setIndex} dataSource={dataSource} />)        

      })}


      </div>
    </div>
  );
}

export default Body;