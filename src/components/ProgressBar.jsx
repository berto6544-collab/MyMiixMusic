import React from 'react'
import { Box,LinearProgress,Typography } from '@mui/material'


const Progress = ({percentagge,isLoading}) => {


    if(isLoading){
    return(<Box style={{position:'fixed',backgroundColor:'white',padding:10,left:0,top:0,zIndex:1000,display:"flex",alignItems:'center', width:"100%"}} >
      <Box  width={'100%'} >
      <LinearProgress variant={"determinate"}  value={percentagge} style={{height:10}} />
      </Box>
      {<Box minWidth={35}>
        {<Typography variant="body2" color="textSecondary">{percentagge+'%'}</Typography>}
      </Box>}
    </Box>)
    }
   
   else{return null}
}


export default Progress;