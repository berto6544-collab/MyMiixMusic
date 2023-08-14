
import React from 'react';
import '../css/Feed.css';
import '../css/Landingpagge.css';

//import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import {Container} from 'react-bootstrap';
import AuthApi from "../components/AuthApi";
import Cookies from 'js-cookie';
import * as Themes from '../Utility/Theme';
import Utils from '../Utility/Utils';

import {Link,useParams} from 'react-router-dom';
import Logo from '../assets/minglemiixicon.png';
import {Divider,Card} from '@mui/material';

import InfiniteScroll from 'react-infinite-scroll-component';
//import DialogMenu from '../components/DialogFullMenu';
function Landing() {

    const Auth = React.useContext(AuthApi);
    let {refferal} = useParams();
    const [start,setStart] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([]);
    const [dataSourcce, setDataSourcce] = React.useState([1,2,3,4]);
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [dataSet,setData] = React.useState('');
    const [ismenu,setisMenu] = React.useState(false);
    const [hasMorre, setHasMore] = React.useState(false);
    const Dates = new Date()
    const year = Dates.getFullYear();
    const month = Dates.getMonth() + 1;
    const Day = Dates.getDate();
const DayMonth = Day+"-"+month;

    React.useEffect(()=>{
   
        fetchData();
    
    },[])

    const handleOnClick = () =>{
        fetch(process.env.REACT_APP_SITE+'/api/autth', {
            method: 'POST',
            body: JSON.stringify({'email': email, 'password': password}),
          })
          .then(response => response.json())
          .then(data => {
            
            if(data.Error == "Invalid username or password" || data.Error == "Invalid username or password"){
            console.log(data.Error)
            setData(data.Error);
            }else{
           Cookies.set('SCOM', data.Token, { expires: 720 });
           Cookies.set('SCOM_', '1', { expires: 715 });
           Auth.setAuth(data.Token);
           Cookies.set('userId',data.userAuth.userId, { expires: 720 });
           console.log(data.resp);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
    


    const fetchData = () => {
  
        //setDataSource(GameHosts)
        //Grab eventData from the api 
        fetch(process.env.REACT_APP_SITE+'/api/eventData?start='+start,{method:'GET'})
        .then(response => response.json())
        .then(responseJSON=>{
        
            if(responseJSON.length > 0){
            setDataSource(modifyData(responseJSON))
            //console.log(modifyData(responseJSON))
            setStart(start+1)
            setHasMore(true)
            }else{
        
        
            }
            
        
        })
        
           
            
        }


//handels map array and grab all games detail and stores in content 

const contents = dataSource.map((posts,i) => {


    if(posts.type == ""){
    return(
        <a href={'https://ai.mymiix.com/post/'+posts.Uniqid} className={'devv-block devv-block-1 devv-image postCard'} style={{overflow:'hidden',cursor:'pointer', backgroundColor:Themes[Utils.getThemeMode()].BackgroundColorTheme,border:'1px solid '+Themes[Utils.getThemeMode()].borderColor+'',color:Themes[Utils.getThemeMode()].Color}} id={"postBody"}  data-id={posts.postId} key={""+posts.postId+""}>      
                
                <div className={'ImageCover'} style={{alignItems:'center',width:'100%',height:200,alignContent:'center',position:'relative'}}>
                
               
                <Canvas Image={posts.Image} ArtistName={posts.ArtistUserName} />

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





const handleClosse = () =>{
  setisMenu(false)
}

    return ( 
        
      <div className="devv-page-container">
      {DayMonth == "25-12"?<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <h1>Merry Christmas</h1>
    </div>:null}

      {DayMonth == "01-01"?<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <h1>Happy New Year! {year}</h1>
    </div>:null}



<div className="devv-row devv-row-3" style={{backgroundColor:'rgb(0, 123, 255)',backgroundSize:'cover'}}>
<div className="devv-row-content" style={{backgroundColor:'transparent',display:'flex:',flexDirection:'column',alignItems:'center'}}>
<div className="devv-col devv-col-1 ">
<div className="devv-block devv-block-1 devv-spacer">
<div className="spacer" style={{height:35}}></div>
</div>
<div className="devv-block devv-block-2 devv-heading">
{/*<h1 style={{color:'black', direction:'ltr', fontFamily:'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontSize:16,fontWeight:700,letterSpacing:3, lineHeight:'120%', textAlign:'center', marginTop:0, marginBottom:0}}><span className="tinyMce-placeholder">AI.MyMiix​</span> </h1>*/}
</div>
<div className="devv-block devv-block-3 devv-heading">
<h1 style={{color:'white',direction:'ltr',fontFamily:'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontSize:62, fontWeight:700,letterSpacing:'normal',lineHeight:'120%',textAlign:'center',marginTop:0, marginBottom:0,wordWrap:'break-word'}}><strong>MyMiix Music</strong> </h1>

</div>

<div style={{color:'white'}} className="devv-block devv-block-4 devv-paragraph">

<b>Buy & Stream Music On MyMiix.</b>
</div>


<div className="devv-block devv-block-5 devv-button"><a className="devv-button-content" href={"https://mymiix.com/signup?redirect=https://music.mymiix.com"} style={{fontSize: 16, backgroundColor: '#ffffff', borderRadius: 50,  color: ' rgb(0, 123, 255)', Direction: 'ltr', fontFamily: 'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontWeight: 600, maxWidth: '100%', paddingBottom: 10, paddingLeft: 25, paddingRight: 25, paddingTop: 10, width: 'auto', display: 'inline-block'}}><span dir="ltr" style={{wordBreak: 'break-word', fontSize: 18, lineHeight: '200%'}}>Sign up</span></a></div>

<p></p>
</div>
<div className="devv-col devv-col-2 devv-col-w7">
</div>
</div>
</div>



<div className="devv-row devv-row-5" style={{backgroundImage: 'linear-gradient(rgb(0, 123, 255), rgb(0, 123, 255),white)'}}>
<div className="devv-row-content" style={{maxWidth:900,backgroundImage: 'linear-gradient(rgb(0, 123, 255), rgb(0, 123, 255),white)'}}>
<div className="devv-col devv-col-1 devv-col-w6">
<div className="devv-block devv-block-1 devv-image"><img alt="Students 2" className="devv-center devv-fixedwidth" src={'https://mymiix.com/public/assets/img/plus.png'} style={{maxWidth:'244px'}}/></div>
</div>
<div className="devv-col devv-col-2 devv-col-w6">
<div className="devv-block devv-block-1 devv-heading">
<h2 style={{color:'black', direction:'ltr', fontFamily:'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontSize:33, fontWeight:'700',letterSpacing:'normal', lineHeight:'120%', textAlign:'center', marginTop:0, marginBottom:0}}><span className="tinyMce-placeholder"><strong> </strong>​</span> </h2>
</div>
<div className="devv-block devv-block-2 devv-heading">
<h2 style={{color:'black', direction:'ltr', fontFamily:'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontSize:33, fontWeight:'700',letterSpacing:'normal', lineHeight:'120%', textAlign:'center', marginTop:0, marginBottom:0}}><span className="tinyMce-placeholder">Become a Artist.​</span> </h2>
</div>
<div className="devv-block devv-block-3 devv-paragraph">
<b  style={{color:'black'}}>Artists Can Publish Their Music On MyMiix.</b>
<div style={{marginTop:20}} className="devv-block devv-block-5 devv-button"><a className="devv-button-content" href={"https://mymiix.com/signup?redirect=https://mymiix.com/creator-portal"} style={{fontSize: 16, backgroundColor: 'rgb(0, 123, 255)', borderRadius: 50,  color: '#ffffff', Direction: 'ltr', fontFamily: 'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontWeight: 600, maxWidth: '100%', paddingBottom: 10, paddingLeft: 25, paddingRight: 25, paddingTop: 10, width: 'auto', display: 'inline-block'}}><span dir="ltr" style={{wordBreak: 'break-word', fontSize: 18, lineHeight: '200%'}}>Sign up as a Artist</span></a></div>

</div>
{/*<div className="devv-block devv-block-4 devv-button"><a className="devv-button-content" href="https://mymiix.com/signup" style={{fontSize: 16, backgroundColor: '#545ae8', borderRadius: 50,  color: '#ffffff', Direction: 'ltr', fontFamily: 'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontWeight: 600, maxWidth: '100%', paddingBottom: 10, paddingLeft: 25, paddingRight: 25, paddingTop: 10, width: 'auto', display: 'inline-block'}}><span dir="ltr" style={{wordBreak: 'break-word', fontSize: 16, lineHeight: '200%'}}>Signup</span></a></div>*/}
</div>
</div>
</div>
<div className="devv-row devv-row-6"  >


<div className="spacer" style={{height:35}}></div>







</div>





<div className="devv-row devv-row-6"  >


<div style={{display:'flex',width:'100%',flexDirection:'column',textAlign:'center',padding:20,alignSelf:'center',alignItems:'center',marginBottom:50}}>
   

<h1>Frequently Asked Questions?</h1>
    
<div style={{display:'flex',width:'100%',flexDirection:'column',textAlign:'center',padding:20,alignSelf:'center',alignItems:'center',marginTop:30}}>


<h4>What is MyMiix Music?</h4>
<p className='pp'>MyMiix Music allows artists to post their souncloud,spotify music & publish their music directly on mymiix.

</p>





</div>


<div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>


<div style={{display:'flex',width:'100%',flexDirection:'column',textAlign:'center',padding:20,alignSelf:'center',alignItems:'center',marginTop:50}}>


<h4>How much do artists take?</h4>
<p className='pp'>All Artists on Mymiix will take 90% evertime a payment is made.

</p>





</div>






</div>






</div>

<Divider/>

</div>

<div className="devv-row devv-row-9">
<div className="devv-row-content">
<div className="devv-col devv-col-1 devv-col-w12">
<div className="devv-block devv-block-1 devv-paragraph"></div>
<div className="devv-block devv-block-2 devv-spacer">
<div className="spacer" style={{height:35}}></div>
</div>
</div>
</div>
</div>
<div className="devv-row devv-row-10">
<div className="devv-row-content">
<div className="devv-col devv-col-1 devv-col-w12">
<div className="devv-block devv-block-1 devv-spacer">
<div className="spacer" style={{height:20}}></div>
</div>
</div>
</div>
</div>
<div className="devv-row devv-row-11">
<div className="devv-row-content">
<div className="devv-col devv-col-1 devv-col-w5"></div>
<div className="devv-col devv-col-2 devv-col-w2"></div>
<div className="devv-col devv-col-3 devv-col-w2">
<div className="devv-block devv-block-1 devv-heading">
<h3 style={{color:'#ffffff',direction:'ltr', fontFamily:'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontSize:20, fontWeight:'400', lineHeight:'200%', textAlign:'left', marginTop:0, marginBottom:0}}><strong>Contact</strong> </h3>
</div>
<div className="devv-block devv-block-2 devv-button"><a className="devv-button-content" href="https://mymiix.com/support" style={{fontFamily: 'inherit', fontSize: '16px', backgroundColor: 'transparent',color: '#ffffff',  fontWeight:400, maxWidth: '100%', paddingBottom: '5px', paddingLeft: '20px', paddingRight:'20px', paddingTop: '5px', width: 'auto', display: 'inline-block'}}><span dir="ltr" style={{wordBreak:'break-word', fontSize: '16px', lineHeight: '200%'}}>Support</span></a></div>
</div>
<div className="devv-col devv-col-4 devv-col-w3">
<div className="devv-block devv-block-1 devv-heading">
<h3 style={{color:'#ffffff',direction:'ltr', fontFamily:'Nunito, Arial, Helvetica Neue, Helvetica, sans-serif', fontSize:20, fontWeight:'400', lineHeight:'200%', textAlign:'left', marginTop:0, marginBottom:0}}><strong>Legal</strong> </h3>
</div>
<div className="devv-block devv-block-2 devv-button"><a className="devv-button-content" href="https://mymiix.com/privacy" style={{fontFamily: 'inherit', fontSize: '16px', backgroundColor: 'transparent',color: '#ffffff',  fontWeight:400, maxWidth: '100%', paddingBottom: '5px', paddingLeft: '20px', paddingRight:'20px', paddingTop: '5px', width: 'auto', display: 'inline-block'}}><span dir="ltr" style={{wordBreak:'break-word', fontSize: '16px', lineHeight: '200%'}}>Privacy Policy</span></a></div>
</div>
</div>
</div>
<div className="devv-row devv-row-12">
<div className="devv-row-content">
<div className="devv-col devv-col-1 devv-col-w12">
<div className="devv-block devv-block-1 devv-spacer">
<div className="spacer" style={{height:'20px'}}></div>
</div>
</div>
</div>
</div>

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


 getFont() {
  var fontBase = 1000,                 
  fontSize = 20;

    var ratio = fontSize / fontBase;   // calc ratio
    var size = this.refImage.current.width * ratio;   // get font size based on current width
    return (size|0) + 'px arial'; // set font
  }
  getFontt() {
    var fontBase = 1000,                 
    fontSize = 20;
  
      var ratio = fontSize / fontBase;   // calc ratio
      var size = this.refImage.current.width * ratio;   // get font size based on current width
      return (size|0); // set font
    }
  
componentDidMount(){

  
  let canvas =  this.refImage.current;
            const context = canvas.getContext('2d');
            
            const images = new Image();
            images.src = this.props.Image;
            
            images.onload = ()=>{
              canvas.width = images.width;
            canvas.height = images.height;
              context.font = this.getFont();
              context.drawImage(images,0,0,images.width,canvas.height)
              
              //context.fillText('@'+this.props.ArtistName, images.width-this.getFontt()-100 -this.props.ArtistUserName.length,images.height -10);
              context.fillText('ai.mymiix.com', images.width-this.getFontt()-100,images.height -30);
              
            }

            const imagesLogo = new Image();
            imagesLogo.src = 'https://mymiix.com/public/assets/img/minglemixIcon512.png';
           
            imagesLogo.onload=()=>{
              context.drawImage(imagesLogo,images.width-100,images.height -100,50,50)
              
            }
            
            
            
            
            canvas.toDataURL('image/jpeg', 1.0)
}


  render() {
	return (
		<canvas ref={this.refImage} style={{width:'100%',height:'100%',position:'absolute',objectFit:'cover'}}></canvas>
	);
  }
}




export default Landing;
