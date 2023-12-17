import React from "react";
import "../../music-css/Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AuthApi from "../../components/AuthApi";



function Sidebar() {
const Auth = React.useContext(AuthApi);

if(Auth.openMenu){

  return (
    <div className="sidebar" style={{width:'70%',minWidth:'70%',display:'flex',position:'fixed',zIndex:1}}>
      
      <SidebarOption href={'/'} Icon={'b'} option="Home" />
      
      <SidebarOption href={'/explore/Spotify'} Icon={'b'} option="Spotify" />
      <SidebarOption href={'/explore/Soundcloud'} Icon={'b'} option="SoundCloud" />
      <SidebarOption href={'/explore/Youtube'} Icon={'b'} option="YouTube" />
      
     
    </div>
  );
}else{

  return(<div className="sidebar">
      
  <SidebarOption href={'/'} Icon={'b'} option="Home" />
  <SidebarOption href={'/explore/Spotify'} Icon={'b'} option="Spotify" />
  <SidebarOption href={'/explore/Soundcloud'} Icon={'b'} option="SoundCloud" />
  <SidebarOption href={'/explore/Youtube'} Icon={'b'} option="YouTube" />

 
</div>)
}
}

export default Sidebar;
