import React from 'react';
import  'bootstrap/dist/css/bootstrap.css';
import '../css/Feed.css';
import AuthApi from "../components/AuthApi";
import Divider from '@mui/material/Divider';
import Utils from '../Utility/Utils';
import { BrowserRouter as Router, Link, Redirect, Route,Switch,useParams } from 'react-router-dom';
import DialogSmall from '../dialog-components/DialogSmall';
import Donate from './DonateDialog';
import 'lazysizes';
import ReactPlayer from 'react-player'
import * as Themes from '../Utility/Theme';



import { textAlign } from '@mui/system';
import Share from '../components/ShareComponent';
import RecentGame from '../components/ViewerComp/RecentGamesViewer';
const urlParams = new URLSearchParams(window.location.search);
let theme = "light";
  


function Trending(props) {

    const Auth = React.useContext(AuthApi);
    const {uniqid} = useParams();
const [dataSource, setDataSource] = React.useState([]);
const [dataSourccce, setDataSourccce] = React.useState([]);
const [start,setStart] = React.useState(0);
const [index,setIndex] = React.useState(0);
const[image,setImage]=React.useState('https://mymiix.com/public/assets/img/generatedart/0tAMfbCm.jpg')
const [showDonate,setShowDonate] = React.useState(false);
const [ScreenShot,setScreenShot] = React.useState([]);
const[Type,setType] = React.useState("");
const[SearchDate,setSearchDate] = React.useState("");




const [hasMorre, setHasMore] = React.useState(false);
const refImage = React.useRef(null);
var fontBase = 1000,                 
fontSize = 20; 


React.useEffect(()=>{
    fetchDatta();
    fetchData();

},[])

const fetchData = (search) => {
  
//setDataSource(GameHosts)
//Grab eventData from the api 
fetch(process.env.REACT_APP_API+'/eventData?start='+start+'&q='+search,{method:'GET'})
.then(response => response.json())
.then(responseJSON=>{

    if(responseJSON.length > 0){
    setDataSource(modifyData(responseJSON))
    //console.log(modifyData(responseJSON))
    setStart(start+1)
    setHasMore(true)
    //setHasMore(false)
    }else{


    }
    

})

   
    
}



const fetchDatta = () => {
  
    //setDataSource(GameHosts)
    //Grab eventData from the api 
    fetch(process.env.REACT_APP_API+'/eventDataUniq?uniq='+uniqid,{method:'GET'})
    .then(response => response.json())
    .then(responseJSON=>{
      console.log(responseJSON)
        if(responseJSON.length > 0){
            setDataSourccce(responseJSON)
            if(responseJSON[0].Screenshot != ""){

              setScreenShot(responseJSON[0].Screenshot.split(','));
            }
            
            //setScreenShot
            fetchData(responseJSON[0].KeyWords)

          
            
        
        }else{
    
    
        }
        
    
    })
    
       
        
    }





const modifyData = (data) => { 
    
    const  numColumns = 1;
    const addBannerAfterIndex = 10;
   
    const arr = [];
    var tmp = [];


  
  
    data.forEach((val, index) => {
      

     

       
        
      if (index % numColumns == 0){
      
        arr.push({ 
     type: '',
     postId: val.postId,
     UserName: val.UserName,
     Uniqid:val.Uniqid,
     profile: val.profile,
     Image: val.Image,
     Title:val.Title
     

        
    });
  }
        //tmp = [];
  




if (index % addBannerAfterIndex === 0 && index != 0){
       
        
    arr.push({
      type: 'banner',
      body:'ad',
   });
  }


 
         

      
    });

    return arr; 
   
  
   
   
  

  }








if(dataSourccce.length > 0){
return ( 
        
    <div style={{width:"100%", margin:0,display:'flex',flexDirection:'column',alignItems:'center'}} className="ulPost"> 
   
   <div  style={{marginBottom:60,width:'100%',justifyContent:'center',display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,zIndex:10}}>
       
   
 
   
    <div id="topPost" style={{width:'100%' ,alignItems:'center',display:'flex',flexDirection:'column',alignItems:'center',flexDirection:'column',position:'relative',marginBottom:10,backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,color:Themes[Utils.getThemeMode()].Color}}>
    
 
   

    

   









<div  style={{position:'relative',width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

<div className={'imageStyle'} style={{backgroundColor:'rgba(0, 0, 0, 0.12)',border:'0px'}}>


{dataSourccce[0].contentType == "html"?<iframe src={dataSourccce[0].UrlSource+'/index.html'} style={{width:'100%',height:'100%',position:'absolute',zIndex:5}} width={'100%'} height={'100%'} title={dataSourccce[0].Title} border />:null}

{dataSourccce[0].contentType == "downloadable"?<div style={{display:'flex',flexDirection:'column',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.8)',zIndex:11,alignItems:'center',position:'absolute',width:'100%',height:'100%'}}>
  
  {dataSourccce[0].PricingType == "payment" && dataSourccce[0].PaymentCount == 1 || dataSourccce[0].PricingType != "payment" ? <div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>
  <h1 style={{color:'white',textTransform:'capitalize'}}>Download {dataSourccce[0].Title}</h1>
  <a href={dataSourccce[0].UrlSource+'/'+dataSourccce[0].Title+'.zip'} download={dataSourccce[0].Title+'.zip'} style={{padding:10,width:'50%',textAlign:'center',textTransform:'capitalize',color:'rgb(0, 123, 255)',fontWeight:'bold',backgroundColor:'white',textDecoration:'none',borderRadius:'0.5rem'}} >Download</a>
  </div>:
  <div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>
  <h1 style={{color:'white',textTransform:'capitalize'}}>{dataSourccce[0].Title}</h1>
  <h1 style={{color:'white',textTransform:'capitalize'}}>$ {dataSourccce[0].Pricing} USD</h1>
  <a  style={{padding:10,cursor:'pointer',textAlign:'center',textTransform:'capitalize',color:'rgb(0, 123, 255)',fontWeight:'bold',backgroundColor:'white',textDecoration:'none',borderRadius:'0.5rem'}} >BUY NOW</a>
  </div>
  
  
  }
  
  </div>
:null


}
{<img  style={{width:'100%',height:'100%',position:'absolute',objectFit:'cover'}} src={dataSourccce[0].Image} />}

</div>




</div>



<div style={{width:'100%'}} className={'about container'} >
        <div style={{width:'100%',border:'1px solid lightgrey',position:'relative',overflowX:'hidden',padding:10,display:'flex',flexDirection:'column',alignItems:'center'}}>

      
        <div style={{width:'100%',position:'relative',padding:10}}>
      <h2 style={{fontWeight:'bold',textTransform:'capitalize'}}>{dataSourccce[0].Title}</h2>
      <p style={{lineHeight:'0.7px'}}>{dataSourccce[0].ShortDescription}</p>
        
      </div>

      <div style={{width:'100%',position:'relative',padding:10}}>
      <p>Released: {dataSourccce[0].Date}</p>
    
        
      </div>

      


      <Divider />

      <div style={{width:'100%',whiteSpace:'break-spaces',position:'relative',padding:10}}>
      <p >{dataSourccce[0].Description.replaceAll("[nl]" , "\n")}</p>

      </div>

      <div style={{width:'100%',position:'relative',padding:10}}>
      <b>Released:</b>
      <p>{dataSourccce[0].Date}</p>
        
      </div>

      {dataSourccce[0].contentType == "downloadable"?<div style={{width:'100%',position:'relative',padding:10}}>
      <b>Downloadable File:</b>
      <p>{dataSourccce[0].Title+'.zip'}</p>
        
      </div>:null}

      {dataSourccce.length > 0 && dataSourccce[0].KeyWords.split(',').length > 0?<div style={{width:'100%',position:'relative',padding:10,marginBottom:20}}>
      
      <b>Keywords:</b>
      <div style={{display:'flex',flexWrap:'wrap',marginTop:10,alignItems:'center',width:'100%'}}>
{dataSourccce[0].KeyWords.split(',').map((p,i)=>
{


return(<a  href={'/games/'+p} style={{padding:8,margin:5,textTransform:'capitalize',color:'rgb(0, 123, 255)',fontWeight:'bold',border:'1px solid rgb(0, 123, 255)',textDecoration:'none',borderRadius:'0.5rem'}} key={i}>{p}</a>)

})}

    </div></div>:null}

    
    {dataSourccce[0].PricingType == "donation"?<div style={{width:'100%',position:'relative',padding:10}}>
      <b>Doante:</b>


      <div style={{display:'flex',flexWrap:'wrap',marginTop:10,alignItems:'center',width:'100%'}}><a  onClick={()=>{

        setShowDonate(true)
      }} style={{padding:8,textTransform:'capitalize',color:'rgb(0, 123, 255)',cursor:'pointer',fontWeight:'bold',border:'1px solid rgb(0, 123, 255)',textDecoration:'none',borderRadius:'0.5rem'}} >Donate</a>
        
      </div></div> : null}


      {ScreenShot.length > 0?<div style={{width:'100%',position:'relative',padding:10}}>
      <b>ScreenShots:</b>
      {<div style={{width:'100%',height:300,display:'-webkit-inline-box',gridTemplateColumns:'repeat(5,1fr)',flexDirection:'row',overflow:'hidden',overflowX:'auto',backgroundColor:'rgb(214, 218, 225)',position:'relative'}} >
      {ScreenShot.length > 0 && ScreenShot.map((p,i)=>{
         

         return(<div style={{position:'relative',cursor:'pointer'}}><img style={{padding:10,height:300,width:'100%',objectFit:'cover',borderRadius:15}} src={p} /></div>)

       })}
       </div>}

       </div>:null}


       {dataSourccce[0].Gameplay !=  ""?
       <div style={{width:'100%',position:'relative',padding:10,marginTop:20}}>
        <b>Gameplay:</b>
        <ReactPlayer url={dataSourccce[0].Gameplay} width={'100%'} height={400} style={{width:'100%',height:400}} />

       </div>:null}

     
        
      {dataSourccce.length > 0 && dataSourccce[index].StoreLinks.length > 0?<div style={{width:'100%',position:'relative',padding:10,marginBottom:20}}>
      <b>StoreLink</b>
      <div style={{display:'flex',width:'100%',alignItems:'center',marginTop:5}}>
      {dataSourccce.length > 0 && dataSourccce[index]?.StoreLinks.map((posts,i)=>{

        if(posts.Appstore != ""){
          return(<a key={i} style={{padding:8,color:'rgb(0, 123, 255)',margin:5,fontWeight:'bold',border:'1px solid rgb(0, 123, 255)',textDecoration:'none',borderRadius:'0.5rem'}} href={posts.Appstore}>AppStore</a>)
        }


        if(posts.SteamStore != ""){
          return(<a key={i} style={{padding:8,color:'rgb(0, 123, 255)',margin:5,fontWeight:'bold',border:'1px solid rgb(0, 123, 255)',textDecoration:'none',borderRadius:'0.5rem'}} href={posts.SteamStore}>Steam</a>)
        }

        if(posts.GooglePlayStore != ""){

          return(<a key={i} style={{padding:8,color:'rgb(0, 123, 255)',margin:5,fontWeight:'bold',border:'1px solid rgb(0, 123, 255)',textDecoration:'none',borderRadius:'0.5rem'}} href={posts.GooglePlayStore}>GooglePlay</a>)

        }

        if(posts.AmazonStore != ""){

          return(<a key={i} style={{padding:8,color:'rgb(0, 123, 255)',margin:5,fontWeight:'bold',border:'1px solid rgb(0, 123, 255)',textDecoration:'none',borderRadius:'0.5rem'}} href={posts.AmazonStore}>AmazonStore</a>)

        }

        if(posts.WindowStore != ""){

          return(<a key={i} style={{padding:8,color:'rgb(0, 123, 255)',margin:5,fontWeight:'bold',border:'1px solid rgb(0, 123, 255)',textDecoration:'none',borderRadius:'0.5rem'}} href={posts.WindowStore}>WindowStore</a>)

        }

      })}

      </div>

    </div>:null}

        


   
        
      <Share dataSourccce={dataSourccce} />


    

<Divider />

      <RecentGame dataSource={dataSource}  dataSourccce={dataSourccce} />


      

      




        </div>

       

        </div>


    
    


        </div>
        </div>

   
        


        





    {dataSourccce[0].PricingType == "free"?null:<DialogSmall Title={'Doante'}  isOpen={showDonate} handleClose={()=>setShowDonate(false)}  Data={<Donate userData={props.userData} amount={dataSourccce[0]?.Pricing} username={dataSourccce[0].UserName} />} />} 
  
    </div>
    
    )
}
}





  




  


export default Trending;