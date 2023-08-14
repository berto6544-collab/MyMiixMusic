import React from "react";
import "../../music-css/Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

function Sidebar() {


  return (
    <div className="sidebar">
      
      <SidebarOption href={'/'} Icon={HomeIcon} option="Home" />
      <SidebarOption href={'/libary'} Icon={LibraryMusicIcon} option="Your Library" />
      <br />
     
    </div>
  );
}

export default Sidebar;
