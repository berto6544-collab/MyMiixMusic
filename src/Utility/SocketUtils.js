import Utils from './Utils';
import io from 'socket.io-client';

let socket = null;
let websocket = null;


const getSocket = () => {
    return socket;
  };

  const connect = () => {
    socket = io.connect('https://developerscope.com:49849', {forceNode:true,secure:true});
  };
  
  const handleOnConnect = () => {
 
    socket.on('connect', data => {
    
  
  
     let datta = {name: Utils.getUserName(),userIdd: Utils.getUserId()};
      //socket.emit('setUserId',datta);
  
      console.log(data)
  
  
    });
  
  
    
  
  
    
  };


  const handleOnSendMessage = async() => {
  
   
  
    socket.on('send-message', data => {
      const {userId,roomName,userName, userProfile, message, eventId, posted_at,uniqueId,postimg} = data;
  
      
      
  
  
  
      const listMessages = Utils.getContainer().state.dataSource;
      const newListMessages = listMessages.slice();
  
     
   
      
  
  
      newListMessages.push({
        "id":userId,
        "Sender":userName,
        "profileimg":userProfile,
        "body":message,
        "Receiver":userName,
        "postimg":postimg,
        "posted_at":posted_at,
        
        
       
      
        
      });
    
      
    
      console.log(data);
     
  
  
      Utils.getContainer().setState({dataSource: newListMessages});
    
      
    
    });
  
    
  };

  const emitSendMessage = async(
    userId,roomName,userName, userProfile, message, eventId, posted_at,uniqueId,postimg
   
   
    
   ) => {
   
  
    
    socket.emit('send-message', {
    roomName,
    userId,
    userName,
    userProfile,
    message,
    eventId,
    posted_at,
    uniqueId,
    postimg
   
    });
   
   
   };

   const emitbroadCastingMessage = (
    userId,
    username,
    userProfile,
    message
   ) => {
   
    socket.emit('broadCast-message', {
    
    userId,
    username,
    userProfile,
    message
   
    });
   
   
   };
  const emitJoinServer = (roomName, userId,userName,userProfile) => {
 
    socket.emit(
    'join-server',
    {
    roomName,
    userId,
    userName: userName,
    userProfile: userProfile,
   
    },
    
    data => {
    
    
    },
    );
    
    
   };


   const handleTyping = () => {

  
    socket.on('broadCast-message', (data) => {
      const {userId, message,userName,userProfile} = data;
     
    
        if(message == "") 
        {
          Utils.getContainer().setState({
            Typing: ''
        
        });
        }
        else{
        Utils.getContainer().setState({
            Typing: '...'
        
        });
        }
        
      
    });
  
  };


  const handleOnClientJoin = () => {
    socket.on('join-client', (data) => {
    console.log('join-client');
   
    
    });
   };

   const SocketUtils = {
    getSocket,
    connect,
    handleOnConnect,
    emitSendMessage,
    handleOnSendMessage,
    emitJoinServer,
    emitbroadCastingMessage,
    handleTyping,
    handleOnClientJoin


   }

   export default SocketUtils;