import React from "react";
import "../../music-css/SidebarOption.css";

function SidebarOption({ option = "test", Icon,href }) {
  return (
    <a href={href} style={{textDecoration:'none'}} className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{option}</h4> : <p>{option}</p>}
    </a>
  );
}

export default SidebarOption;
