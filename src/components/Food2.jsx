import "../Home.css"
import { useEffect, useState } from "react";
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
                        <button className="infoBt" key={index} onClick={(e) => {
                            window.location.reload();
                            navigate("/singleFood", { state: { idOfFood: isFood[index].meals[0].idMeal, emo1: data, idOfUser: iddata } });
                            console.log(isFood[index].meals[0]);
                        }}>More Info</button>
                    </div>
                </div>
            }) : <div class="animation flex">
                <div class="balls" id="circleOne"></div>
                <div class="balls" id="circleTwo"></div>
                <div class="balls" id="circleThree"></div>
            </div>
            }
        </div>
    )
}

export default Food2;