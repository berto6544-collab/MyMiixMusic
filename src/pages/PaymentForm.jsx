import React from 'react';
import  'bootstrap/dist/css/bootstrap.css';
import '../css/Payment.css';
import {Button,Container,Card,Carousel,Badge} from 'react-bootstrap';
import AuthApi from "../components/AuthApi";
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';

import {GameHosts} from '../json/gamesEvents';
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
    const {uniqId,idd} = useParams();
    const stripe = useStripe();
    const elements = useElements();

    
const [index,setIndex] = React.useState(0);
const [NumberofPlayers,setNumberofPlayers] = React.useState(1);
const [dataSource, setDataSource] = React.useState([]);
const [dataSourceGames, setDataSourceGames] = React.useState([]);

const [start,setStart] = React.useState(0);

const [show,setShow] = React.useState(false);
const [showww,setShowww] = React.useState(false);
const[postId,setPostId] = React.useState(0);
const[percentagge,setPercentage] = React.useState(0);
const[TotalAmount,setTotal] = React.useState(0);
const[indexing,setIndexing] = React.useState(0);
const[CountLike,setCountLike] = React.useState(0);
const[payment,setPayment] = React.useState("");
const[Note,setNote] = React.useState("");
const[Id,setId] = React.useState(0);
const[spot,setSpot] = React.useState('');
const[spotFilled,setSpotFilled] = React.useState('');
const[schedule,setSched] = React.useState('');
const[Myusername,setMyusername] = React.useState("");
const[Amount,setAmount] = React.useState("");
const[Search,setSearch] = React.useState("");
const[Name,setName] = React.useState(props.userData.length > 0 ? props.userData[0].Name:"");
const[Email,setEmail] = React.useState(props.userData.length > 0 ? props.userData[0].Email:"");
const[postIdd,setpostIdd] = React.useState(0);
const[topics,setTopic] = React.useState('');
const [showMusic,setShowMusic] = React.useState('mini');
const [hasMorre, setHasMore] = React.useState(false);
const [isLoading, setisLoading] = React.useState(true);
const [min, setMin] = React.useState(1);
const [max, setMax] = React.useState(12);
const [canPayment, setcanPayment] = React.useState(false);
const [showBottomNavbar, setshowBottomNavbar] = React.useState(false);


React.useEffect(()=>{
    
   

    fetchData();


    if(Cookies.get('SCOM')){
      
    }
   
    else{
      navigate('/login',{state:{from:'/payment/game/'+uniqId+'/'+idd}})
    }



},[])

const fetchData = async() => {
    
   
   
   
  fetch(process.env.REACT_APP_SITE+'/api/unique-event?id='+uniqId,{method:'GET'})
  .then(response => response.json())
  .then(responseJSON=>{
  

    if(responseJSON.length > 0 ){
      setDataSource(responseJSON)


 
      let allitems = responseJSON[0].DataDate;
      let filterIndex = allitems.findIndex((obj => obj.Id == idd));
      
      
      if(filterIndex == -1){
      
      }else{
      
        setSched(allitems[filterIndex].EventDates)
        setId(allitems[filterIndex].Id);
        setSpot(allitems[filterIndex].SpotsAvailablle)
        setSpotFilled(allitems[filterIndex].Spotss)
        setIndexing(filterIndex)
      
      }
    
      setIndex(0);
      
       var perct = percentage('3.9',responseJSON[0].AmountTotal)
   
       var paym = ((responseJSON[0].AmountTotal * 10) + (perct * 10 ) ) / 10 ;
   
       setPercentage(perct)
       setTotal(paym.toFixed(2))




    }else {

      setDataSource([])
      setIndex(0);

      setisLoading(false)

    }


   
})    


}


const ChangeNavbarBottom = () =>{
  if(window.scrollY >=320){
    setshowBottomNavbar(true)
  }else{
    setshowBottomNavbar(false)
  }
  
  }
  
  window.addEventListener('scroll',ChangeNavbarBottom)


const handleFreeSubmit = (event) =>{

  event.preventDefault();


  var formData =  new FormData();
  formData.append('name', Name);
  formData.append('email', Email);
  formData.append('paymentInput', TotalAmount);
  formData.append('paymentAmount', TotalAmount);
  formData.append('StripeRoomid', 'acct_1I6wysLjQQDnAief');
  formData.append('currency', 'usd');
  formData.append('EventId', dataSource[index].EventDateId);
  formData.append('EventDate', dataSource[index].EventDate);
  formData.append('numOfPlayers', NumberofPlayers);
  formData.append('perc', percentagge);
  formData.append('postId',idd)
  
    fetch(process.env.REACT_APP_SITE+'/charges.php?accountToken=acct_1I6wysLjQQDnAief',{
      method:'POST',
      body:formData,
      
      
      
      }).then(res => res.json())
      .then(response=>{
      
      
      console.log(response)
      
      if(response.success == "Thank you for your order"){
       
        if(Cookies.get("SCOM")){
        window.location.href = process.env.REACT_APP_SITE+'/ordered/game/'+response.token;
        }else{


        }
      }else{
  
  
      }
      
              
              
            })
  
  

}



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


if(dataSource[index].AmountTotal  > 0){


    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

 

    const result = await stripe.createToken(elements.getElement(CardElement))
    


    if (result.error) {


      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      
      console.log(result)
      
let Card = [];

//let Dates = new Date(result.token.card.exp_year+'-'+result.token.card.exp_month+'-30')
let lastDayOfMonth = new Date(result.token.card.exp_year, result.token.card.exp_month, 0);
Card.push({

  "card":[
    {
      "brand":result.token.card.brand,
      "country":result.token.card.country,
      "exp":result.token.card.exp_year+'-'+result.token.card.exp_month+'-'+lastDayOfMonth.getDate(),
      "expDetail":result.token.card.exp_month+'/'+result.token.card.exp_year,
      "last4":result.token.card.last4,
      
    }
  ],
})


var formData =  new FormData();

formData.append('stripeToken', result.token.id);
formData.append('name', Name);
formData.append('expDate',result.token.card.exp_year+'-'+result.token.card.exp_month+'-'+lastDayOfMonth.getDate());
formData.append('CardJSON',JSON.stringify(Card))
formData.append('email', Email);
formData.append('paymentInput', TotalAmount);
formData.append('paymentAmount', TotalAmount);
formData.append('StripeRoomid', 'acct_1I6wysLjQQDnAief');
formData.append('currency', 'usd');
formData.append('EventId', dataSource[index].EventDateId);
formData.append('EventDate', dataSource[index].EventDate);
formData.append('numOfPlayers', NumberofPlayers);
formData.append('postId',idd)
formData.append('perc', percentagge)
fetch(process.env.REACT_APP_SITE+'/charges.php?accountToken=acct_1I6wysLjQQDnAief',{
method:'POST',
body:formData,



}).then(res =>res.json())
.then(response=>{


console.log(response)

if(response.success == "Thank you for your order"){
 
if(Cookies.get('SCOM')){

  window.location.href = process.env.REACT_APP_SITE+'/ordered/game/'+response.token;
}else{
setShow(true)

}

}else{

}

        
        
      })

  
  };

}else{

  handleFreeSubmit(event);


}

}



if(dataSource.length > 0 && isLoading == true){
return ( 
        
    <div style={{width:"100%", margin:0,marginTop:10,overflowX:'hidden'}} className="ulPost"> 
   
   <div  className='CardType' style={{width:'100%',zIndex:10,position:'relative',paddingBottom:100}}>
    {spot>0? <div style={{padding:10,display:'flex',flexDirection:'column',width:'100%',position:'relative'}}>
    
    <h1 className='TitleText' style={{fontWeight:'bolder'}}>Book Today</h1>
    <p >Book today and reserve your spot.</p>


    <div style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:30,position:'relative'}}>
    
    <h3 className='TitleText' style={{fontWeight:'bolder'}}>Your order</h3>
    <h5 style={{fontWeight:'bolder'}}>Schedule</h5>
    <p className='TitleText' >{schedule}</p>

    </div>


    <div style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:20,position:'relative'}}>
    
   
    <b style={{fontWeight:'bolder'}}>Number of Players</b>
    <input className='TitleText' 
    onChange={(e)=>{

    //if player amount is more than 1 but less then available spots
    if(e.target.value > 1 && e.target.value < dataSource[index].DataDate[indexing].SpotsAvailablle ){
    setNumberofPlayers(e.target.value)

    var value = dataSource[index].AmountTotal * e.target.value;
    var perct = percentage('3.9',value)

    var paym = ((value * 10) + (perct * 10)) /10;

    setPercentage(perct)
    setTotal(paym.toFixed(2))

    console.log(paym.toFixed(2))
    }
    
    //if player amount is more then available spots then set available spots
    
    else if(e.target.value >= dataSource[index].DataDate[indexing].SpotsAvailablle){

     
      setNumberofPlayers(dataSource[index].DataDate[indexing].SpotsAvailablle)
      var value = dataSource[index].AmountTotal * dataSource[index].DataDate[indexing].SpotsAvailablle;
      var perct = percentage('3.9',value)
  
      var paym = ((value * 10) + (perct * 10)) /10;
  
      setPercentage(perct)
      setTotal(paym.toFixed(2))
  
      console.log(paym.toFixed(2))
      e.target.value = dataSource[index].DataDate[indexing].SpotsAvailablle;

    }
    else if(e.target.value == ""){
      
    }
    
     //if player amount is less than 1 setnumber of players 1
    else{

      e.target.value = 1;
     setNumberofPlayers(1)
     var value = dataSource[index].AmountTotal * 1;
     var perct = percentage('3.9',value)
  
   var paym = ((value * 10) + (perct * 10)) /10;
  
   setPercentage(perct)
   setTotal(paym.toFixed(2))
  
     console.log(paym.toFixed(2))
    }
    
    
    
    

    }}
    
    type={'number'} defaultValue={1} style={{padding:10,backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,border:'1px solid '+Themes[Utils.getThemeMode()].Color+'',color:Themes[Utils.getThemeMode()].Color}}  />

    </div>

 {/*Handles Payment*/}


    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:30,position:'relative'}}>
    {dataSource[index].Amount > 0 ?<h3 className='TitleText' style={{fontWeight:'bolder'}}>Payment</h3>:null}
    {dataSource[index].Amount > 0 ?<p >Pay on the day</p>:null}
    {props.userData.length > 0 ? <p>{props.userData[0].Name}</p>:<FormControl style={{width:'100%',marginTop:'20px'}} variant="filled">
        
        
        <TextField onChange={(e)=>{
          setName(e.target.value)
          
        }} 
        
        inputProps={{ style: { color:'white',border:'1px solid white'} }}
        InputLabelProps={{style:{color:'white',display:'none'}}}
        placeholder={'Name'}
        id="outlined-basic" name={'name'} type={'text'} variant={'outlined'}    />
      
      
      </FormControl>}

      {props.userData.length > 0 ? <p>{props.userData[0].Email}</p>:<FormControl style={{width:'100%',marginTop:'20px',marginBottom:'20px'}} variant="filled">
        
        
      <TextField  onChange={(e)=>{
          setEmail(e.target.value)

        }} id="outlined-basic" 
        InputLabelProps={{style:{color:'white',display:'none'}}}
        inputProps={{ style: { color:'white',border:'1px solid white'} }}
        placeholder={'Email'}
        type={'email'}  variant={'outlined'}    />
      
      
      </FormControl>}
      {dataSource[index].AmountTotal > 0? <div style={{display:'flex',flexDirection:'column',width:'100%',padding:10,border:'1px solid '+Themes[Utils.getThemeMode()].borderColor,backgroundColor:'white',borderRadius:5,position:'relative'}}>
    
    
   <CardElement  style={{base: {fontSize: '18px',padding:20}}} />
    </div>:null}
    <div style={{display:'flex',flexDirection:'column',width:'100%',alignItems:'end',justifyContent:'end',paddingTop:20,borderRadius:5,position:'relative'}}>
   <Button disabled={!stripe} type={'submit'}  style={{display:'flex',flexDirection:'column',width:'30%',border:'0px',padding:10,backgroundColor:'#ff5c05',borderRadius:5,position:'relative'}}>Book</Button>
</div>
    </form>

   



    </div>:
    <div style={{padding:10,display:'flex',flexDirection:'column',width:'100%',position:'relative'}}>
      <h1 className='TitleText' style={{fontWeight:'bolder'}}>Fully Booked.</h1>
    
      <div style={{display:'flex',flexDirection:'column',width:'100%',paddingTop:30,position:'relative'}}>
    

    <h5 style={{fontWeight:'bolder'}}>Schedule</h5>
    <p className='TitleText' >{schedule}</p>
    <p style={{fontSize:15}}>Number of players: {spotFilled}</p>
    </div>

    </div>
    
    }

    

    <div style={{width:'100%',position:'relative',display:'flex',alignItems:'end',justifyContent:'end',}}>
    <div className='Cardpay' style={{backgroundColor:Themes[Utils.getThemeMode()].BackgroundColor,borderRadius:7,overflow:'hidden',border:'1px solid '+Themes[Utils.getThemeMode()].borderColor}}>
    
    
    <div style={{width:'100%',height:200,position:'relative'}}>
    <div style={{position:'absolute',right:10,top:10,backgroundColor:'rgba(0,0,0,0.5)',padding:1,borderRadius:60}}>
    <b style={{color:'white'}}>{spot>0? 'Only '+spot+' spots left': 'no spots left'}</b>
    </div>


     <img src={dataSource[index].Image} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="img" />
     </div>

     {/*Handles Details*/}
     <div style={{width:'100%',padding:16,position:'relative',borderBottom:'2px solid '+Themes[Utils.getThemeMode()].borderColor}}>
        <div style={{width:'100%',position:'relative'}}>
        <b style={{width:'100%',position:'relative'}}>{dataSource[index].Title.replaceAll("[nl]" , "\n")}</b>
        <div style={{width:'100%',position:'relative',fontSize:14,lineHeight:0.5,paddingTop:5}}>
        <p>Ages: All ages</p>
        <p>Game host: {dataSource[index].UserName}</p>
        </div>
        
        </div>


        


        <div style={{display:'flex',alignItems:'center',width:'100%',position:'relative'}}>
        
        <div style={{width:'100%',position:'relative'}}>
            <b>Price Details</b>
             {/*Handles Amount x players*/}
            <div style={{width:'100%',position:'relative',display:'flex',alignItems:'center'}}>
            <p style={{fontSize:14}}>{dataSource[index].Amount} x {NumberofPlayers} players</p>
            <p style={{fontSize:14,position:'absolute',right:0}}>{dataSource[index].AmountTotal > 0 ?dataSource[index].Amount:'0.00'}</p>
            </div>
            
            {/*Handles Service Fee*/}
            <div style={{width:'100%',position:'relative',display:'flex',alignItems:'center'}}>
            <p style={{fontSize:14}}>Service fee</p>
            <p style={{fontSize:14,position:'absolute',right:0}}>{dataSource[index].AmountTotal > 0 ?'$'+percentagge:'0.00'}</p>
            </div>

             {/*Handles Total Amount*/}
            <div style={{width:'100%',position:'relative',display:'flex',alignItems:'center'}}>
            <b style={{fontSize:14}}>Total</b>
            <b style={{fontSize:14,position:'absolute',right:0}}>{dataSource[index].AmountTotal > 0 ?'$'+TotalAmount:'FREE'}</b>
            </div>
        </div>
        
        
       
        </div>


       

        


     </div>


     <div style={{display:'flex',alignItems:'center',width:'100%',position:'relative'}}>
        
       
        
        
       
        </div>


    </div>


    


    </div>
    
        </div>
        
        { showBottomNavbar == true ?<div id={'fixedBottom'} style={{width:'100%',display:'flex',zIndex:50,flexDirection:'column',backgroundColor:Themes[Utils.getThemeMode()].BackgroundColorTheme,padding:10,position:'fixed',bottom:0}}>
<div style={{display:'flex',alignItems:'center',width:'100%',height:50,position:'sticky',bottom:0}}>

<div style={{width:'100%',position:'relative',display:'flex',alignItems:'center'}}>
            <b style={{fontSize:24}}>Total</b>
            <b style={{fontSize:24,position:'absolute',right:0}}>{dataSource[index].AmountTotal > 0 ?'$'+TotalAmount:'FREE'}</b>
            </div>
</div>


</div>:null}

    </div>
    
    )
}else if(!isLoading){

    return( 
    <div style={{width:"100%", margin:0,marginTop:10}} className="ulPost"> 
        <h1 className='TitleText' style={{fontWeight:'bolder'}}>You dont have access</h1>
 
    </div>)
}else return<></>
}







  
  




  


export default Trending;
	
	
	
