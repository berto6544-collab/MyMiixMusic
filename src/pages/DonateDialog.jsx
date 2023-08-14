import React from 'react';
import  'bootstrap/dist/css/bootstrap.css';
import '../css/Payment.css';
import {Button,Container,Card,Carousel,Badge} from 'react-bootstrap';
import AuthApi from "../components/AuthApi";
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';


import {Dialog,Avatar,OutlinedInput,FormControl,TextField,InputAdornment,Select} from '@mui/material/';
import {FavoriteBorder,Favorite,ChatBubble, InvertColorsOff} from '@mui/icons-material';

import {
    CardElement,
    Elements,
    useStripe,
    paymentRequest,
    useElements,
  } from '@stripe/react-stripe-js';

import Utils from '../Utility/Utils';
import { BrowserRouter as Router, Link, Redirect, Route,Switch,useParams,useNavigate } from 'react-router-dom';
import derek from '../assets/derek.jpg';
import FullDialog from '../dialog-components/DialogFull';
import 'lazysizes';
import * as Themes from '../Utility/Theme';
import {reactLocalStorage} from 'reactjs-localstorage';

import { textAlign } from '@mui/system';
const urlParams = new URLSearchParams(window.location.search);
let theme = "light";








function Trending(props) {
    const navigate = useNavigate();
    const Auth = React.useContext(AuthApi);
    const stripe = useStripe();
    const elements = useElements();

    
const [index,setIndex] = React.useState(0);
const [start,setStart] = React.useState(0);
const [show,setShow] = React.useState(false);

const[percentagge,setPercentage] = React.useState('0.54');
const[TotalAmount,setTotal] = React.useState('5.54');
const[Amount,setAmount] = React.useState('5.00');
const[UserName,setUserName] = React.useState(props.username);
const[Status,setStatus] = React.useState('');
const[Name,setName] = React.useState(props.userData.length > 0 ? props.userData[0].Name:"");
const[Email,setEmail] = React.useState(props.userData.length > 0 ? props.userData[0].Email:"");
const[postIdd,setpostIdd] = React.useState(0);
const[topics,setTopic] = React.useState('');



React.useEffect(()=>{
    

  if(props.amount){
  var value =  props.amount;
  setAmount(value)
  var perct = percentage('3.9',value)

  var paym = ((value * 10) + (perct * 10)) /10;

  setPercentage(perct)
  setTotal(paym.toFixed(2))
  }


},[])











const percentage = (percent, total) => {
	
	
   return ((percent/ 100) * total + 0.35 ).toFixed(2)
   
	
	
}


function handleClosse(){
  setShow(false)
}

const handleSubmit = async (event) => {
  // We don't want to let default form submission happen here,
  // which would refresh the page.
  event.preventDefault();

  if(props.amount){
    if(Amount < props.amount){
      alert('Minimum Donation amount is $'+props.amount+'')
      return
    }

  }else{
  if(Amount < 4){
    alert('Minimum Donation amount is $4.00')
    return
  }

}

  if (!stripe || !elements) {
    // Stripe.js has not yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    return;
  }

  setStatus('Processing')

  const result = await stripe.createToken(elements.getElement(CardElement))
  


  if (result.error) {

    setStatus('')
    // Show error to your customer (for example, payment details incomplete)
    console.log(result.error.message);
    return;
  } else {
    
    //console.log(result)
    

var formData =  new FormData();

formData.append('stripeToken', result.token.id);
formData.append('name', Name);
formData.append('email', Email);
formData.append('paymentInput', TotalAmount);
formData.append('paymentAmount', TotalAmount);
formData.append('StripeRoomid', 'acct_1I6wysLjQQDnAief');
if(UserName != ''){
formData.append('artist',UserName)
formData.append('perc', percentagge)
}else{
if(props.username != ''){
  formData.append('artist',props.username)
formData.append('perc', percentagge)
}


}



fetch(process.env.REACT_APP_SITE_GAMES+'/charges.php',{
method:'POST',
body:formData,



}).then(res =>res.json())
.then(response=>{


//console.log(response)

if(response.success == "Thank you for your Donation"){


  setStatus(response.success+' '+UserName)

window.location.href = window.location.href;


}else{

if(response.success == "Artist does not exist on mymiix"){

  setStatus("You can't make payment on this painting")

}



}

      
      
    })


};



}




return ( 
        
    <div style={{width:"100%", margin:0,overflowX:'hidden'}} > 
   
   <div   style={{width:'100%',zIndex:10,position:'relative'}}>
    <div style={{width:'100%',textAlign:'center'}}>
    
    {props.Title == "Donate"?<p>Donate & Support Creators on mymiix.</p>:null}
    </div>
   

    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',width:'100%',position:'relative'}}>

   

{props.userData.length > 0 ? null:<FormControl style={{width:'100%',marginTop:'10px'}} variant="filled">
    
    
    <input onChange={(e)=>{
      setName(e.target.value)
      
    }} 
    
   
    style={{padding:10,width:'100%',backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,border:'1px solid '+Themes[Utils.getThemeMode()].Color+'',color:Themes[Utils.getThemeMode()].Color}}
    
    placeholder={'Name'}
   
    name={'name'} type={'text'} variant={'outlined'}    />
  
  
  </FormControl>}

  <FormControl style={{width:'100%',marginTop:'10px',marginBottom:10}} variant="filled">
    
    
    {props.username ? <b>{props.username}</b>:<input onChange={(e)=>{
      if(props.username){return}
      setUserName(e.target.value)
      
    }} 
    
    style={{padding:10,width:'100%',backgroundColor:props.username?'#f0f0f0':Themes[Utils.getThemeMode()].BackgroundColor,border:'1px solid '+Themes[Utils.getThemeMode()].Color+'',color:Themes[Utils.getThemeMode()].Color}}
  
    placeholder={'Creators username'}
   
    name={'artistname'} defaultValue={UserName} type={'text'} variant={'outlined'}    />}
  
  
  </FormControl>

  {props.userData.length > 0 ? null:<FormControl style={{width:'100%',marginBottom:'10px'}} variant="filled">
    
    
  <input  onChange={(e)=>{
      setEmail(e.target.value)

    }} 

    
    placeholder={'Email'}
    style={{padding:10,width:'100%',backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,border:'1px solid '+Themes[Utils.getThemeMode()].Color+'',color:Themes[Utils.getThemeMode()].Color}}
  
    type={'email'}  variant={'outlined'}    />
  
  
  </FormControl>}
  <div style={{display:'flex',flexDirection:'column',width:'100%',padding:10,border:'1px solid '+Themes[Utils.getThemeMode()].borderColor,backgroundColor:'white',borderRadius:5,position:'relative'}}>


<CardElement  style={{base: {fontSize: '18px',padding:20}}} />
</div>

    <div style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:20,position:'relative'}}>
    
   
    <b style={{fontWeight:'bolder'}}>Amount</b>
    <input 
    
    onChange={(e)=>{

    
    

    var value =  e.target.value;
    setAmount(value)
    var perct = percentage('3.9',value)

    var paym = ((value * 10) + (perct * 10)) /10;

    setPercentage(perct)
    setTotal(paym.toFixed(2))

   
    
 
    
    
    
    

    }}
    
    type={'number'} value={Amount} style={{padding:10,width:'100%',backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,border:'1px solid '+Themes[Utils.getThemeMode()].Color+'',color:Themes[Utils.getThemeMode()].Color}}  />

    </div>

 {/*Handles Payment*/}


   
    
    <div style={{display:'flex',flexDirection:'column',WebkitAlignItems:'flex-start',WebkitJustifyContent:'start',width:'100%',alignItems:'flex-start',justifyContent:'start',paddingTop:20,borderRadius:5,position:'relative'}}>
   
    
   <div style={{paddingBottom:10,display:'flex',flexDirection:'column'}}>
   <b>Service Fee: ${percentagge}</b>
   <b>Total: ${TotalAmount}</b>
   </div>
   <Button disabled={!stripe} type={'submit'}  style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',border:'0px',border:'1px solid rgb(0, 123, 255)',padding:10,backgroundColor:'rgb(0, 123, 255)',borderRadius:5,position:'relative'}}>{props.Title == "Donate"?"Donate":"Pay"}</Button>

   {Status != ''?<div style={{padding:20,width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
      <p>{Status}</p>
    </div>:null}
</div>
    </form>

   



    
    
    
    

    

    
    
        </div>
        
      

    </div>
    
    )

}







  
  




  


export default Trending;
	
	
	
