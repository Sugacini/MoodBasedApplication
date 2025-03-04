import { Chart as ChartJS} from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import Header from "./Header";
import { useAppContext } from "../ForContext";
import { useEffect, useState } from "react";

var userIdForStatic;


  function TodaysMood() {  
    
    
    // const [count, setCount] = useState(0)
    const {userIdContext,currentEmotion} = useAppContext();
    console.log(currentEmotion);
    
    // console.log(userIdContext);
    if (userIdContext) {
      userIdForStatic= userIdContext;
    }

    var emotions = [ 'happy', 'neutral', 'sad', 'angry', 'disgust', 'surprised', 'fearful' ];

    var [dataFromDb,setData]=useState(null);
    var emotionWithTimes={};
    
    useEffect(()=>{
      getTodaysLog(userIdContext).then((res=>setData(res)))
    },[])
    
    console.log(dataFromDb);
    if (dataFromDb) {
      dataFromDb.map((val)=>{
        if (emotionWithTimes[val.mood]) {
          
          emotionWithTimes[val.mood]+=1
        }
        else{
          emotionWithTimes[val.mood]=1
        }
      })
  
      console.log(emotionWithTimes);
    }
    
    
    

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Today's Emotions", 
          color: 'black',
          align: 'center',
          padding:{
            left:-500
          }
        },
        legend: {
          position: 'right',
          labels: {
            color: 'black',
            padding:30,
            font:{
              size:20
            }
          },
        }
      },
      
    };

    var values= [];
    emotions.forEach((val)=>values.push(emotionWithTimes[val]));
    console.log(values);

    console.log('neutral :   .........' ,emotionWithTimes.neutral);
    console.log('happy :   .........' ,emotionWithTimes.happy);
    
    

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


    async function getTodaysLog(userIdContext) {
      try {
        let now = new Date();
        let dateAndTime = (now.toLocaleString()).split(",");
        let todaysDate = dateAndTime[0];
        console.log(dateAndTime,todaysDate);
        var dateFormated = todaysDate.slice(6)+"/"+todaysDate.slice(3,5)+"/"+todaysDate.slice(0,2);
        console.log(userIdContext, dateFormated);
        
        var response = await fetch('http://localhost:3000/todaysLog?userId='+userIdContext+'&date='+dateFormated)// i need to send the userId with it
        var dataFromDb = await response.json();
        setData(dataFromDb)
        return dataFromDb;
      }
      catch (error){
        console.log(error);
        
      }
     }


    return (
      <>
        <Header userUniqueId={userIdContext} setUserId={null} loginBtn={null} backTo={'features'} obj={{state: {findEmo: currentEmotion, idOfUser: userIdContext}}}/>
        <div className="chartPrnt">

        <div className='barChart'>
          <Doughnut 
          data={data}
          options={options} ></Doughnut>
        </div>
        </div>
      </>
      
    )
  }
  
  export default TodaysMood;
  