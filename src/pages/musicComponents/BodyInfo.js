import React from 'react';


const BodyInfo = ({info,art,name,title}) =>{


return(<div className="body__info">
<img src={art} alt="" />
<div className="body__infoText">
  <strong>{info}</strong>
  <h2>{name}</h2>
  <p>{title}</p>
</div>
</div>)
    

}

export default BodyInfo;