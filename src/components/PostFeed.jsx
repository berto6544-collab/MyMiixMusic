import React from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.css';

import Cookies from 'js-cookie';
import {FormControl,InputLabel,CircularProgress,OutlinedInput,TextField,IconButton,InputAdornment,Icon,FilledInput,Dialog,FormControlLabel,FormLabel,RadioGroup,Radio,Select,MenuItem,Checkbox} from '@mui/material/';
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
import 'react-jinke-music-player/assets/index.css'
import '../css/ReactMusicPlayer.css';
import AuthApi from "./AuthApi";


import axios from 'axios';

import * as Themes from '../Utility/Theme';
import Progress from './ProgressBar';
import ChooseType from './ChooseType';
import FileUploaded from './UploadFile';






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
    const [catagory,setCatergory] = React.useState('Music');
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
    const [typeFunction,setTypeFunction] = React.useState('');
    const [Amount, setAmount] = React.useState('0.00')
    const[fileType,setFileType] = React.useState('');
    const [steps,setSteps] = React.useState(0);
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
  
  

const handleOnChange = async(img) =>{

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
 
        
          
         
          
        

     const datta = await axios.post('https://music.mymiix.com/ReactPost.php?id='+props.userData[0].UserId,formData,{
     
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

      

      <Progress percentagge={percentagge} isLoading={isLoading} />

    <Container style={{marginTop:'60px',width:'100%',position:'relative'}}  className="Container"> 
    <MetaTags>
            <title>{isLoading? 'MyMiix - Progress '+percentagge+'%' : 'MyMiix - Uploade Your Music'}</title>
           

    </MetaTags>

        <div style={{width:'100%',alignItems:'center',position:'relative',justifyContent:'center',alignContent:'center',overflowX:'hidden'}}>
        

        <FormControl style={{width:'100%',marginTop:'20px',backgroundColor:Themes['dark'].BackgroundColorTheme}} variant="standard" >
        
        <ChooseType setDescription={setDescription} setTitle={setTitle} setTypeFunction={setTypeFunction} />

        {typeFunction != "" && typeFunction == "Upload"?<div style={{width:'100%',padding:10,position:'relative'}}>
        <b>Write Album Title*</b>
          
          <input value={title} onChange={(e)=>setTitle(e.target.value)} style={{width:'100%',padding:10,marginBottom:30}} />
        <input type={'file'} onChange={handleOnChange} multiple accept='.mp3,.wav,.m4a'  ref={inputRef} style={{display:'none'}} />
        <FileUploaded inputRef={inputRef} />

        </div>:
        typeFunction != "" && typeFunction != "Upload"?
        <div style={{width:'100%',padding:10}}>
          <b>Write Title*</b>
          
          <input value={title} onChange={(e)=>setTitle(e.target.value)} style={{width:'100%',padding:10,marginBottom:30}} />
          <b>Add {typeFunction} Link*</b>
          
          <input value={descript} onChange={(e)=>setDescription(e.target.value)} style={{width:'100%',padding:10}} />

          <div style={{width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
          <b>Preview</b>

          {UrlForMedia(descript,fileName,setURLARRAY)}

          </div>
          
          </div>:null
        
        
        }

        
      
        </FormControl>
      
        </div>
    
    </Container>
 
    
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