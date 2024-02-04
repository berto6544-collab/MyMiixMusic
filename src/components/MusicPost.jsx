import React from 'react'
import {Button} from '@mui/material/';
const  uploadIcon = "data:image/jpeg;base64,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";


function MusicPost({DataURLType,inputReff,showForm,handleClear,FileSample,songName,FileArray,setFileArray,setSongName,ios,DataSong,FFMPEG,setSong,readableDuration,setFileSampleArray,setFileVideoSample,setFileSample}) {


    return(<div style={{width:'100%',padding:10,position:'relative'}}>
   
    <div style={{width:'100%',padding:10,paddingBottom:20,display:'flex',flexDirection:'column',position:'relative'}}>
    <div style={{width:'100%',padding:10,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
   <div style={{width:200,height:200,backgroundColor:'black',overflow:'hidden',borderRadius:20,position:'relative'}} >
   <img src={DataURLType != ""? DataURLType :uploadIcon} 
   onClick={()=>{
     inputReff.current.click();
   }}
   style={{width:200,height:200,objectFit:'cover'}} />
   
   
   </div>
   
   </div>
   
   
   
   
   
   {showForm?<div style={{display:'flex',width:'100%',flexDirection:'row',position:'relative',paddingBottom:20,justifyContent:'space-between'}}>
   <h3>Tracks</h3> 

   <Button variant="contained" onClick={()=>{
      handleClear();
   }}>Clear All Tracks</Button>
     </div>:null}
   
   </div>
   
   {FileSample != null && showForm?<div  style={{display:'flex',width:'100%',flexDirection:'column',marginTop:20,marginBottom:20}}>
     <b>Sample Track</b>
     <audio style={{borderRadius:100,backgroundColor:'white',width:'100%',marginBottom:20}} src={FileSample}  controls={true} />
   </div>:null}
   
   {songName.length > 0 && showForm && songName.map((posts,index)=>{
   
   return(<div key={index} style={{display:'flex',flexDirection:'column',backgroundColor:'#565656',borderRadius:'0.5rem',marginBottom:20,padding:10,position:'relative',paddingBottom:20,borderBottom:'1px solid lightgrey'}}>
   
   
   
   
   
   {<input id={'replaceFile'+index} key={index} accept={'.mp3,.m4a,.wav'}  style={{display:'none'}} type={'file'} multiple={false} onChange={(img)=>{

for (var i = 0; i < img.target.files.length; i++) {
  if(img.target.files[i].type.match('audio.*')){

  }else{
    alert('Upload audios only')
  return
  }
}
   
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
    
   
   <label for={"replaceFile"+index} class="btn btn">
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
   <input defaultValue={songName[index].name} value={songName[index].name}  style={{border:'1px solid lightgrey',padding:5,width:'100%'}} onChange={(e)=>{
   posts.name = e.target.value;
   setSongName([...songName])
   
   }} />
    
    
    <b>Artist Name</b>
   <input defaultValue={songName[index].artist} value={songName[index].artist} placeholder={'Artist Name ft artist'} style={{border:'1px solid lightgrey',padding:5,width:'100%'}}  onChange={(e)=>{
     posts.artist = e.target.value;
     setSongName([...songName])
   }} />
   
   </div>
   
   </div>
   
   <div style={{display:'flex',paddingTop:10,flexDirection:'column'}}>
     <b>Genre</b>
     
   <input defaultValue={songName[index].genre}  placeholder={'eg(R&B, HipHop, Rap HipHop)'} style={{border:'1px solid lightgrey',padding:5}} onChange={(e)=>{
   posts.genre = e.target.value;
   setSongName([...songName])
   
   }} />
    
   
   
   </div>
   
   <div style={{display:'flex',paddingTop:10,position:'relative',flexDirection:'column'}}>
     <b>Tag</b>
     <p></p>
   <input placeholder={'@username, @username'} value={songName[index].tag} defaultValue={songName[index].tag} style={{border:'1px solid lightgrey',padding:5}} onChange={(e)=>{
   posts.tag = e.target.value;
   setSongName([...songName])
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
   
   
   
   </div>)
}


export default MusicPost