import { useLocation } from "react-router-dom";
import "../Home.css";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import { useRef } from "react";
import Food from "./Food";
import Food2 from "./Food2";

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
    console.log(data);
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
    var srcId;
    var idValue;

    useEffect(() => {
        takeFood(data.idOfFood).then(res => setSingleFood(res));
    }, [])

    return (
        <div className="foodOuter2">
            <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'food'} obj={{ state: { emo: data.emo1, idOfUser: userId } }} />
            {(isSingleFood != null) ?
                <div className="foodOuter">
                    <div className="foodOuter1">
                        <div className="newImage" style={{backgroundImage: "url(" + isSingleFood.meals[0].strMealThumb+")"}}>
                            {isSingleFood.meals[0].strMeal}</div>
                        <div className="aboutFood">
                            <div className="singleFoodIngrediants">
                                <p className="singleFoodHeading">Ingrediants</p>
                                <ul>
                                    {ingreData.map((_, index) => {
                                        srcId = isSingleFood.meals[0].strYoutube;
                                        idValue = srcId.split("=");
                                        console.log(idValue, idValue[1])
                                        let value1 = 'strIngredient' + (index + 1)
                                        console.log(value1);
                                        let value = isSingleFood.meals[0][value1];
                                        ((value != "") || (value != null)) ? ingreArr.push(value) : null
                                    })}
                                    {console.log(ingreArr.filter(item => ((item != "") && (item != null) && (item.length != 0))))}
                                    {(ingreArr.filter(item => ((item != "") && (item != null) && (item.length != 0)))
                                        .map(item => {
                                            { console.log(item) }
                                            return (
                                                <li className="ingreValues">{item}</li>
                                            )
                                        }))}
                                </ul>
                            </div>
                            <div className="empty"></div>
                            <div className="singleFoodInstruction">
                                <p className="singleFoodHeading">Instruction</p>
                                <ol ref={foodDescription}>{
                                    ((isSingleFood.meals[0].strInstructions).split("\n")).map((splitVal, index) => {
                                        return(
                                            (splitVal != "\r") ? (
                                                <li>{splitVal}</li>
                                            ):null
                                        )
                                    })
                                }
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="video">
                        <div className="otherFoods">
                            <p className="otherFoodHead">Other Foods</p>
                            <div className="others">
                                <Food2 data={data.emo1} iddata={userId}/>
                            </div>
                        </div>
                        <div className="iframeVideo">
                            {console.log(idValue[1])}
                            <iframe  width="560" height="315" src={"https://www.youtube.com/embed/"+idValue[1]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen className="videoSrc"></iframe>
                        </div>
                    </div>
                </div>

                :  <div className="animation flex">
                <div className="balls" id="circleOne"></div>
                <div className="balls" id="circleTwo"></div>
                <div className="balls" id="circleThree"></div>
            </div>}
        </div>

    )
}

export default SingleRecipe;












// import { useLocation } from "react-router-dom";
// import "../Home.css";
// import { FaLeftLong } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Header from "./Header";
// import { useRef } from "react";

// async function takeFood(idOfFood) {
//     try {
//         let response = await fetch("http://localhost:3000/singleFoodDetail", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 id: idOfFood,
//             })
//         });
//         var resData = response.json();
//         var resData1 = await resData.then();
//         console.log(resData1);
//         return resData1;
//     } catch (err) {
//         console.log(err);
//     }
// }

// function SingleRecipe() {
//     const location = useLocation();
//     const data = (location.state);
//     console.log(data.idOfFood);
//     console.log(data.emo1)
//     const userId = data.idOfUser;
//     const ingreData = Array.from({ length: 12 })
//     const foodDescription = useRef();

//     const navigate = useNavigate();
//     const [isSingleFood, setSingleFood] = useState(null);
//     const [isIngre, setIngre] = useState("");
//     const ingreArr = [];
//     let datas;

//     useEffect(() => {
//         takeFood(data.idOfFood).then(res => setSingleFood(res));
//     }, [])

//     return (
//         <div className="singleFoodOuter">
//             <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'food'} obj={{ state: { emo: data.emo1, idOfUser: userId } }} />
//             {(isSingleFood != null) ?
//                 <div className="singleFoodContainer">
//                     <div className="foodName">
//                         {isSingleFood.meals[0].strMeal}</div>
//                     <div className="foodImg">
//                         <img src={isSingleFood.meals[0].strMealThumb} className="setImg" />
//                     </div>
//                     <div className="ingrediants">
//                         <p className="ingreHead">Ingredients</p>
//                         {ingreData.map((_, index) => {
//                             let value1 = 'strIngredient' + (index + 1)
//                             console.log(value1);
//                             let value = isSingleFood.meals[0][value1];
//                             ((value != "") || (value != null))?ingreArr.push(value):null
//                         })}
//                         {console.log(ingreArr.filter(item => ((item != "") && (item != null) && (item.length != 0))))}
//                         {(ingreArr.filter(item => ((item != "") && (item != null) && (item.length != 0)))
//                         .map(item => {
//                             {console.log(item)}
//                             return(
//                                 <li className="ingreValues">{item}</li>
//                             )
//                         }))}
//                     </div>
//                     <div className="instruction">
//                         <p className="instruHead">Instructions</p>
//                         <ol ref={foodDescription}>{
//                             ((isSingleFood.meals[0].strInstructions).split("\n")).map((splitVal, index) => {
//                                 return <li>{splitVal}</li>
//                             })
//                         }
//                         </ol>
//                     </div>
//                 </div>
//                 : <div class="loader">
//                     <span></span>
//                     <span></span>
//                     <span></span>
//                 </div>}
//         </div>

//     )
// }

// export default SingleRecipe;
