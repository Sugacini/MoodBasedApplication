import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { FaArrowLeft } from "react-icons/fa6";
import ChatSpace from './ChatSpace';
import ChatFooter from './ChatFooter';
import { useLocation } from 'react-router-dom';
import Header from './Header';


function ChatBot() {
    const location = useLocation();
    const result = location.state;
    const userId = result.idOfUser;
    const data1 = (JSON.stringify(result.emo1));
    const finalEmo = data1.slice(1,data1.length-1);
    const navigate = useNavigate();
    const [messages,setMessage] = useState([]);
    const [currentMessage, setCurrentMessage]=useState(null);
    if ((messages.length%2)!=0) {
      console.log('asked');   
      botChat(messages[messages.length-1]);
    }
    const apiKey = 'AIzaSyBPeW2Q96M523ObMuApv4PSCm6T9Hp3Lus'; 
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    async function botChat(prompt) {
      try {
  
        console.log(prompt);
  
        console.log('waiting for response');
        
        
        var response = await fetch (apiUrl+'?key='+apiKey,{
          method:'POST',
          headers:{
            'Content-type':'application/json',
          },
          body: JSON.stringify({
            contents : [{ parts : [{ text : prompt}] }]
          })
        });
        
        if(response.ok){
          var data = await response.json();
          // setReply(data.candidates[0].content.parts[0].text)
          setMessage([...messages,data.candidates[0].content.parts[0].text]);  
          console.log(data.candidates[0].content.parts[0].text);

        }
      } catch (error) {
        console.log(error);
    }

    useEffect(()=>{
      console.log(finalEmo);
      setMessage(["start a conversation with me, I am "+finalEmo+" today, don't acknowledge me just start"]);  
    },[])
  


return (
    <div className='chatContainer'>

        <div className='fullPageOfChat'>
        <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={"features"} obj={{state: {findEmo: finalEmo, idOfUser: userId}}}/>

            <div className='chatHeader'>
                <FaArrowLeft className='back' onClick={(e) =>navigate("/features",{ state: { findEmo: (finalEmo) , idOfUser: userId} })}/>
                <p>Emotional Partner</p>
            </div>
            <ChatSpace messages={messages}></ChatSpace>
            {/* <h1>{replyCreated}</h1> */}
            <ChatFooter messages={messages} setMessage={setMessage} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} />
        </div>
    </div>
    
  )
}
}

export default ChatBot;
