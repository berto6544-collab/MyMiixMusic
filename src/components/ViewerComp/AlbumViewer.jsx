import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Utils from '../../Utility/Utils';
import { BrowserRouter as Router, Link,useParams } from 'react-router-dom';
import 'lazysizes';
import * as Themes from '../../Utility/Theme';
import {Button,Container,Card,Carousel,Badge} from 'react-bootstrap';
import '../../music-css/SongColumn.css'

const Casual = ({dataSource,dataSourcce,hasMorre}) =>{


    
//handels map array and grab all games detail and stores in content 

const contents = dataSource.map((posts,i) => {



    return(
      <a href={'/song/'+posts.uniqId}  className="songRow" >
      <i class="fa fa-play-circle play" style={{position:'absolute'}}></i> 

<div className="songRow__album">
  

  <img className="songRow__album" src={posts?.art} alt="" />
</div>
      <div className="songRow__info">
        <h1>{posts.title}</h1>
        
      </div>
    </a>
          )

    
    
    

})



return(<div style={{ width:"100%",marginTop:30 }}>


<div style={{paddingLeft:20,paddingRight:20,display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
<div className="body__info_view">
       
       <div className="body__infoText">
         <strong>Albums</strong>
         
     
       </div>
       
     </div>
     <a style={{textDecoration:'none'}} href={"/explore/Albums"} ><b>ShowAll</b></a>

</div>
<InfiniteScroll 
dataLength={dataSource.length}
className={'grid'}
style={{ width:"100%" }} //To put endMessage and loader to the top.
inverse={false}

hasMore={false}
endMessage={false}

loader={hasMorre == true && dataSourcce.map((posts,i) => {
    
    return(<Card style={{backgroundColor:Themes[Utils.getThemeMode()].BackgroundColorTheme,border:'1px solid '+Themes[Utils.getThemeMode()].borderColor+'',color:Themes[Utils.getThemeMode()].Color,width:'100%',height:250}} id={"postBody"} className={"postCard"}>      
    
           </Card>)
    })
    
    }
scrollThreshold={0.8}

>
{contents}


</InfiniteScroll>

</div>








)


}



  

export default Casual;