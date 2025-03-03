import { Chart as ChartJS} from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { useNavigate,useLocation } from "react-router-dom";
import Header from "./Header";

function randomColorPicker() {
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`
  }

async function sevenDaysDataGetter() {
  await fetch('http://localhost:3000/lastSevenDays&userId='+userId);
}
  
  function PastSevenDays() {
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
      labels : ['12:01','11:30','10:43','9:54'],//Date
      datasets : [
      {
        label : "Emotion",
        data : [100,200,100], //emotion values
        borderRadius : 5,
        backgroundColor : [randomColorPicker(), randomColorPicker(), randomColorPicker()]
        
      }
      ]
      
    }

  
  
    return (
      <>
        <div className='barChart'>
          <Bar 
          data={data}
          options={options} ></Bar>
        </div>
      </>
    )
  }
  
  export default PastSevenDays;
  