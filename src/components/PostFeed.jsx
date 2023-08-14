import React from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.css';

import Cookies from 'js-cookie';
import {Button,LinearProgress,Typography,Box,FormControl,InputLabel,CircularProgress,OutlinedInput,TextField,IconButton,InputAdornment,Icon,FilledInput,Dialog,FormControlLabel,FormLabel,RadioGroup,Radio,Select,MenuItem,Checkbox} from '@mui/material/';
import {Container,Card,Badge} from 'react-bootstrap';
import {Videocam,Filter,Event,LibraryMusic,Close} from '@mui/icons-material';

import Player from 'react-player';
import {Tooltip} from '@mui/material';

import FFMPEG from "react-ffmpeg";
import deepai from 'deepai';

import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Preview from '../preview-url/src/previewPostFeed';
import PreviewPost from '../preview-url/src/previewPostYoutube';
import MetaTags from '../react-meta-tags/src/meta_tags';
import PreviewMusic from '../preview-url/src/PreviewMusiic';
import SmallDialog from '../dialog-components/DialogSmalll';
import 'react-jinke-music-player/assets/index.css'
import ReactJkMusicPlayer from 'react-jinke-music-player';
import FullDialogAudio from '../dialog-components/DialogFullAudio';
import '../css/ReactMusicPlayer.css';
import AuthApi from "./AuthApi";


import axios from 'axios';

import * as Themes from '../Utility/Theme';
//import uploadIcon from '../assets/upload.jpg'





const formData = new FormData();





var standalone = window.navigator.standalone,
userAgent = window.navigator.userAgent.toLowerCase(),
safari = /safari/.test( userAgent ),
chrome = /chrome/.test(userAgent),
ios = /iphone|ipod|ipad/.test( userAgent );



function PostFeed(props) {

  deepai.setApiKey(process.env.REACT_APP_DEEP_AI_API)
  
  const Auth = React.useContext(AuthApi);
    const [title,setTitle] = React.useState('');
    const [descript,setDescription] = React.useState('');
    const [catagory,setCatergory] = React.useState('');
    const [image,setImage] = React.useState('');
    const [FileArray,setFileArray] = React.useState([]);
    const [FileSampleArray,setFileSampleArray] = React.useState(null);
    const [FileSample,setFileSample] = React.useState(null);
    const [FileVideoSample,setFileVideoSample] = React.useState(null);
    const[DataSong,setSong] = React.useState([]);
    const [percentagge,setPercentage] = React.useState(0);
    const [index,setindex] = React.useState(0);
    const [stat,setStat] = React.useState('');
    const [statDate,setDate] = React.useState('');
    const [statStatus,setStatStatus] = React.useState('');
    const [showDate,setShowDate] = React.useState(false);
    const [isLoading,setLoading] = React.useState(false);
    const [isLoadingSpinner,setLoadingSpinner] = React.useState(false);
    const [songName,setSongName] = React.useState([])
    const [URLARRAY,setURLARRAY] = React.useState([])

    const [isVideoFileLoaded,setVideoFileLoad] = React.useState(true);
    const [fileName,setfileName] = React.useState('');
    const [file, setFile] = React.useState('')
    const [contributor, setContribute] = React.useState('');
    const [MinDate, setMinDate] = React.useState('');
    const [Amount, setAmount] = React.useState('0.00')
    const[fileType,setFileType] = React.useState('');
    const[TypeFile,setTypeFile] = React.useState('');
    const[showForm,setShowForm] = React.useState(false)
    const [type,setType] = React.useState('image')
    
    const[DataURLType,setDataURLType] = React.useState('');
    const[DatafileType,setDataFileType] = React.useState(null);
    const[DataNameType,setDataNameType] = React.useState('');

   const[DataStatusType,setDataStatusType] = React.useState('');
    
    const [userAuthAccount,setAuth] = React.useState('');
    const inputRef = React.useRef()
    const inputReff = React.useRef()
    const CarourselReff = React.useRef()
    const canvasRef = React.useRef(null);

  



    function capture(){
      if(fileName.match(/^.*\.(mp4|avi|MOV|mov|mkv)$/)){
        var img1 = document.getElementById("logoId");
      
        //setImage(URL.createObjectURL(inputRef.current.files[0]));
      var canvas = document.getElementById('canvas');
      var video = document.getElementById('video');
      let w = video.videoWidth;
      let h = video.videoHeight;
      let logoResizedHeight;
      let logoResizedWidth;
      canvas.width  = w;
      canvas.height = h;
      if(h > w){
      logoResizedHeight = h /10
      logoResizedWidth = w / 2
      }else{
        logoResizedHeight = h /1 * 0.2
        logoResizedWidth = w / 2

      }

      const posX = (video.videoWidth - logoResizedWidth) / 2
      const posY = (video.videoHeight - logoResizedHeight) / 2

      canvas.getContext('2d').drawImage(video, 0, 0,w, h);
      canvas.getContext('2d').drawImage(img1,10,50,logoResizedWidth,logoResizedHeight)
      

      canvas.toBlob( (blob) => {
       

        var fileNamme = (Math.random() + 1).toString(36).substring(7)+"."+"jpeg";

        var file = new File([blob],fileNamme,{ type: "image/jpeg" })
        setDataFileType(file)
        setDataNameType(fileNamme)
        console.log(file)
        

      }, "image/jpeg", 1 );
    
     // setDataURLType(data);

      
      }
  
    }

    const pressFull = (data) =>{
      setSong(data)
      
    }

    
    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  

    const isValidUrl = urlString=> {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
	}

    
    function readableDuration(seconds) {
      let sec = Math.floor( seconds );    
      let min = Math.floor( sec / 60 );
      min = min >= 10 ? min : '0' + min;    
      sec = Math.floor( sec % 60 );
      sec = sec >= 10 ? sec : '0' + sec;    
      return min + ':' + sec;
  }




  function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)? (\/|\/([\w#!:.?+=&%@!\-\/]))?/g
    return regexp.test(s);
}
  
  


const handleClear = () =>{

  if(FileArray.length > 0){

  }
  else{
  setImage("");
  setfileName("");
  setFile("");
  setContribute("");
  setAmount('0.00');
  setDataURLType("");
  setDataFileType(null);
  setSong([])
  setDataNameType("");
  setFileArray([])
  setVideoFileLoad(false) 
  }
}


    const handleOnClick = async() =>{
     
      let filExtention;
      let fileType = "";

if(fileType == "audio/mpeg"){
filExtention = ["","mp3"];
}

else if(fileType == "video/quicktime"){
  filExtention = ["","mov"];
}

else{
  filExtention = fileType.split('/')
}
     





        if(file != ""){
          for (var ik = 0; ik < FileArray.length; ik++) {
          
          formData.append('postimg[]',FileArray[ik]);
          }

         



            formData.append('songname',JSON.stringify(songName))
            


            if(FileSampleArray != null){
              formData.append('samplePost',FileSampleArray,FileSampleArray.name)
            }
            


          if(DatafileType != null){ 

            formData.append('postimmg',DatafileType,DataNameType);
           
            
          }else{
          
            formData.append('postimmg',"");
            
          }

          
          formData.append('poststat',contributor);
          formData.append('price',Amount);
          formData.append('extName',TypeFile);
         
          

        }else{
          
          formData.append('poststat',"");
          formData.append('price',0.00);
          formData.append('postimg[]',"");
          //formData.append('postimmg[]',"");
          formData.append('extName',"");

          

        }
        

        if(URLARRAY.length > 0){
          formData.append('postURLS',JSON.stringify(URLARRAY));
        }


        formData.append('postbody',descript.replace(/\n/g, " "));
        formData.append('title',title.replace(/\n/g, " "));
        formData.append('category',catagory);
        formData.append('StatussType',DataStatusType)


        if(statDate != ''){
        formData.append('Datte',statDate);
        }else{

        }
       
        setLoading(true)
        setStat('');
 
        
          
         
          
        

     const datta = await axios.post('https://music.mymiix.com/ReactPost.php?id='+Cookies.get('userId'),formData,{
     
          onUploadProgress:  progressEvent => {
            
            let percentages = (progressEvent.loaded / progressEvent.total) * 100;
            
            setPercentage(Math.round(percentages))
          }
      }).then (datta => {

        console.log(datta.data)
        if(datta.data.Success == "Sent"){
          setLoading(false)
            

          if (datta.data.isBrowser == "webview") {
            // mobile!
            window.ReactNativeWebView.postMessage(JSON.stringify(datta.data.Post))
        }else
          window.location.replace("https://music.mymiix.com"); 
          
          
        }
      })
      
     .catch((error)=>{

            console.log(error);
            setLoading(false)
            
            //window.location.replace("https://mymiix.com"); 
          })

     


     
    }
    
const handleClose = () =>{
  setShowForm(false);
  setSongName([...songName]);
  console.log(songName);
}

    React.useEffect(()=>{
      
    document.body.style.backgroundColor = Themes['dark'].BackgroundColor;
    document.body.style.color = Themes['dark'].Color;

    
        
        //setDate(new Date().toISOString().slice(0, -8))
       

        if(props.userData.length > 0){

          

        }
       


    },[])

    return ( 
    <div style={{width:'100%',margin:0,height:'100vh',position:'relative',padding:0}}>
{isLoadingSpinner == true ?<div style={{position:'absolute',backgroundColor:'rgba(0,0,0,0.8)',zIndex:100,alignItems:'center',width:'100%',height:'150vh',display:'flex',flexDirection:'column',justifyContent:'center'}}>
      <CircularProgress  />

      </div>:null}
      <div style={{width:'100%',position:'relative',paddingLeft:15,paddingRight:15}}>
{isLoading ?<Box style={{position:'fixed',backgroundColor:'white',padding:10,top:0,zIndex:80,display:"flex",alignItems:'center', width:"100%"}} >
      <Box  width={'100%'} >
      <LinearProgress variant={"determinate"}  value={percentagge} style={{height:10}} />
      </Box>
      {<Box minWidth={35}>
        {<Typography variant="body2" color="textSecondary">{percentagge+'%'}</Typography>}
      </Box>}
    </Box>:<></> }

    <Container style={{marginTop:'60px',width:'100%',position:'relative'}}  className="Container"> 
    <MetaTags>
            <title>{isLoading? 'MyMiix - Progress '+percentagge+'%' : 'MyMiix - Create your post'}</title>
           

</MetaTags>
        <div style={{width:'100%',alignItems:'center',position:'relative',justifyContent:'center',alignContent:'center',overflowX:'hidden'}}>
        <b>Create a Post</b>
      
        

        <FormControl style={{width:'100%',marginTop:'20px',backgroundColor:Themes['dark'].BackgroundColorTheme}} variant="standard" >
      
        


      <TextField
          id="filled-multiline-static"
          label="Post Title (required)"
          multiline
          style={{width:'100%',color:Themes['dark'].Color,backgroundColor:Themes['dark'].BackgroundColorTheme}}
          rows={4}
          inputProps={{style:{color:Themes['dark'].Color}}}
          InputLabelProps={{style:{color:Themes['dark'].Color}}}
          onChange={(value)=>setTitle(value.target.value)}
          variant="outlined"
        />
      </FormControl>


      <FormControl style={{width:'100%',marginTop:'20px',backgroundColor:Themes['dark'].BackgroundColorTheme}} variant="standard" >
      


  

      <TextField
          id="filled-multiline-static"
          label="Post Description"
          multiline
          style={{width:'100%',color:Themes['dark'].Color,backgroundColor:Themes['dark'].BackgroundColorTheme}}
          rows={4}
          inputProps={{style:{color:Themes['dark'].Color}}}
          InputLabelProps={{style:{color:Themes['dark'].Color}}}
          onChange={async(value)=>{
            
            
            setDescription(value.target.value)
          

            if(fileName == ""){

           

          }
          }}
          variant="outlined"
        />





      </FormControl>


       
<img id={'logoId'} src={'https://mymiix.com/public/assets/img/mymiix-white.png'}  style={{position:'absolute',display:'none',zIndex:20,top:5,left:5}} width={'300px'} height={'90px'} />

<FormControl style={{width:'100%',marginTop:'20px'}}>
<InputLabel id="label">Category</InputLabel>
<Select labelId="label" variant={'outlined'} id="select" displayEmpty  defaultValue={""} style={{backgroundColor:Themes['dark'].BackgroundColorTheme,color:Themes['dark'].Color,marginBottom:20}} onChange={(value)=>{
  setCatergory(value.target.value)
  
  }}>
  <MenuItem name={'Choose Category'}  value="">Choose Category</MenuItem>
  <MenuItem name={'Music'} value="Music">Music</MenuItem>
  
</Select>





{file != "" && FileArray.length > 0 ?<div style={{width:'100%',display:'flex',flexDirection:'column',marginBlock:'20px'}}>
  
<b style={{color:Themes['dark'].Color}}>Choose Public Or Subscribers To See Your Post</b>
  <FormControl style={{marginTop:10}}  variant="outlined">


<Select labelId="label" id="select" displayEmpty defaultValue={""} color={Themes['dark'].Color} style={{backgroundColor:Themes['dark'].BackgroundColorTheme,color:Themes['dark'].Color}}  onChange={(value)=>{setContribute(value.target.value) }}>
  <MenuItem    value="">Public</MenuItem>
  {userAuthAccount.match(/acct\_([a-zA-Z0-9_]+)/) ?<MenuItem name={'Contributor'} value="Contributor">Subscribers</MenuItem>:null}
  {userAuthAccount.match(/acct\_([a-zA-Z0-9_]+)/) ?<MenuItem name={'Contributor'} value="Donor">Sell content</MenuItem>:null}
  <MenuItem   value="ShareToView">Share to View</MenuItem>
</Select>

</FormControl></div>:null}

{contributor == "Donor" ?

<FormControl style={{marginTop:10,backgroundColor:Themes['dark'].BackgroundColorTheme,color:Themes['dark'].Color}}  variant="outlined">
          <InputLabel style={{color:Themes['dark'].Color}} htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={Amount}
            style={{color:Themes['dark'].Color}}
            color={Themes['dark'].Color}
            onChange={(value)=>{
              setAmount(value.target.value)
              
              }}
            startAdornment={<InputAdornment style={{color:Themes['dark'].Color}} position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
            :null }




<div style={{flexDirection:'row', display:'flex',alignItems:'center', width:'100%', justifyContent:'space-between',marginBottom:20}}>
  <div style={{flexDirection:'row', display:'flex',alignItems:'center'}}>

  




  <input  name={'postimg'} accept={'.mp3,.m4a,.wav'}  style={{display:'none'}}  multiple={true} ref={inputRef}  onChange={async(img)=>{

    
    if(img.target.files.length <= 10 ){

      let pushSongName = [];
      
      setImage(URL.createObjectURL(inputRef.current.files[0]));
    setfileName(inputRef.current.files[0].name);
    setFileArray([...inputRef.current.files])
    console.log(inputRef.current.files[0]);
    
    setFile(inputRef.current.value);
    setFileType(inputRef.current.files[0].type)
    
    
    for (var i = 0; i < img.target.files.length; i++) {
      console.log(img.target.files[i].name);

      let typefile = img.target.files[i].name.substring(img.target.files[i].name.lastIndexOf('.') + 1, img.target.files[i].name.length);
      console.log(typefile);
      setTypeFile('.'+typefile)
      let fille = URL.createObjectURL(img.target.files[i]);

   

      


        
        pushSongName.push({
          name: img.target.files[i].name.slice(0,img.target.files[i].name.lastIndexOf('.'+typefile)),
          musicSrc: fille,
          type: 'audio',
          artist: '',
          tag: '',
          constributingArtist:'',
          genre:  '',
          Cover:'',
          duration:'',
        })

     
        


      
  }

 
console.log(pushSongName)

    setSongName([...pushSongName])
    setShowForm(true)
    
    setStat('')


    
    

    
  if(!ios){
    await FFMPEG.process(
      img.target.files[0],
      '-metadata location="" -metadata location-eng="" -metadata author="" -t 30 -c:v copy -c:a copy',
      function (e) {
        const video = e.result;
        //console.log(e);
        var fileNamme = video.name;
        
        setFileSampleArray(video)
        setFileSample(URL.createObjectURL(video))
        setFileVideoSample(null)
    
      }.bind(this));

  }else{
    
    setStat('You cant upload more than 10 audio files')

  }

    }

    
    }} id="icon-button-file" type={"file"} />


<div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
      <label style={{display:'flex',flexDirection:'row',alignItems:'center'}} htmlFor="icon-button-file">
        
        
        

        <Tooltip title={'Audio files'}>
        <IconButton  onClick={()=>{
          setImage("");
          setfileName("");
          setFile("");
          setContribute("");
          setAmount('0.00');
          setFileArray([]);
          setStat('');
          setDataURLType('');
          setURLARRAY([])
          setDataFileType(null);
          setDataNameType("");
          setVideoFileLoad(false)
          setSong([])
          setType("audio")
          setFileVideoSample(null)
          setFileSample(null)
          setFileSampleArray(null)
          setFileArray([])
          setSongName([])
         

        }} color="primary" aria-label="upload picture" component="span">
          <LibraryMusic style={{color:'#007bff'}} />
        </IconButton>
        </Tooltip>
        
       
      </label>

      {FileArray.length > 0 && !fileName.match(/^.*\.(mp3|wav|WAV|m4a)$/)?<Tooltip title={'Clear Files '}><Button  style={{backgroundColor:'#007bff',color:'white'}} onClick={(e)=>{
         
         setImage("");
         setfileName("");
         setFile("");
         setContribute("");
         setAmount('0.00');
         setFileArray([])
         setDataURLType("");
         setDataFileType(null);
         setStat('');
         setURLARRAY([])
         setDataNameType("");
         setVideoFileLoad(false)
         setSong([])
         setFileVideoSample(null)
         setFileSample(null)
         setFileSampleArray(null)
         setFileArray([])

         setType("audio")
         setSongName([])
       
        

       }}  >Clear</Button></Tooltip>:null}

{FileArray.length > 0 && fileName.match(/^.*\.(mp3|wav|WAV|m4a)$/) ?

<label style={{display:'flex',flexDirection:'row',alignItems:'center'}} ><Tooltip title={'Album List '}><IconButton  color="primary" aria-label="Album List" component="span"  onClick={(e)=>{
         
         setShowForm(true)
       
        

       }}  ><i style={{color:'#007bff',fontSize:23}} class="fa fa-list"></i></IconButton></Tooltip></label>:null

}

      </div>
</div>

<SmallDialog  setshow={setShowDate}  isOpen={showDate}  Title={'Schedule Date'} 
Data={<div style={{width:'100%',display:'flex',flexDirection:'column'}}>
<input value={statDate} style={{border:'1px solid rgb(240, 244, 248)',padding:10,borderRadius:5,backgroundColor:'rgb(240, 244, 248)'}}  name={'postimgggg'} min={MinDate} onChange={(e)=>{
setDate(e.target.value);


console.log(e.target.value)
}} type={'datetime-local'}     />
<div style={{display:'flex',width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-evenly'}}>

<Button  onClick={()=>{
setShowDate(false)

}} >OK</Button>
<Button onClick={()=>{
setShowDate(false)

}} >Cancel</Button>

</div>



  </div>} />

<div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>





<label style={{display:'flex',flexDirection:'row',alignItems:'center'}} >
  <Tooltip title={'schedule date'} >
<IconButton  onClick={()=>{
          
          setShowDate(true)
        }} color="primary" aria-label="upload picture" component="span">
          <Event style={{color:'#007bff'}} />
        </IconButton>
        </Tooltip>


        
</label>
<label style={{display:'flex',flexDirection:'row',alignItems:'center'}}>

<Button
        variant="contained"
        color="primary"
        className={''}
        style={{backgroundColor:'#007bff',color:'white'}}
        type={'submit'}
        onClick={()=>{
          var result = title.matchAll(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi);

        if(descript != "" && title != "" ){
          
          if(Array.from(result).length > 0){
            setStat('Title cant have a link in it!')
            
          }
          else {
     
            


          if(!fileName.match(/^.*\.(mp3|wav|WAV|m4a)$/) || fileName == "") {
          handleOnClick();
          
        }
        else{

        if(inputReff.current.files.length > 0){
          handleOnClick();
        }else{

          setStat('Album cover is required')
        }


        }
      

      
      }

    }else{
      setStat('Title or description is empty')
    }

       }}

      >
        Post
      </Button>
</label>

      </div>
      

</div>



<b style={{alignSelf:'center'}}>{stat}</b>
</FormControl>


<FullDialogAudio 
isOpen={showForm}
Data={
<div style={{width:'100%',padding:10,position:'relative'}}>
 <h3>Add Your Cover Art</h3> 

 <div style={{width:'100%',padding:10,paddingBottom:20,display:'flex',flexDirection:'column',position:'relative',borderBottom:'1px solid lightgrey'}}>
 <div style={{width:'100%',padding:10,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
<div style={{width:200,height:200,backgroundColor:'black',overflow:'hidden',borderRadius:20,position:'relative'}} >
<img src={DataURLType != ""? DataURLType :''} 
onClick={()=>{
  inputReff.current.click();
}}
style={{width:200,height:200,objectFit:'cover'}} />


</div>

</div>



<h3>Tracks</h3> 

<div style={{display:'flex',width:'100%',flexDirection:'row',position:'relative',paddingBottom:20,justifyContent:'end'}}>
<Button variant="contained" onClick={()=>{
   setImage("");
   setfileName("");
   setFile("");
   setContribute("");
   setAmount('0.00');
   setFileArray([])
   setDataURLType("");
   setDataFileType(null);
   setStat('');
   setDataNameType("");
   setVideoFileLoad(false)
   setSong([])
   setType("audio")
   setSongName([])
   setFileSampleArray(null)
   setShowForm(false)
}}>Clear All Tracks</Button>
  </div>

</div>

{FileSample != null?<div  style={{display:'flex',width:'100%',flexDirection:'column'}}>
  <b>Sample Track</b>
  <audio src={FileSample}  controls={true} />
</div>:null}

{songName.length > 0 && songName.map((posts,index)=>{

return(<div style={{display:'flex',flexDirection:'column',padding:10,position:'relative',paddingBottom:20,borderBottom:'1px solid lightgrey'}}>





{<input id={'replaceFile'+index} accept={'.mp3,.m4a,.wav'}  style={{display:'none'}} type={'file'} multiple={false} onChange={(img)=>{

let pushSongName = [];
      
    
    


      let typefile = img.target.files[0].name.substring(img.target.files[0].name.lastIndexOf('.') + 1, img.target.files[0].name.length);
    
      let fille = URL.createObjectURL(img.target.files[0]);

   

        
        pushSongName.push({
          name: img.target.files[0].name.slice(0,img.target.files[0].name.lastIndexOf('.'+typefile)),
          musicSrc: fille,
          type: 'audio',
          artist: '',
          tag: '',
          constributingArtist:'',
          genre:  '',
          Cover:'',
          duration:'',
        })
        

      


      
  
    
songName[index] = pushSongName[0];
FileArray[index] = img.target.files[0];

    setSongName([...songName])
    setFileArray([...FileArray])


   
    

}}   />}




<div style={{display:'flex',width:'100%',flexDirection:'row',position:'relative',paddingBottom:20,justifyContent:'space-between'}}>
 

<label for={"replaceFile"+index} class="btn">
Replace file
</label>


<div  onClick={()=>{

DataSong.splice(index,1)
setSong([...DataSong])
FileArray.splice(index,1)
setFileArray([...FileArray])
songName.splice(index,1)
setSongName([...songName])


}} >
<i  class="fa fa-times">

</i>

</div>
  
</div>

<div style={{display:'flex',alignItems:'center',position:'relative',flexDirection:'column',paddingBottom:20}}>
 



<div style={{display:'flex',width:'100%',flexDirection:'row',position:'relative',justifyContent:'space-between'}}>
<h3>{posts.name}</h3> 

  
</div>


{<audio  style={{borderRadius:100,backgroundColor:'white',width:'100%',marginBottom:20}}
onLoadedMetadata={(event)=>{


posts.duration = readableDuration(event.target.duration)
setSongName([...songName])

}}
controls={true} src={posts.musicSrc} />}

{!ios?<div style={{display:'flex',justifyContent:'flex-start',marginBottom:20,marginTop:20,alignItems:'flex-start',width:'100%',position:'relative',flexDirection:'column'}}>
<b>Sample track</b>
<p>When you sample this track. This track will be heard before a user buys.</p>
  <Button variant="contained" style={{width:'auto',marginTop:5}} onClick={async()=>{


  if(!ios){
 await FFMPEG.process(
  FileArray[index],
  '-metadata location="" -metadata location-eng="" -metadata author="" -t 30 -c:v copy -c:a copy',
  function (e) {
    const video = e.result;
    console.log(video);
    setFileSampleArray(video[0])
    setFileSample(URL.createObjectURL(video))
    setFileVideoSample(null)

  }.bind(this)
);
  }
  

  }} >Sample Track</Button>
</div>:null}

<div style={{display:'flex',position:'relative',flexDirection:'column',width:'100%'}}>

<b>Song Name</b>
<input defaultValue={songName[index].name}  style={{border:'1px solid lightgrey',padding:5,width:'100%'}} onChange={(e)=>{
posts.name = e.target.value;
//setSongName([...songName])

}} />
 
 
 <b>Artist Name</b>
<input defaultValue={songName[index].artist} placeholder={'Artist Name ft artist'} style={{border:'1px solid lightgrey',padding:5,width:'100%'}}  onChange={(e)=>{
  posts.artist = e.target.value;
  //setSongName([...songName])
}} />

</div>

</div>

<div style={{display:'flex',paddingTop:10,flexDirection:'column'}}>
  <b>Genre</b>
  
<input defaultValue={songName[index].genre} placeholder={'eg(R&B, HipHop, Rap HipHop)'} style={{border:'1px solid lightgrey',padding:5}} onChange={(e)=>{
posts.genre = e.target.value;
//setSongName([...songName])

}} />
 


</div>

<div style={{display:'flex',paddingTop:10,position:'relative',flexDirection:'column'}}>
  <b>Tag</b>
  <p></p>
<input placeholder={'@username, @username'} defaultValue={songName[index].tag} style={{border:'1px solid lightgrey',padding:5}} onChange={(e)=>{
posts.tag = e.target.value;
//setSongName([...songName])
}} />
 


</div>


<div style={{display:'flex',paddingTop:10,position:'relative',flexDirection:'column'}}>
  <b>Duration</b>
  <p>{posts.duration}</p>

 


</div>
<div style={{display:'flex',flexDirection:'column',alignItems:'end',marginTop:10,justifyContent:'end',width:'100%'}}>
<Button variant="contained" onClick={()=>{
  setSongName([...songName]);
  console.log(songName);

}}>Save</Button>
</div>

</div>)


})}



</div>

}
handleClose={handleClose} />



<Card style={{borderWidth:0,justifyContent:'center',alignItems:'center',backgroundColor:Themes['dark'].BackgroundColor}}>
{ FileArray.length > 0 && fileName.match(/^.*\.(mp4|avi|MOV|mov|mkv|webm)$/)?<div style={{display:'flex',width:'100%',alignItems:'center',alignContent:'center',flexDirection:'column'}}>
  

  {<button onClick={capture}>Capture</button>}
  <input ref={inputReff} style={{display:'none'}} type={'file'} onChange={(img)=>{
  setDataURLType(URL.createObjectURL(inputReff.current.files[0]));
  setDataFileType(inputReff.current.files[0])
 
  setDataNameType(inputReff.current.files[0].name)
 

  }} ></input>


  <p style={{marginBlock:10}}>Thumbnails</p>
  <div id="canvasPreview" style={{display:'flex',width:'25%',position:'relative',alignItems:'center',alignContent:'center',flexDirection:'row'}}>
    <p style={{width:'100%',textAlign:'center',justifySelf:'center',position:'absolute',color:'white', backgroundColor:'rgba(0,0,0,0.5)',padding:5,zIndex:20}}>Change Thumbnail</p>
   
  {<canvas  id={'canvas'} style={{width:'100%',position:'relative'}} width={60}  onClick={()=>{
    inputReff.current.click()
  }} height={30} ref={canvasRef} >

    
    </canvas>}
  </div>
</div>:<></>}

{FileArray.length > 0 && fileName.match(/^.*\.(mp3|wav|WAV|m4a)$/)?<div style={{display:'flex',width:'100%',alignItems:'center',alignContent:'center',flexDirection:'column'}}>
  
<img id={'ImageId'} src={DataURLType != "" ? DataURLType : 'https://wallpaperaccess.com/full/2416004.jpg'}  style={{position:'absolute',display:'none',zIndex:20,top:5,left:5}} width={'100%'} height={'100%'} />

  <input ref={inputReff} accept={"image/*"} style={{display:'none'}} type={'file'} onChange={(img)=>{
  setDataURLType(URL.createObjectURL(inputReff.current.files[0]));
  setDataFileType(inputReff.current.files[0])
  setDataNameType(inputReff.current.files[0].name)

  
  }} ></input>
<p onClick={()=>{
inputReff.current.click();
}} style={{color:'white',backgroundColor:'#007bff',padding:10,borderRadius:5,cursor:'pointer'}}>
Cover Art
</p>

</div>:null}
  <p>Preview</p>
  {statStatus != "" ?<p>{statStatus}</p>:null}
  
{UrlForMedia(descript.replace(/\n/g, " "),fileName,setURLARRAY)}

{PostImageFeed(fileName,image,DataURLType,capture,FileArray,setFileArray,handleClear,pressFull,descript,setindex,index,setSongName,CarourselReff)}






</Card>



        </div>
    
    </Container>
    </div>
    
    </div>
    )



    function UrlForMedia(dataBody,postimage,Data) {

     
      if(dataBody != undefined){
            
      if (typeof(dataBody === 'string')) {
    
    const datapast = dataBody.split(/\s/);
    
    const content = datapast.map(function(word,i) {
      var separator = i < (datapast.length - 1) ? ' ' : '';
    
     
      
      if (word.match(/^https?\:\//)) {

       
    
    if(postimage == ""){
    if (word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?youtube\.com\/([a-zA-Z0-9_]+)/)){
      //console.log(word);
      return(<div>
        <PreviewPost setDatta={Data} url={word} />
        <Player controls={true} autoPlay={true} playing={true} light={true} style={{width:'100%', height:360}} width={'100%'} height={'360px'}  className={'react-player'} url={word} ></Player>
      
      </div>)
    }
    
    else if(word.match(/http(?:s)?:\/\/mymiix\.com\/embed\/([a-zA-Z0-9_]+)/)) {
      
      <iframe width={'100%'} height={450} frameBorder={"0"} style={{width:'100%',height:450,borderRadius:10}}  src={word} ></iframe>

    }
    else if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/)) {
    
      return(<div>
        <PreviewPost setDatta={Data} url={word} />
        <Player controls={true} autoPlay={true} playing={true} light={true} style={{width:'100%', height:360}} width={'100%'} height={'360px'}  className={'react-player'} url={word} ></Player>
      
      </div>)
    }
    
    else if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {
    
      return(<div>
        <PreviewPost setDatta={Data} url={word} />
        <Player controls={true} autoPlay={true} playing={true} light={true} style={{width:'100%', height:360}} width={'100%'} height={'360px'}  className={'react-player'} url={word} ></Player>
      
      </div>)
    }

    if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\/([a-zA-Z0-9_]+)/)) {

            
      if(postimage == ""){
    
        var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\//,'');
      return (
      <div>
        <PreviewPost setDatta={Data} url={word} />
        <iframe 
      style={{width:'100%',height:250,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/track/'+U+''} ></iframe>
      
      </div>
      
      )
      }
    
    }
    
    if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?discord\.com\/widget/)) {
      return (<div>
        <PreviewPost setDatta={Data} url={word} />
        <iframe style={{width:'100%',height:360}} allowTransparency={true} sandbox={"allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"}  src={word} ></iframe>
      
      </div>)
      
    }

    if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?track\/([a-zA-Z0-9_]+)/)) {

            
      if(postimage == ""){
    
        var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?track\//,'');
      return (<div>
        <PreviewPost setDatta={Data} url={word} />
        <iframe 
      style={{width:'100%',height:250,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/track/'+U+''} ></iframe></div>)
      }
    
    }

    if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\/([a-zA-Z0-9_]+)/)) {
    
      
      if(postimage == ""){
    
        var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\//,'');
      return (<div>
        <PreviewPost setDatta={Data} url={word} />
        <iframe 
      style={{width:'100%',height:250,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/album/'+U+''} ></iframe></div>)
      }
    
    }

    if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?album\/([a-zA-Z0-9_]+)/)) {

            
      if(postimage == ""){
    
        var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?album\//,'');
      return (<div>
        <PreviewPost setDatta={Data} url={word} />
        <iframe 
      style={{width:'100%',height:250,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/album/'+U+''} ></iframe></div>)
      }
    
    }
    
    if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\/([a-zA-Z0-9_]+)/)) {
    
      
      if(postimage == ""){
    
        var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\//,'');
      return (<div>
        <PreviewPost setDatta={Data} url={word} />
        <iframe 
       style={{width:'100%',height:250,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/playlist/'+U+''} ></iframe></div>)
      }
    
    }


    if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?playlist\/([a-zA-Z0-9_]+)/)) {

            
      if(postimage == ""){
    
        var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?playlist\//,'');
      return (
      <div>
      <PreviewPost setDatta={Data} url={word} />
      <iframe 
      style={{width:'100%',height:250,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/playlist/'+U+''} ></iframe>
      </div>)
      }
    
    }
    
    else if(word.match(/http(?:s)?:\/\/?([a-zA-Z0-9_]+)\.?([a-zA-Z0-9_]+)/) && 
    !dataBody.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?youtube\.com\/([a-zA-Z0-9_]+)/gi) && 
    !dataBody.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/gi) && 
    !dataBody.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/gi) &&
    !dataBody.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?discord\.com\/widget/gi) &&
    !dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\/([a-zA-Z0-9_]+)/gi) &&
    !dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?track\/([a-zA-Z0-9_]+)/gi) &&
    !dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\/([a-zA-Z0-9_]+)/gi) &&
    !dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?album\/([a-zA-Z0-9_]+)/gi)&&
    !dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\/([a-zA-Z0-9_]+)/gi) &&
    !dataBody.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?playlist\/([a-zA-Z0-9_]+)/gi)){
    


       /* var value = dataBody.match(/http(?:s)?:\/\/(?:www\.)?([a-zA-Z0-9_]+)\.?([a-zA-Z0-9_]+)/);
        if(value.length > 0){
          if(value[0]){
            const APIURL = "https://mymiix.com:49856/URICheck";
            fetch(`${APIURL}?URL=${word}`, {
              method: "GET",
              
            }).then(res=>res.json())
            .then(responseJSON=>{
              setData(responseJSON)

            })

            
          }

        
    }*/

    
    return(<div style={{width:'100%',justifyContent:'center'}}>
      {/*<ReactTinyLink
            cardSize="large"
            showGraphic={false}
            width="100vw"
            maxLine={1}
            minLine={1}
            url={word}
      />*/}
    
<Preview setDatta={Data} url={word} />

          
          
          </div>)
    
    }else{
     
     return(<a href={word}>{separator + word}</a>)
    }
    
    }
    
      }
    else{
    //return(<p>{separator + word}</p>)
    }
    
    
    })
    
    
    const contents = datapast.map(function(word,i) {
      var separator = i < (datapast.length - 1) ? ' ' : '';
    
    
      if (word.match(/^https?\:\//)) {
  
    
    if(postimage == ""){
    if (word.match(/http(?:s)?:\/\/(?:www\.)?youtube\.com\/([a-zA-Z0-9_]+)/)){
      
    }
    
    else if(word.match(/http(?:s)?:\/\/(?:www\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/)) {
    
    }
    else if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {
    
    }
    
    }
    
    else{
      return(<a style={{paddingLeft:5,marginBottom:0}} href={word} >{word}</a>)
     }
    
      }
    else{
    
    if (word.match(/#(\w+)/g)) {
    
    }
    else  if (word.match(/@(\w+)/g)) {
      return(<a href={'https://mymiix.com/'+word}>{separator}{word}</a>);
    }
    else{
    
    return(word+separator)
    }
    
    }
    
    
    })
    
    
    const contentss = datapast.map(function(word,i) {
      var separator = i < (datapast.length - 1) ? ' ' : '';
    
      if (word.match(/#(\w+)/g)) {
    
    return(<Badge href={word} style={{padding:10, marginBottom:5}} pill variant="light"><a href={word}>{word}</a></Badge>);
      }
      else if (word.match(/@(\w+)/g)){
        
      }
    
    
    
    })
    
    
    return(
      <div style={{flexDirection:'row',width:'100%',flexWrap:'wrap'}}>
    <div style={{flexDirection:'row', width:'100%', display:'flex',flexWrap:'wrap'}}>{contents}</div>
    <div style={{flexDirection:'row', display:'flex',flexWrap:'wrap'}}>{contentss}</div>
    {content}
    </div>
    
    )
        }
      }
    
    
    }

}





  
  
  function PostImageFeed(PostImage,blob,videoRef,capture,file,setFileArray,handleClear,pressFull,Link,setindex,indexing,setSongName,CarourselReff) {
  

  

 
  
if(file.length > 0){
  let con = file
  let conn = file;
  con = con.filter(ar => con.find(rm => (rm.name.match(/^.*\.(mp3|wav|WAV|MP3|m4a)$/) === ar.name.match(/^.*\.(mp3|wav|WAV|MP3|m4a)$/) ) )) 
  conn = conn.filter(ar => conn.find(rm => (rm.name.match(/^.*\.(jpg|jpeg|png|JPG|gif|mp4|avi|MOV|mov|mkv)$/) === ar.name.match(/^.*\.(jpg|jpeg|png|JPG|gif|mp4|avi|MOV|mov|mkv)$/) ) )) 

let pushMusic = [];
let pushSongName = [];

conn.map((posts,index)=>{

 const nameIndex =  index+1;
 if(posts.name.match(/^.*\.(mp3|wav|WAV|MP3|m4a)$/))
 {

   pushMusic.push({
     musicSrc:URL.createObjectURL(posts),
     cover:videoRef != "" ? videoRef : 'https://wallpaperaccess.com/full/2416004.jpg',
     artist:'Unknown',
     name: posts.name.slice(0,posts.name.lastIndexOf(".mp3"))


     })

     
     

 }
})

  const content = con.map(function(post,index) {
  

    
  if(post.name.match(/^.*\.(jpg|jpeg|JPEG|PNG|png|JPG|gif|webp)$/)){
    return(
  
    
      <div style={{ position:'relative',width:'100%', height:450,}}>
        
  <div  onClick={()=>{

if(index == con.length){
 
 
  file.splice(index,1)
  setindex(con.length - 1)
  indexing = con.length -1
  if(CarourselReff.current)
  {
    CarourselReff.current.moveTo(indexing)
  }

  setFileArray([...file])
  

  
  handleClear()
  

}else{
  if(index == 0){

 
  file.splice(index,1)
  indexing = index
  setFileArray([...file])
  handleClear()
  }else{
  
  file.splice(index,1)
  indexing = index -1
  if(CarourselReff.current)
  {
    CarourselReff.current.moveTo(indexing)
  }
  setFileArray([...file])
  handleClear()
  }
}



}}  className={'bg-gray-500  hover:bg-gray-600'} style={{padding:10,position:'absolute',cursor:'pointer',right:0,top:0,borderRadius:100}}><Close style={{color:'white'}} color={'white'} /></div>

      {<img style={{width:'100%', height:450, objectFit:'cover'}}  src={URL.createObjectURL(post)} />}
      
      </div>
    
    
  
    )
  
  }else if (post.name.match(/^.*\.(mp4|MP4|AVI|MKV|MOV|WEBM|avi|MOV|mov|mkv|webm)$/)){



    return(
  
  
     <div style={{position:'relative',width:'100%', height:450,}}>

<div  onClick={()=>{


  file.splice(index,1)
  setFileArray([...file])
  handleClear()



}}  className={'bg-gray-500  hover:bg-gray-600'} style={{padding:10,position:'absolute',cursor:'pointer',right:0,top:0,borderRadius:100}}><Close style={{color:'white'}} color={'white'} /></div>
<video id={'video'}   preload={'metadata'} 

onLoadedMetadata={(e)=>{
  capture();

   
}}
 
onLoadedData={(e)=>{
  e.target.currentTime = e.target.currentTime + 0.1
  setTimeout(()=>{
  capture();
},100)
console.log(e)
}}

onLoadStart={()=>{

//capture();
}}  style={{width:'100%',objectFit:'cover', height:450, height:450,}} width={'100%'} height={450}  controls={true} src={blob} />


      </div>
     
      )
  
  }
  

  
})

  

  
  return(
    <Carousel showStatus={false} 
    
     ref={CarourselReff}
     
      selectedItem={indexing} width={'100%'} style={{width:'100%',height:450}} swipeable={true} axis={'horizontal'}  emulateTouch={true} showThumbs={false} showIndicators={false}   >
      {pushMusic.length > 0 ?
      <div style={{width:'100%',height:350,position:'relative'}}>
        
      <PreviewMusic  playy={true} onContextMenu={e => e.preventDefault()}  
      img={videoRef != "" ? videoRef : 'https://wallpaperaccess.com/full/2416004.jpg'} title={Link}   songs={pushMusic}
      dataPress={pressFull}
     
     
     />
      </div>
      :[]}

       {
         content.length > 0 ? content:[]
       }
       
    </Carousel>
  )

      }else{
        return(null)
      }
  
  
  
  
  
  
  
  
  }
  
  
  
  function Counts(value){
  
    if(value>=1000000)
    {
        value=(value/1000000)+"M"
    }
   
    else if(value>=1000)
    {
        value=(value/1000)+"K";
    }
    return value;
  
  }
  
  

  
  function abbreviateNumber(value) {
    if (value >= 1100000){
    return (value / 1000000).toFixed(2) + 'M'
    }
  if (value >= 1000000){
    return (value / 1000000).toFixed(0) + 'M'
  }
  if (value >= 100000)
  {
    return (value / 1000).toFixed(0) + 'K'
  }
  if (value >= 10000){
    return (value / 1000).toFixed(0) + 'K'
  }
  if (value >= 1100){
    return (value / 1000).toFixed(2) + 'K'
  }
  if (value >= 1000)
  {
    return (value / 1000).toFixed(0) + 'K'
  }
  return value
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
    fontSize = 40; 
  
      var ratio = fontSize / fontBase;   // calc ratio
      var size = this.refImage.current.width * ratio;   // get font size based on current width
      return (size|0) + 'px arial'; // set font
    }
    
  componentDidMount(){
  
    
    let canvas =  this.refImage.current;
              const context = canvas.getContext('2d');
              
              const images = new document.createElement('img');
              images.src = this.props.Image;
              
              images.onload = ()=>{
                canvas.width = images.width;
              canvas.height = images.height;
                context.font = this.getFont();
                context.drawImage(images,0,0,images.width,canvas.height)
                context.fillText('@'+this.props.ArtistName, 20,canvas.height - 20);
                  context.fillText('mymiix.com', 20,20);
                
                
              }
              
              
              
              
              canvas.toDataURL('image/jpeg', 1.0)
  }
  
  
    render() {
    return (
      <canvas ref={this.refImage} style={{width:'100%',height:'100%',position:'absolute',objectFit:'cover'}}></canvas>
    );
    }
  }


export default PostFeed;