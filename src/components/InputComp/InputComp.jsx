import React from 'react';





const InputComp = ({setData,Data,Title,Description,maxLength,placeholder}) =>{



    return(
    <div className={'searchBar'} style={{padding:10,marginBottom:0, backgroundColor:'#f2f2f2'}} >
   <h4>{Title}</h4>
   <p>{Description}</p>
    <input maxLength={maxLength} value={Data} placeholder={placeholder} type={'text'} onChange={(e)=>{

    
    setData(e.target.value);
    
    }}    style={{backgroundColor:'#D6DAE1',color:'black',borderRadius:5,padding:10,width:'100%',border:0,paddingLeft:10}} />
    </div>

    )



}

export default InputComp;