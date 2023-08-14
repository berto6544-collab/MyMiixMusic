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

const MusicDataExplore = async(q,start) =>{

    const data = await fetch('https://music.mymiix.com/api/MusicDataExplore?search='+q+'&start='+start)
    .then(res=>res.json())

    return data;
}

const readUser = async() =>{
    const data = await  fetch('https://music.mymiix.com/api/userData',{
     method:'GET',
    })
    .then(res=>res.json())

return data;
}

const MusicDataUser  = async(user,start) =>{

  const data =  fetch('https://music.mymiix.com/api/MusicDataUser?user='+user+'&start='+start)
.then(res=>res.json())

return data;
}

const MusicDataUserScroll = async(user,start) =>{

    const data = fetch('https://music.mymiix.com/api/MusicDataUserScroll?user='+user+'&start='+start)
    .then(res=>res.json())

    return data
}


const API = {
    MusicData,
    MusicDataUniq,
    MusicDataUser,
    MusicDataUserScroll,
    MusicDataExplore,
    readUser
}

export default{
    API
}