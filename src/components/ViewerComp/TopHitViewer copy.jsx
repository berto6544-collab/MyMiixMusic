import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Utils from '../../Utility/Utils';
import 'lazysizes';
import * as Themes from '../../Utility/Theme';
import {Card} from 'react-bootstrap';
import '../../music-css/SongColumn.css'

const Arcade = ({dataSource,dataSourcce,hasMorre}) =>{


    
//handels map array and grab all games detail and stores in content 

const contents = dataSource.map((posts,i) => {



    return(
      <div onClick={()=>{
        window.location.href = '/song/'+posts.uniqId
      }} className="songRow" >
        
        <i class="fa fa-play-circle play" style={{position:'absolute'}}></i> 

      <div className="songRow__album">
        
      
        <img className="songRow__album" src={posts?.art} alt="" />
      </div>
      <div className="songRow__info">
        <h1>{posts?.title}</h1>
        
      </div>
    </div>
          )

    
    
    

})



return(<div style={{ width:"100%",marginTop:30 }}>


<div style={{paddingLeft:20,paddingRight:20,display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>

<div className="body__info">
       
       <div className="body__infoText">
         <strong>Top Hits</strong>
         
     
       </div>
     </div>
<a style={{textDecoration:'none'}} href={"/explore/tophits"} ><b>Show All</b></a>

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



  
class Canvas extends React.Component {

  
    constructor(props) {
      super(props);
      this.state = {
          
      };
    this.refImage = React.createRef(); 
  
  
    }
  
  
 
  componentDidMount(){
  
    
    
  }
  
  
    render() {
      return (
          <img ref={this.refImage} style={{width:'100%',height:'100%',position:'absolute',objectFit:'cover'}} src={this.props.Image} />
      );
    }
  }

export default Arcade;