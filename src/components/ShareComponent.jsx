import react from 'react';
import {Button,Container,Card,Carousel,Badge} from 'react-bootstrap';
import 
{FacebookShareButton,
 FacebookIcon,
 RedditShareButton,
 RedditIcon,
 EmailShareButton,
 EmailIcon,
 TwitterShareButton,
 TwitterIcon,
 PinterestShareButton,
 PinterestIcon,
 WhatsappShareButton,
 WhatsappIcon,
 TelegramShareButton,
 TelegramIcon,
 FacebookMessengerShareButton,
 FacebookMessengerIcon

} from 'next-share';



const Share = ({dataSourccce}) =>{


    return (
        


        <div style={{width:'100%'}} >
       
       <div style={{width:'100%',border:'1px solid lightgrey',position:'relative',overflowX:'hidden',padding:10,display:'flex',flexDirection:'column',alignItems:'center'}}>
      
       


      <div style={{width:'100%',position:'relative',padding:10}}>
      <h2 style={{fontWeight:'bold'}}>Share</h2>
      <p>Share {dataSourccce[0].Title} on other platforms!</p>

      
        
      </div>
      <div style={{width:'100%',position:'relative',padding:10}}>
      <div style={{width:'100%',borderRadius:5,backgroundColor:'lightgrey',overflow:'hidden',position:'relative',padding:25,display:'flex',alignItems:'center'}}>
        <span style={{position:'absolute',left:10}}>https://music.mymiix.com/p/{dataSourccce[0].Title}</span>
        <Button style={{position:'absolute',right:3}}  onClick={()=>{

        navigator.clipboard.writeText("https://games.mymiix.com/p/"+dataSourccce[0].Title)


}}>CopyLink</Button>
      </div>

      </div>
      <div style={{width:'100%',position:'relative',overflowX:'scroll',padding:10,display:'flex',alignItems:'center'}}>
      <FacebookShareButton
      url={'https://games.mymiix.com/p/'+dataSourccce[0].Title}
  
>
  <FacebookIcon size={47} round />
</FacebookShareButton>

<TwitterShareButton
      url={'https://games.mymiix.com/p/'+dataSourccce[0].Title}
  
>
  <TwitterIcon size={47} round />
</TwitterShareButton>

<RedditShareButton
      url={'https://games.mymiix.com/p/'+dataSourccce[0].Title}
      title={dataSourccce[0].Title}
     
>
  <RedditIcon size={47} round />
</RedditShareButton>

<PinterestShareButton
      url={'https://games.mymiix.com/p/'+dataSourccce[0].Title}
      media={dataSourccce[0].Image}
     
      
>
  <PinterestIcon size={47} round />
</PinterestShareButton>




<FacebookMessengerShareButton
      url={'https://games.mymiix.com/p/'+dataSourccce[0].Title}
  
>
  <FacebookMessengerIcon size={47} round />
</FacebookMessengerShareButton>

<WhatsappShareButton
      url={'https://games.mymiix.com/p/'+dataSourccce[0].Title}
  
>
  <WhatsappIcon size={47} round />
</WhatsappShareButton>

<TelegramShareButton
      url={'https://games.mymiix.com/p/'+dataSourccce[0].Title}
  
>
  <TelegramIcon size={47} round />
</TelegramShareButton>

      
       </div>

       

       
       </div>
       



       </div>
    )
}

export default Share;