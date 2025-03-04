import Food1 from "./Food1";
import Food2 from "./Food2";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Food() {

  const location = useLocation();
  const data = location.state;
  console.log(data);
  const data1 = data.emo;
  const userId = data.idOfUser;
  const [isEmo, setEmo] = useState(data1);
  const [isId, setId] = useState(userId);
  console.log(data1);
  var qutoesData = null;
  return (
    <>
      <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={"features"} obj={{ state: { findEmo: data1, idOfUser: userId } }} />
      <div className="newFoodOuter">
        <Food1 data={isEmo} />
        <Food2 data={isEmo} iddata={isId} />
      </div>
    </>

  )
}

export default Food;







// import "../Home.css"
// import { useEffect, useState } from "react";
// let count = 0;
// import { useNavigate } from "react-router-dom";
// import { FaLeftLong } from "react-icons/fa6";
// import { useLocation } from "react-router-dom";
// import Header from "./Header";


// async function foodSet() {
//   try {
//     let response = await fetch("http://localhost:3000/food");
//     var resData = response.json();
//     var resData1 = await resData.then();
//     console.log(resData1);
//     return resData1;
//   } catch (err) {
//     console.log(err);
//   }
// }

// function Food() {

// const navigate = useNavigate();

// const [isFood, setFood] = useState(null);
// const [isFoodName, setFoodName] = useState("");
// const [recipe, setRecipe] = useState([]);

// const smallDivs = Array.from({ length: 40 });
// console.log(smallDivs.length)

// const location = useLocation();
// const data = location.state;
// const data1 = data.emo;
// const userId = data.idOfUser;
// console.log(data1);
// var qutoesData = null;
// const foodQuotes = {
//   happy: ['"Good food is all the sweeter when shared with good friends"', '"Good food, good mood, that is the perfect recipe for life"', '"The happiest moments are those shared over a delicious meal"', '"Happiness is homemade and served on a plate"'],
//   angry: ['"Hunger and anger are both powerful, but food is the one that silences them"', '"Sometimes, food is the only thing that understands your anger"', '"In moments of anger, food is the one thing that can silence the storm."', '"Even in anger, peace comes with the first bite of your favorite dish."'],
//   sad: ['"When you are feeling down, food has a way of reminding you that not all is lost"', '"In times of sadness, a warm meal is a gentle reminder that comfort still exists"', '"When you are feeling low, food is a small piece of joy you can hold on to"', '"A sad heart is often soothed by the simplest of meals"'],
//   surprised: ['"The best meals are often the ones that surprise you"', '"Food has the power to surprise and delight in the most unexpected ways"', '"The best meals are often the ones that surprise you"', '"Sometimes the most surprising ingredients create the best dishes"'],
//   neutral: ['"Food is symbolic of love when words are inadequate"', '"Life is uncertain. Eat dessert first"', '"There is no sincere love than the love of food"', '"Food for the body is not enough. There must be food for the soul"'],
//   fear: ['"In times of fear, food is a steady comfort that brings calm to the soul"', '"When fear takes over, food can be a small refuge of peace and comfort"', '"Food may not erase fear, but it can help soothe your heart, one bite at a time"', '"Fear may cloud your mind, but a simple meal can clear the path to peace"'],
//   disgusted: ['"Life is uncertain. Eat dessert first"', '"Happiness is... a well-cooked meal, no matter the day"', '"Sometimes the best memories are made from simple meals shared with loved ones"', '"Food brings people together, and there’s nothing better than sharing a meal with a friend or family"']
// }

// const key = Object.keys(foodQuotes);
// for (let i = 0; i < key.length; i++) {
//   if (data1 == key[i]) {
//     console.log(key[i]);
//     qutoesData = key[i];
//     console.log(qutoesData);
//     break;
//   }
// }

//   useEffect(() => {
//     foodSet().then(res => setFood(res));
//   }, [])

//   return (
//     <>
//       <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={"features"} obj={{ state: { findEmo: data1, idOfUser: userId } }} />

//       <div className="recipeOuter">

//         <div className="recipes">
//           <div className="foodHead">
//             <div className="foodHead1">
//               <p className="foodQuo">
//                 {(qutoesData != null) ? foodQuotes[qutoesData][Math.floor(Math.random() * 4)] : null}
//               </p>
//             </div>
//           </div>
//           <div className="insertFood">
//             {(isFood != null) ? isFood.map((setOfFood, index) => {
//               { console.log(setOfFood) }
//               return <div className="newFoodContainer">
//                   <div className="circle"
//                     style={{background:"url(" + isFood[index].meals[0].strMealThumb + ")" , backgroundSize: "100% 100%"}}>
//                   </div>
//                   <div className="newFoodName1">
//                     <p className="newRecepieName">{isFood[index].meals[0].strMeal}</p>
//                     <p className="newDescription">Area : {isFood[index].meals[0].strArea}<br/>Category <b>: </b>{isFood[index].meals[0].strCategory}</p>
//                       <button className="infoBt" key={index} onClick={(e) => {
//                             navigate("/singleFood", {state: {idOfFood: isFood[index].meals[0].idMeal, emo1: data1, idOfUser: userId}});
//                             console.log(isFood[index].meals[0]);
//                       }}>More Info</button>
//                     </div>
//                     </div>
//                     }) : <div className="loader">
//                       <span></span>
//                       <span></span>
//                       <span></span>
//                       {/* <p>Loading</p> */}
//                     </div>
//             }
//                   </div>
//                 </div>
//       </div>
//         </>
//         )
// }
// export default Food;








// {smallDivs.map((_, index) => (
//   <div key={index} className="smallDiv" onClick={(e) => {
//       for(let i=0; i<smallDivs.length; i++){
//           if(e.target.id == i){
//               navigate("/singleFood", {state: {name: mealsFood[i].strMeal, image: mealsFood[i].strMealThumb, description:mealsFood[i].strMealDescription}});
//               console.log(mealsFood[i]);
//               break;
//           }
//       }
//       console.log(e.target.id)
//       }}>
//       <img src={mealsFood[index].strMealThumb} className="recipeImg" id={index}></img>
//       <div className="recipeName">{mealsFood[index].strMeal}</div>
//   </div>
// ))}




// return <div className="newFood">
//   <div className="newFoodImageName" key={index} onClick={(e) => {
//     for(let i=0; i<isFood.length; i++){
//       if(e.target.id == i){
//           navigate("/singleFood", {state: {idOfFood: isFood[i].meals[0].idMeal, emo1: data1, idOfUser: userId}});
//           console.log(isFood[i].meals[0])
//           break;
//       }
//     }
//   }}>
//     <div className="newFoodImage" style={{background:"url(" + isFood[index].meals[0].strMealThumb + ")" , backgroundSize: "100% 100%"}}>
//       <div className="newFoodName">{isFood[index].meals[0].strMeal}</div>
//     </div>
//   </div>
// </div>
//   return <div key={index} className="smallDiv" onClick={(e) => {
// for(let i=0; i<isFood.length; i++){
//     if(e.target.id == i){
//         navigate("/singleFood", {state: {idOfFood: isFood[i].meals[0].idMeal, emo1: data1, idOfUser: userId}});
//         console.log(isFood[i].meals[0])
//         break;
//     }
//     }
//     console.log(e.target.id)
//     }}>
//     <img src={isFood[index].meals[0].strMealThumb} className="recipeImg" id={index}></img>
//     <div className="recipeName">{isFood[index].meals[0].strMeal}</div>
// </div>