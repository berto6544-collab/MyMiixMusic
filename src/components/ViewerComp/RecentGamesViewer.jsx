import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Divider from '@mui/material/Divider';
import Utils from '../../Utility/Utils';
import '../../music-css/SongRow.css'

import 'lazysizes';

import * as Themes from '../../Utility/Theme';



const RecentGame = ({dataSource,dataSourccce}) =>{





//handels map array and grab all games detail and stores in content 

const contents = dataSource.map((posts,i) => {


    if(posts.type == ""){
    return(
        <a href={'/game/'+posts.Title} style={{overflow:'hidden',cursor:'pointer', backgroundColor:Themes[Utils.getThemeMode()].BackgroundColorTheme,border:'1px solid '+Themes[Utils.getThemeMode()].borderColor+'',color:Themes[Utils.getThemeMode()].Color}} id={"postBody"} className={"postCard"} data-id={posts.postId} key={""+posts.postId+""}>      
                
                <div className={'ImageCover'} style={{alignItems:'center',width:'100%',height:200,alignContent:'center',position:'relative'}}>
                
                <div style={{position:'absolute',width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:'rgba(0,0,0,0.7)',zIndex:2}}>
                

                </div>
               
                <Canvas Image={posts.Image} ArtistName={posts.UserName} />

                </div>

                
      
       
                
        
        
        </a>
          )

    }
    
    if(posts.type == "banner"){
        return(
        <div style={{overflow:'hidden', backgroundColor:Themes[Utils.getThemeMode()].BackgroundColorTheme,border:'1px solid '+Themes[Utils.getThemeMode()].borderColor+'',color:Themes[Utils.getThemeMode()].Color}} id={"postBody"} className={"postCard"} data-id={posts.postId} key={""+posts.postId+""}>      
        <div className={'ImageCover'} style={{alignItems:'center',width:'100%',display:'flex',flexDirection:'column',alignItems:'center',overflowY:'hidden',height:200,alignContent:'center',position:'relative'}}>
        
      </div>
        </div>)
    }

})


    return(
        <div style={{ width:"100%",paddingTop:30,border:'1px solid lightgrey',marginTop:30 }}>


<div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
<h2 style={{color:'black', direction:'ltr',textTransform:'capitalize', fontFamily:'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontSize:33, fontWeight:'700',letterSpacing:'normal', lineHeight:'120%',paddingLeft:20, textAlign:'left',alignSelf:'self-start', marginTop:0, marginBottom:0}}><span >More Games Like {dataSourccce[0]?.Title}</span> </h2>
</div>
    <InfiniteScroll 
    dataLength={dataSource.length}
    className={'grid'}
    style={{ width:"100%" }} //To put endMessage and loader to the top.
    inverse={false}
    hasMore={false}
    endMessage={false}

   
    scrollThreshold={0.8}
 
    //scrollableTarget="scrollableDiv"
    >
    {contents}
    
    <a href={dataSourccce.length > 0 && dataSourccce[0].KeyWords.split(',').length > 0? '/games/'+dataSourccce[0].KeyWords.split(',')[0] : '/games'} style={{overflow:'hidden',cursor:'pointer', backgroundColor:Themes[Utils.getThemeMode()].BackgroundColorTheme,border:'1px solid '+Themes[Utils.getThemeMode()].borderColor+'',color:Themes[Utils.getThemeMode()].Color}} id={"postBody"} className={"postCard"}>      
                
                <div className={'ImageCover'} style={{alignItems:'center',width:'100%',justifyContent:'center',display:'flex',flexDirection:'column',textAlign:'center',height:200,alignContent:'center',position:'relative'}}>
                
               <p>More</p>
             

                </div>

                
      
       
                
        
        
        </a>
    </InfiniteScroll>


    
 
    </div>
    )
}




class Canvas extends React.Component {

  
    constructor(props) {
      super(props);
      this.state = {
          
      };
   
  
  
    }
  
  
  
  
    render() {
      return (
          <img  style={{width:'100%',height:'100%',position:'absolute',objectFit:'cover'}} src={this.props.Image}></img>
      );
    }
  }
  


export default RecentGame;

