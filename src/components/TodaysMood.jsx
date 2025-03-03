import { Chart as ChartJS} from "chart.js/auto";
import { Pie } from 'react-chartjs-2';
import { useNavigate,useLocation } from "react-router-dom";
import Header from "./Header";

function randomColorPicker() {
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`
  }

  async function getTodaysLog(params) {
    let now = new Date();
    let dateAndTime = (now.toLocaleString()).split(",");
    let todaysDate = dateAndTime[0];
    console.log(dateAndTime,todaysDate);
    var dateFormated = todaysDate.slice(6)+"/"+todaysDate.slice(3,5)+"/"+todaysDate.slice(0,2);
    var response = await fetch('http://localhost:3000/todaysLog&today='+dateFormated,)
  }
  
  function TodaysMood() {
    // const [count, setCount] = useState(0)
    const location = useLocation();
    const dataFromSender = location.state;

    console.log(dataFromSender);
    
    


    
  
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Emotions by time', 
          color: 'white'
        },
      },
    };

    var data ={
      labels : ['12:01','11:30','10:43','9:54'],
      datasets : [
      {
        label : "Emotion",
        data : [100,200,100],
        borderRadius : 5,
        backgroundColor : [randomColorPicker(), randomColorPicker(), randomColorPicker()]
        
      }
      ]
      
    }

  
  
    return (
      <>
        <div className='barChart'>
          <Pie 
          data={data}
          options={options} ></Pie>
        </div>
      </>
    )
  }
  
  export default TodaysMood
  