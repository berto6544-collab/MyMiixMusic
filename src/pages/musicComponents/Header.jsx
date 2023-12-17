import React from "react";
import "../../music-css/Header.css";

import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

function Header({ spotify,setSearch,searcch,Search }) {

  useEffect(()=>{

    

  },[])

  return (
    <div className="header">
      <div className="header__left">
        
        <input
          onChange={(e)=>setSearch(e.target.value)}
          value={searcch}
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      <SearchIcon style={{cursor:'pointer'}} onClick={()=>{Search();}} />
      </div>
      
    </div>
  );
}

export default Header;
