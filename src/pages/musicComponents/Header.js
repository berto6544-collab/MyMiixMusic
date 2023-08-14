import React from "react";
import "../../music-css/Header.css";

import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

function Header({ spotify }) {

  useEffect(()=>{

    

  },[])

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      
    </div>
  );
}

export default Header;
