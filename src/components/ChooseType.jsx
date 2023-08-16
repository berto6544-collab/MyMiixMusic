import React from 'react'
import {LinkType} from '../json/LinkTypes';



const ChooseType = ({setTypeFunction,setDescription,setTitle,handleClear}) =>{



return(
    <div style={{width:'100%',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:20,padding:10,borderRadius:20}}>
      
      
      
        <b>Choose Type</b>
      {LinkType.length > 0 ?<div style={{display:'flex',width:'100%',justifyContent:'center',flexDirection:'column',overflowX:'hidden',alignItems:'center',marginTop:20,marginBottom:10}}>
    

      <div style={{display:'flex',flexDirection:'row',alignItems:'center',overflowX:'auto',flexWrap:'wrap',marginTop:20}}>
      
      {LinkType.map((post,i)=>{
        if(i == 0){
        return(<div key={post.Type} onClick={()=>{
            handleClear()
            setTypeFunction(post.Type)
            
            setDescription('')
            setTitle('')
            
         
        }} style={{position:'relative',padding:10,marginTop:10,cursor:'pointer',color:'black',borderRadius:10,backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center'}}>
                <img src={post.Image} style={{width:40,height:40}} />
                <p>{post.Type}</p>
              </div>)
        }else{
          return(<div key={post.Type} onClick={()=>{
            handleClear()
            setTypeFunction(post.Type)
            setDescription('')
            setTitle('')
            
            
          }} style={{position:'relative',marginLeft:10,marginTop:10,padding:10,color:'black',borderRadius:10,cursor:'pointer',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center'}}>
          <img src={post.Image} style={{width:40,height:40}} />
          <p>{post.Type}</p>
        </div>) 
        }

      })}
        
      </div>

      </div>:null}
      
      
     

      

    </div>
    
    
    )

}

export default ChooseType