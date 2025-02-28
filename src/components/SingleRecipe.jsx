import { useLocation } from "react-router-dom";
import "../Home.css";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import { useRef } from "react";

async function takeFood(idOfFood) {
    try {
        let response = await fetch("http://localhost:3000/singleFoodDetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idOfFood,
            })
        });
        var resData = response.json();
        var resData1 = await resData.then();
        console.log(resData1);
        return resData1;
    } catch (err) {
        console.log(err);
    }
}

function SingleRecipe() {
    const location = useLocation();
    const data = (location.state);
    console.log(data.idOfFood);
    console.log(data.emo1)
    const userId = data.idOfUser;
    const ingreData = Array.from({ length: 12 })
    const foodDescription = useRef();

    const navigate = useNavigate();
    const [isSingleFood, setSingleFood] = useState(null);
    const [isIngre, setIngre] = useState("");
    const ingreArr = [];
    let datas;

    useEffect(() => {
        takeFood(data.idOfFood).then(res => setSingleFood(res));
    }, [])

    return (
        <div className="singleFoodOuter">
            <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'food'} obj={{ state: { emo: data.emo1, idOfUser: userId } }} />
            {(isSingleFood != null) ?
                <div className="singleFoodContainer">
                    <div className="foodName">
                        {isSingleFood.meals[0].strMeal}</div>
                    <div className="foodImg">
                        <img src={isSingleFood.meals[0].strMealThumb} className="setImg" />
                    </div>
                    <div className="ingrediants">
                        <p className="ingreHead">Ingredients</p>
                        {ingreData.map((_, index) => {
                            let value1 = 'strIngredient' + (index + 1)
                            console.log(value1);
                            let value = isSingleFood.meals[0][value1];
                            ((value != "") || (value != null))?ingreArr.push(value):null
                        })}
                        {console.log(ingreArr.filter(item => ((item != "") && (item != null) && (item.length != 0))))}
                        {(ingreArr.filter(item => ((item != "") && (item != null) && (item.length != 0)))
                        .map(item => {
                            {console.log(item)}
                            return(
                                <li className="ingreValues">{item}</li>
                            )
                        }))}
                    </div>
                    <div className="instruction">
                        <p className="instruHead">Instructions</p>
                        <ol ref={foodDescription}>{
                            ((isSingleFood.meals[0].strInstructions).split("\n")).map((splitVal, index) => {
                                return <li>{splitVal}</li>
                            })
                        }
                        </ol>
                    </div>
                </div>
                : <div class="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>}
        </div>

    )
}

export default SingleRecipe;
