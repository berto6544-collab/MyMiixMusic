import React from 'react'


const Adsense = ({adClient,adSlot,adFormat}) =>{

    React.useEffect(() => {
        const pushAd = () => {
            try {
              const adsbygoogle = window.adsbygoogle
              console.log({ adsbygoogle })
              adsbygoogle.push({})
            } catch (e) {
              console.error(e)
            }
          }
          pushAd();


          let interval = setInterval(() => {
            // Check if Adsense script is loaded every 300ms
            if (window.adsbygoogle) {
              pushAd()
              // clear the interval once the ad is pushed so that function isn't called indefinitely
              clearInterval(interval)
            }
          }, 300)
      
          return () => {
            clearInterval(interval)
          }
      },[])


    return(

        <ins  className={"adsbygoogle"}
        style={{display:'block',overflow:'hidden', width:"100%", height:50}}
        data-ad-client={"ca-pub-6989684433220866"}
        data-ad-slot={"8677268734"}
        data-ad-format={"auto"}
       
        data-full-width-responsive={true}
       
        
        />
    )

}


export default Adsense;
