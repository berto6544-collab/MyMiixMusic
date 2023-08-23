import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Utils from '../../Utility/Utils';
import { BrowserRouter as Router, Link,useParams } from 'react-router-dom';
import 'lazysizes';
import * as Themes from '../../Utility/Theme';
import {Button,Container,Card,Carousel,Badge} from 'react-bootstrap';
import '../../music-css/SongColumn.css'

const NewRelease = ({dataSource,dataSourcce,hasMorre,Title}) =>{


    
//handels map array and grab all games detail and stores in content 

const contents = dataSource.map((posts,i) => {



  return(
    <div onClick={()=>{
      
    }} className="songRow" >
    

<div className="songRow__album" style={{backgroundColor:'black'}}>
  

 
</div>
    <div   style={{padding:10,height:40,width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
      <div style={{backgroundColor:'lightgrey',height:10,width:'100%'}}>{posts.title}</div>
      <div style={{backgroundColor:'lightgrey',height:10,width:'100%',marginTop:5}}>{posts.title}</div>
      <div style={{backgroundColor:'lightgrey',height:10,width:'100%',marginTop:5}}>{posts.title}</div>
    </div>
  </div>
        )

  
  
  

})



return(<div style={{ width:"100%",marginTop:30 }}>


<div style={{paddingLeft:20,paddingRight:20,display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
<div className="body__info">
       
       <div className="body__infoText">
         <strong>{Title}</strong>
         
     
       </div>
     </div>
<a style={{textDecoration:'none'}} href={"/explore/new"} ><b>ShowAll</b></a>

</div>
<InfiniteScroll 
dataLength={dataSource.length}
className={'grid'}
style={{ width:"100%" }} //To put endMessage and loader to the top.
inverse={false}

hasMore={false}
endMessage={false}


scrollThreshold={0.8}

>
{contents}


</InfiniteScroll>

</div>








)


}



  


export default NewRelease;