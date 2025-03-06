import "../Config.css";
import { useState } from "react";

function Config(){

    const[index, setIndex] = useState(0);

    const features = ["Music", "Story", "Quotes", "Exercise", "Food", "Games", "Writing Journel", "Movie"];
    const emotion = ["Happy", "Sad", "Angry", "Neturel"]

    function next(){
        if(index != emotion.length){
            setIndex((prevInx) => prevInx+1);
            question();
        }
    }

    function question(){
        if(index != emotion.length){
            return(
            <div className="config">
                <div className="happy">
                    <label htmlFor="happy" className="question">{index+1}. If you have {emotion[index]} What will you do?</label>
                    
                    <div className="emotion1">
                        <input type="checkbox" value={features[0]}></input>
                        <label htmlFor="option1">{features[0]}</label>
                    </div>
                    
                    <div className="emotion2">
                        <input type="checkbox" value={features[1]}></input>
                        <label htmlFor="option1">{features[1]}</label>
                    </div>
                    
                    <div className="emotion2">
                        <input type="checkbox" value={features[2]}></input>
                        <label htmlFor="option1">{features[2]}</label>
                    </div>
                    
                    <div className="emotion2">
                        <input type="checkbox" value={features[3]}></input>
                        <label htmlFor="option1">{features[3]}</label>
                    </div>

                    <div className="emotion2">
                        <input type="checkbox" value={features[4]}></input>
                        <label htmlFor="option1">{features[4]}</label>
                    </div>
                    
                    <div className="emotion2">
                        <input type="checkbox" value={features[5]}></input>
                        <label htmlFor="option1">{features[5]}</label>
                    </div>
                    
                    <div className="emotion2">
                        <input type="checkbox" value={features[6]}></input>
                        <label htmlFor="option1">{features[6]}</label>
                    </div>

                    <div className="emotion2">
                        <input type="checkbox" value={features[7]}></input>
                        <label htmlFor="option1">{features[7]}</label>
                    </div>
                </div>
            </div>
        
        )
        }
    }

    return(
        <div className="configOuter">
            <h1>Details</h1>
            {question()}
            <button onClick={next} className="CnextBtn">Next</button>
        </div>
    )
}

export default Config;
