import React from 'react';



function FileUploaded({inputRef}){




function onChangeFile(e){

console.log(e.target.files)

}


    return(
    <div onClick={()=>{
        inputRef.current.click();
    }} style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',borderRadius:'0.5rem',border:'1px solid white',height:250}}>
        
        <h1 style={{textAlign:'center'}}>Drag & Drop To Upload </h1>
        <h1 style={{textAlign:'center'}}>Or </h1>
        <h1 style={{textAlign:'center'}}>Tap To Upload</h1>


    </div>
    
    )

}


export default FileUploaded