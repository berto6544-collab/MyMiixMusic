import React from 'react';
import {Button, Container} from 'react-bootstrap';


function FileUploaded({inputRef}){




function onChangeFile(e){

console.log(e.target.files)

}


    return(
    <div
    //onDr
    
    
    style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',borderRadius:'0.5rem',border:'1px solid white',height:250}}>
        
        <h1 style={{textAlign:'center'}}>Drag & Drop To Upload </h1>
        <h1 style={{textAlign:'center'}}>Or </h1>
        <Button onClick={()=>{inputRef.current.click();}} style={{textAlign:'center'}}>Tap To Upload</Button>


    </div>
    
    )

}


export default FileUploaded