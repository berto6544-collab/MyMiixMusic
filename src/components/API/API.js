async function MusicData(start){

    const data = await fetch('https://music.mymiix.com/api/MusicData?start='+start)
    .then(response =>response.json())
    .catch(res=>res)

    return data;

}

const MusicDataUniq = async(uniqId) =>{

    const data = await fetch('https://music.mymiix.com/api/MusicDataUniq?uniq='+uniqId)
    .then(res=>res.json())

    return data;
}

const readUser = async() =>{
    const data = await  fetch(process.env.REACT_APP_API+'/userData',{
     method:'GET',
    })
    .then(res=>res.json())

return data;
}



const API = {
    MusicData,
    MusicDataUniq,
    readUser
}

export default{
    API
}