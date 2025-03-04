import { Chart as ChartJS} from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import Header from "./Header";
import { useAppContext } from "../ForContext";
import { useEffect, useState } from "react";
import TodaysMood from "./TodaysMood";

  function PastSevenDays() {  
    var currentUserId = sessionStorage.getItem('userId');
    
    // const [count, setCount] = useState(0)
    const {userIdContext, currentEmotion} = useAppContext();
    console.log(currentEmotion);
    var [emotionNow, setEmotion] = useState(null);
    var emotions = [ 'happy', 'neutral', 'sad', 'angry', 'disgust', 'surprised', 'fearful' ];

    var [dataFromDb,setData]=useState(null);
    var emotionWithTimes={};
    
    useEffect(()=>{
      getTodaysLog(currentUserId);
      getCurrentEmotion(currentUserId);
    },[])
    
    if (dataFromDb) {
      console.log('emotionNow : ', emotionNow);
      
      dataFromDb.map((val)=>{
        if (emotionWithTimes[val.mood]) {
          
          emotionWithTimes[val.mood]+=1
        }
        else{
          emotionWithTimes[val.mood]=1
        }
      })
    }
    
    
    

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Last seven days", 
          color: 'black',
          align: 'center',
          padding:{
            bottom:50
          },
          font:{
            size:23
          }
        },
        legend: {
          position: 'false',
        }
      },
      
    };

    var values= [];
    emotions.forEach((val)=>values.push(emotionWithTimes[val]));
    var data ={
      labels : emotions,//emotions txt
      datasets : [
      {
        label : "Emotion",
        data : values, //current emotion
        backgroundColor: ['#EDAF17', '#E263B1', '#244D9C', '#DA3011', '#3C982A', '#3CDBBF', '#8140A7'],
        borderRadius : 5,        
      }
      ]      
    }


    async function getTodaysLog(currentUserId) {
      try {
        var response = await fetch('http://localhost:3000/lastSevenDays?userId='+currentUserId)// i need to send the userId with it
        var dataFromDb = await response.json();
        setData(dataFromDb)
        return dataFromDb;
      }
      catch (error){
        console.log(error);
        
      }
     }

     async function getCurrentEmotion(currentUserId) {
      try {
        var response = await fetch('http://localhost:3000/currentEmotion?userId='+currentUserId)// i need to send the userId with it
        var dbData = await response.json();
        console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(dbData);
        
        setEmotion(dbData[0].mood)
        return dbData;
      }
      catch (error){
        console.log(error);
        
      }
     }


    return (
      <>
        <Header userUniqueId={currentUserId} setUserId={null} loginBtn={null} backTo={'features'} obj={{state: {findEmo: emotionNow, idOfUser: currentUserId}}}/>
        <div className="statsCorner">
          <div className="forCurrentEmotion">
              <p className="textAlignCenter">Current Emotion</p>
              <img src={emotionNow+".png"} alt={emotionNow} className="emojiInStats" />
              {emotionNow? <p className="textAlignCenter">{emotionNow.toUpperCase()}</p>:null}
              
          </div>
        
          <div className="staticsContiner">
            <div className="chartPrnt">
              <div className='barChart forThisWeek'>
                <Bar 
                data={data}
                options={options} 
                height={500}
                width={400}
                ></Bar>
                
              </div>
            </div>
            <TodaysMood></TodaysMood>
          </div>

        </div>
        
      </>
      
    )
  }
  
  export default PastSevenDays;
  