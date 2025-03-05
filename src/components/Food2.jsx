import "../Home.css"
import { useEffect, useRef, useState } from "react";
let count = 0;
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import Header from "./Header";

async function foodSet() {
    try {
        let response = await fetch("http://localhost:3000/food");
        var resData = response.json();
        var resData1 = await resData.then();
        console.log(resData1);
        return resData1;
    } catch (err) {
        console.log(err);
    }
}

function Food2({ data, iddata }) {
    console.log(data, iddata);
    const navigate = useNavigate();
    const keyOfBtn = useRef();

    const [isFood, setFood] = useState(null);

    const smallDivs = Array.from({ length: 40 });
    console.log(smallDivs.length)

    useEffect(() => {
        foodSet().then(res => setFood(res));
    }, [])

    return (
        <div className="insertFood">
            {(isFood != null) ? isFood.map((setOfFood, index) => {
                { console.log(setOfFood) }
                return <div className="newFoodContainer">
                    <div className="circle"
                        style={{ background: "url(" + isFood[index].meals[0].strMealThumb + ")", backgroundSize: "100% 100%" }}>
                    </div>
                    <div className="newFoodName1">
                        <p className="newRecepieName">{isFood[index].meals[0].strMeal}</p>
                        <p className="newDescription">Area : {isFood[index].meals[0].strArea}<br />Category <b>: </b>{isFood[index].meals[0].strCategory}</p>
                        <button className="infoBt" key={index} ref={keyOfBtn} onClick={(e) => {
                            if(count == 0){
                                navigate("/singleFood", { state: { idOfFood: isFood[index].meals[0].idMeal, emo1: data, idOfUser: iddata } });
                                console.log(isFood[index].meals[0]);
                                count++;
                                window.location.reload();
                            }
                            
                        }}>More Info</button>
                    </div>
                </div>
            }) : <div className="animation flex">
                <div className="balls" id="circleOne"></div>
                <div className="balls" id="circleTwo"></div>
                <div className="balls" id="circleThree"></div>
            </div>
            }
        </div>
    )
}

export default Food2;