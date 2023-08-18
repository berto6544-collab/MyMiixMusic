import React from 'react';
import Header from './Header';


const BodyInfo = ({info,art,name,searcch,setSearch,Search,title}) =>{


return(<div className="body__info">
<img src={art} alt="" />
<div className="body__infoText">

  <strong>{info}</strong>
  <h2>{name}</h2>
  <p>{title}</p>
  <Header searcch={searcch} setSearch={setSearch} Search={Search} />
</div>

</div>)
    

}

export default BodyInfo;