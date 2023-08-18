import React from "react";
import "../../music-css/Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

function Sidebar() {


  return (
    <div className="sidebar">
      
      <SidebarOption href={'/'} Icon={'b'} option="Home" />
      <SidebarOption href={'/libary'} Icon={'b'} option="Your Library" />
      <SidebarOption href={'/explore/Spotify'} Icon={'b'} option="Spotify" />
      <SidebarOption href={'/explore/Soundcloud'} Icon={'b'} option="SoundCloud" />
      <SidebarOption href={'/explore/Youtube'} Icon={'b'} option="Youtube" />
      <br />
     
    </div>
  );
}

export default Sidebar;
