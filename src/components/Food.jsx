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

function Food() {

  const navigate = useNavigate();

  const [isFood, setFood] = useState(null);
  const [isFoodName, setFoodName] = useState("");
  const [recipe, setRecipe] = useState([]);

  const smallDivs = Array.from({ length: 40 });
  console.log(smallDivs.length)

  const location = useLocation();
  const data = location.state;
  // let data1;
  // var data1 = "";
  // if(data != null){
  const data1 = data.emo;
  const userId = data.idOfUser;
  console.log(data1);
  var qutoesData = null;
  // }
  const foodQuotes = {
    happy: ['"Good food is all the sweeter when shared with good friends"', '"Good food, good mood, that is the perfect recipe for life"', '"The happiest moments are those shared over a delicious meal"', '"Happiness is homemade and served on a plate"'],
    angry: ['"Hunger and anger are both powerful, but food is the one that silences them"', '"Sometimes, food is the only thing that understands your anger"', '"In moments of anger, food is the one thing that can silence the storm."', '"Even in anger, peace comes with the first bite of your favorite dish."'],
    sad: ['"When you are feeling down, food has a way of reminding you that not all is lost"', '"In times of sadness, a warm meal is a gentle reminder that comfort still exists"', '"When you are feeling low, food is a small piece of joy you can hold on to"', '"A sad heart is often soothed by the simplest of meals"'],
    surprised: ['"The best meals are often the ones that surprise you"', '"Food has the power to surprise and delight in the most unexpected ways"', '"The best meals are often the ones that surprise you"', '"Sometimes the most surprising ingredients create the best dishes"'],
    neutral: ['"Food is symbolic of love when words are inadequate"', '"Life is uncertain. Eat dessert first"', '"There is no sincere love than the love of food"', '"Food for the body is not enough. There must be food for the soul"'],
    fear: ['"In times of fear, food is a steady comfort that brings calm to the soul"', '"When fear takes over, food can be a small refuge of peace and comfort"', '"Food may not erase fear, but it can help soothe your heart, one bite at a time"', '"Fear may cloud your mind, but a simple meal can clear the path to peace"'],
    disgusted: ['"Life is uncertain. Eat dessert first"', '"Happiness is... a well-cooked meal, no matter the day"', '"Sometimes the best memories are made from simple meals shared with loved ones"', '"Food brings people together, and there’s nothing better than sharing a meal with a friend or family"']
  }

  const key = Object.keys(foodQuotes);
  for (let i = 0; i < key.length; i++) {
    if (data1 == key[i]) {
      console.log(key[i]);
      qutoesData = key[i];
      console.log(qutoesData);
      break;
    }
  }

  useEffect(() => {
    foodSet().then(res => setFood(res));
  }, [])

  return (
    <>
      <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={"features"} obj={{ state: { findEmo: data1, idOfUser: userId } }} />

      <div className="recipeOuter">

        <div className="recipes">
          <div className="foodHead">
            <div className="foodHead1">
              <p className="foodQuo">
                {(qutoesData != null) ? foodQuotes[qutoesData][Math.floor(Math.random() * 4)] : null}
              </p>
            </div>
          </div>
          <div className="insertFood">
            {(isFood != null) ? isFood.map((setOfFood, index) => {
              { console.log(setOfFood) }
              return <div className="newFoodContainer">
                  <div className="circle"
                    style={{background:"url(" + isFood[index].meals[0].strMealThumb + ")" , backgroundSize: "100% 100%"}}>
                  </div>
                  <div className="newFoodName1">
                    <p className="newRecepieName">{isFood[index].meals[0].strMeal}</p>
                    <p className="newDescription">Area : {isFood[index].meals[0].strArea}<br/>Category <b>: </b>{isFood[index].meals[0].strCategory}</p>
                      <button className="infoBt" key={index} onClick={(e) => {
                        for(let i=0; i<isFood.length; i++){
                          if(e.target.id == i){
                            navigate("/singleFood", {state: {idOfFood: isFood[i].meals[0].idMeal, emo1: data1, idOfUser: userId}});
                            console.log(isFood[i].meals[0]);
                            break;
                          }
                        }
                      }}>More Info</button>
                    </div>
                    </div>


                    
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
                    }) : <div className="loader">
                      <span></span>
                      <span></span>
                      <span></span>
                      {/* <p>Loading</p> */}
                    </div>
            }
                  </div>
                </div>
      </div>
        </>
        )
}

        export default Food;
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


const mealsFood = [
            {
              "strMeal": "Baingan Bharta",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
              "idMeal": "52807",
              "strMealDescription": "Baingan Bharta is a traditional North Indian dish renowned for its smoky, flavorful profile. The term 'Baingan' translates to eggplant (also known as aubergine or brinjal), and 'Bharta' means mashed. This dish features fire-roasted eggplant mashed and cooked with aromatic spices, onions, and tomatoes.",
            },
            {
              "strMeal": "Bread omelette",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg",
              "idMeal": "53076",
              "strMealDescription": "Bread omelette is a quick and flavorful dish made by cooking spiced eggs and bread together. The bread absorbs the egg mixture, creating a crispy and savory texture. It is a popular breakfast or snack, often served with ketchup or chutney.",
            },
            {
              "strMeal": "Chicken Handi",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
              "idMeal": "52795",
              "strMealDescription": "Chicken Handi is a rich and creamy North Indian dish cooked in a traditional clay pot (handi). It features tender chicken simmered in a spiced tomato-based gravy with cream and yogurt. The dish is known for its smoky aroma and velvety texture, making it a flavorful delicacy."
            },
            {
              "strMeal": "Dal fry",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
              "idMeal": "52785",
              "strMealDescription": "Dal Fry is a popular Indian dish made by cooking lentils with onions, tomatoes, and aromatic spices. It is tempered with ghee, garlic, and cumin for a rich and flavorful taste. Served with rice or roti, it is a comforting and hearty meal."
            },
            {
              "strMeal": "Kidney Bean Curry",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg",
              "idMeal": "52868",
              "strMealDescription": "Kidney Bean Curry, also known as Rajma, is a hearty North Indian dish made with red kidney beans simmered in a spiced tomato-onion gravy. It is slow-cooked to enhance the flavors and create a rich, thick texture. Usually served with rice, it is a comforting and nutritious meal.",
            },
            {
              "strMeal": "Lamb Biryani",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
              "idMeal": "52805",
              "strmealDescription": "Lamb Biryani is a fragrant and flavorful rice dish made with marinated lamb, aromatic spices, and basmati rice. The lamb is slow-cooked until tender, then layered with saffron-infused rice and cooked using the dum (steam) method. This dish is rich, aromatic, and often served with raita or salad."
            },
            {
              "strMeal": "Lamb Rogan josh",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/vvstvq1487342592.jpg",
              "idMeal": "52808",
              "strMealDescription": "Lamb Rogan Josh is a classic Kashmiri dish made with tender lamb slow-cooked in a rich, aromatic gravy. It features a blend of yogurt, tomatoes, and warm spices like cardamom, cinnamon, and Kashmiri red chili. This dish is known for its deep red color and flavorful, mildly spicy taste."
            },
            {
              "strMeal": "Matar Paneer",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
              "idMeal": "52865",
              "strmealDescription": "Matar Paneer is a popular North Indian dish made with soft paneer (Indian cottage cheese) and green peas cooked in a spiced tomato-based gravy. It has a rich, creamy texture with a mildly sweet and tangy flavor. Often served with rice or roti, it is a comforting and flavorful vegetarian meal.",
            },
            {
              "strMeal": "Nutty Chicken Curry",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/yxsurp1511304301.jpg",
              "idMeal": "52851",
              "strmealDescription": "Nutty Chicken Curry is a rich and creamy dish made with tender chicken cooked in a flavorful gravy of blended nuts like cashews, almonds, and coconut. It has a mildly sweet and nutty taste, balanced with aromatic spices. This dish is best enjoyed with naan or fragrant basmati rice."
            },
            {
              "strMeal": "Recheado Masala Fish",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg",
              "idMeal": "52809",
              "strMealDescription": "Recheado Masala Fish is a spicy and tangy Goan dish made by marinating fish with a recheado masala paste. The paste is a blend of red chilies, vinegar, garlic, and spices, giving the dish a bold and zesty flavor. The marinated fish is then pan-fried until crispy and flavorful."
            },
            {
              "strMeal": "Smoked Haddock Kedgeree",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/1550441275.jpg",
              "idMeal": "52964",
              "strMealDescription": "Smoked Haddock Kedgeree is a flavorful British-Indian dish made with flaked smoked haddock, spiced rice, and boiled eggs. It is cooked with mild curry spices, butter, and fresh herbs for a rich yet delicate taste. Traditionally served for breakfast, it also makes a comforting meal any time of the day."
            },
            {
              "strMeal": "Tandoori chicken",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg",
              "idMeal": "52806",
              "strMealDescription": "Tandoori Chicken is a popular Indian dish made by marinating chicken in yogurt, lemon juice, and aromatic spices like cumin, coriander, and garam masala. The chicken is then cooked in a tandoor (clay oven) or grilled for a smoky, charred flavor. It is served with naan, chutney, or salad."
            },
            {
              "idMeal": "1",
              "strMeal": "Beef",
              "strMealThumb": "https://www.themealdb.com/images/category/beef.png",
              "strMealDescription": "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]"
            },
            {
              "idMeal": "2",
              "strMeal": "Chicken",
              "strMealThumb": "https://www.themealdb.com/images/category/chicken.png",
              "strMealDescription": "Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets."
            },
            {
              "idMeal": "3",
              "strMeal": "Dessert",
              "strMealThumb": "https://www.themealdb.com/images/category/dessert.png",
              "strMealDescription": "Dessert is a course that concludes a meal. The course usually consists of sweet foods, such as confections dishes or fruit, and possibly a beverage such as dessert wine or liqueur, however in the United States it may include coffee, cheeses, nuts, or other savory items regarded as a separate course elsewhere."
            },
            {
              "idMeal": "4",
              "strMeal": "Lamb",
              "strMealThumb": "https://www.themealdb.com/images/category/lamb.png",
              "strMealDescription": "Lamb, hogget, and mutton are the meat of domestic sheep (species Ovis aries) at different ages.\r\n\r\nA sheep in its first year is called a lamb, and its meat is also called lamb. The meat of a juvenile sheep older than one year is hogget; outside the USA this is also a term for the living animal."
            },
            {
              "idMeal": "5",
              "strMeal": "Miscellaneous",
              "strMealThumb": "https://www.themealdb.com/images/category/miscellaneous.png",
              "strMealDescription": "General foods that don't fit into another category"
            },
            {
              "idMeal": "6",
              "strMeal": "Pasta",
              "strMealThumb": "https://www.themealdb.com/images/category/pasta.png",
              "strMealDescription": "Pasta is a staple food of traditional Italian cuisine, with the first reference dating to 1154 in Sicily.\r\n\r\nAlso commonly used to refer to the variety of pasta dishes, pasta is typically a noodle made from an unleavened dough of a durum wheat flour mixed with water or eggs and formed into sheets or various shapes."
            },
            {
              "idMeal": "7",
              "strMeal": "Pork",
              "strMealThumb": "https://www.themealdb.com/images/category/pork.png",
              "strMealDescription": "Pork is the culinary name for meat from a domestic pig (Sus scrofa domesticus). It is the most commonly consumed meat worldwide,[1] with evidence of pig husbandry dating back to 5000 BC. Pork is eaten both freshly cooked and preserved. Curing extends the shelf life of the pork products. Ham, smoked pork, gammon."
            },
            {
              "idMeal": "8",
              "strMeal": "Seafood",
              "strMealThumb": "https://www.themealdb.com/images/category/seafood.png",
              "strMealDescription": "Seafood is any form of sea life regarded as food by humans. Seafood prominently includes fish and shellfish. Shellfish include various species of molluscs, crustaceans, and echinoderms. Historically, sea mammals such as whales and dolphins have been consumed as food, though that happens to a lesser extent in modern times."
            },
            {
              "idMeal": "9",
              "strMeal": "Side",
              "strMealThumb": "https://www.themealdb.com/images/category/side.png",
              "strMealDescription": "A side dish, sometimes referred to as a side order, side item, or simply a side, is a food item that accompanies the entrée or main course at a meal. Side dishes such as salad, potatoes and bread are commonly used with main courses throughout many countries of the western world. ."
            },
            {
              "idMeal": "10",
              "strMeal": "Starter",
              "strMealThumb": "https://www.themealdb.com/images/category/starter.png",
              "strMealDescription": "An entrée in modern French table service and that of much of the English-speaking world (apart from the United States and parts of Canada) is a dish served before the main course of a meal; it may be the first dish served, or it may follow a soup or other small dish or dishes."
            },
            {
              "idMeal": "11",
              "strMeal": "Vegan",
              "strMealThumb": "https://www.themealdb.com/images/category/vegan.png",
              "strMealDescription": "Veganism is both the practice of abstaining from the use of animal products, particularly in diet, and an associated philosophy that rejects the commodity status of animals.[b] A follower of either the diet or the philosophy is known as a vegan (pronounced /ˈviːɡən/ VEE-gən)."
            },
            {
              "idMeal": "12",
              "strMeal": "Vegetarian",
              "strMealThumb": "https://www.themealdb.com/images/category/vegetarian.png",
              "strMealDescription": "Vegetarianism is the practice of abstaining from the consumption of meat (red meat, poultry, seafood, and the flesh of any other animal), and may also include abstention from by-products of animal slaughter.\r\n\r\nVegetarianism may be adopted for various reasons. Many people object to eating meat out of respect for sentient life."
            },
            {
              "idMeal": "13",
              "strMeal": "Breakfast",
              "strMealThumb": "https://www.themealdb.com/images/category/breakfast.png",
              "strMealDescription": "Breakfast is the first meal of a day. The word in English refers to breaking the fasting period of the previous night. There is a strong likelihood for one or more \"typical\", or \"traditional\", breakfast menus to exist in most places, but their composition varies widely from place to place, and has varied over time."
            },
            {
              "idMeal": "14",
              "strMeal": "Goat",
              "strMealThumb": "https://www.themealdb.com/images/category/goat.png",
              "strMealDescription": "The domestic goat or simply goat (Capra aegagrus hircus) is a subspecies of C. aegagrus domesticated from the wild goat of Southwest Asia and Eastern Europe. The goat is a member of the animal family Bovidae and the subfamily Caprinae, meaning it is closely related to the sheep. There are over 300 distinct breeds of goat."
            },
            {
              "strMeal": "BeaverTails",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
              "idMeal": "52928",
              "strMealDescription": "BeaverTails are a popular Canadian pastry made from deep-fried dough stretched into the shape of a beaver’s tail. They are crispy on the outside, soft on the inside, and often topped with sugar, cinnamon, chocolate, or other sweet toppings. This treat is a favorite at fairs, winter festivals, and street vendors."
            },
            {
              "strMeal": "Breakfast Potatoes",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/1550441882.jpg",
              "idMeal": "52965",
              "strMealDescription": "Breakfast Potatoes are crispy, golden-brown potatoes pan-fried or roasted with onions, garlic, and spices. They are often seasoned with salt, pepper, and paprika for extra flavor. Served as a hearty side dish, they pair well with eggs, bacon, or toast."
            },
            {
              "strMeal": "Canadian Butter Tarts",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg",
              "idMeal": "52923",
              "strMealDescription": "Canadian Butter Tarts are classic pastries with a flaky crust filled with a rich, buttery, and caramel-like filling made of butter, sugar, and eggs. They can be enjoyed plain or with added raisins or nuts. These sweet treats are a beloved part of Canadian cuisine."
            },
            {
              "strMeal": "Montreal Smoked Meat",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/uttupv1511815050.jpg",
              "idMeal": "52927",
              "strMealDescription": "Montreal Smoked Meat is a famous Canadian deli specialty made from beef brisket that is cured, seasoned with a blend of spices, and smoked to perfection. It is typically served on rye bread with mustard, creating a flavorful and tender sandwich. This dish is a staple of Montreal's food scene."
            },
            {
              "strMeal": "Nanaimo Bars",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/vwuprt1511813703.jpg",
              "idMeal": "52924",
              "strMealDescription": "Nanaimo Bars are a no-bake Canadian dessert with three layers: a crumbly chocolate-coconut base, a creamy custard-flavored middle, and a rich chocolate topping. They are sweet, buttery, and slightly crunchy, making them a beloved treat across Canada."
            },
            {
              "strMeal": "Pate Chinois",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/yyrrxr1511816289.jpg",
              "idMeal": "52930",
              "strMealDescription": "Pâté Chinois is a French-Canadian shepherd’s pie made with layers of seasoned ground beef, creamed corn, and mashed potatoes. It is baked until golden and creamy, offering a comforting, hearty meal. Often served with ketchup or pickles, it is a staple of Quebecois cuisine."
            },
            {
              "strMeal": "Pouding chomeur",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/yqqqwu1511816912.jpg",
              "idMeal": "52932",
              "strMealDescription": "Pouding Chômeur is a classic Quebecois dessert made with a simple cake batter baked in a rich, hot syrup of caramelized sugar or maple syrup. As it bakes, the syrup soaks into the cake, creating a moist, pudding-like texture. This comforting dessert is sweet, rich, and perfect for maple lovers."
            },
            {
              "strMeal": "Poutine",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
              "idMeal": "52804",
              "strMealDescription": "Poutine is a classic Canadian dish made with crispy French fries topped with cheese curds and smothered in hot, savory gravy. The cheese curds soften slightly under the heat, creating a rich and gooey texture. This comforting dish is a beloved fast-food favorite across Canada."
            },
            {
              "strMeal": "Rappie Pie",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/ruwpww1511817242.jpg",
              "idMeal": "52933",
              "strMealDescription": "Rappie Pie is a traditional Acadian dish made from grated potatoes and meat, usually chicken or pork. The potatoes are squeezed to remove moisture, then mixed with broth and baked to form a thick, hearty casserole. It has a unique texture and is often served with butter or molasses."
            },
            {
              "strMeal": "Split Pea Soup",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/xxtsvx1511814083.jpg",
              "idMeal": "52925",
              "strMealDescription": "Split Pea Soup is a hearty and comforting dish made with dried split peas, vegetables, and often ham or bacon for added flavor. It is slow-cooked until thick and creamy, with a rich, savory taste. This classic soup is popular in many cuisines and is perfect for cold weather."
            },
            {
              "strMeal": "Sugar Pie",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/yrstur1511816601.jpg",
              "idMeal": "52931",
              "strMealDescription": "Sugar Pie is a classic Canadian dessert with a rich, caramel-like filling made from brown sugar, butter, and cream. Baked in a flaky pie crust, it has a smooth, custard-like texture and a deep, sweet flavor. This simple yet indulgent treat is especially popular in Quebec."
            },
            {
              "strMeal": "Timbits",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg",
              "idMeal": "52929",
              "strMealDescription": "Timbits are bite-sized donut holes popularized by the Canadian coffee chain Tim Hortons. They come in various flavors like honey dip, chocolate glazed, and sour cream. Soft and sweet, they are a favorite snack or treat enjoyed with coffee or tea."
            },
            {
              "strMeal": "Tourtiere",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/ytpstt1511814614.jpg",
              "idMeal": "52926",
              "strMealDescription": "Tourtière is a traditional French-Canadian meat pie made with a flaky, golden crust and a savory filling of ground pork, beef, or veal. It is seasoned with warm spices like cinnamon, cloves, and allspice for a rich, comforting flavor. Often served during the holidays, it pairs well with ketchup or chutney."
            },
            {
              "strMeal": "Chick-Fil-A Sandwich",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
              "idMeal": "53016",
              "strMealDescription": "The Chick-fil-A Sandwich is a classic fast-food sandwich featuring a crispy, seasoned chicken breast served on a buttered toasted bun. It is typically topped with pickles and can be enjoyed with optional sauces. Known for its juicy, flavorful chicken, it’s a popular choice for a simple yet delicious meal."
            },
            {
              "strMeal": "Chicken Couscous",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg",
              "idMeal": "52850",
              "strMealDescription": "Chicken Couscous is a light and flavorful dish made with tender chicken, fluffy couscous, and a mix of vegetables and aromatic spices. The chicken is often simmered with ingredients like garlic, cumin, and cinnamon for a rich taste. It’s a wholesome meal commonly served with a drizzle of olive oil or fresh herbs."
            },
            {
              "strMeal": "Chicken Fajita Mac and Cheese",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
              "idMeal": "52818",
              "strMealDescription": "Chicken Fajita Mac and Cheese is a creamy, cheesy pasta dish with bold fajita flavors. It combines tender chicken, sautéed bell peppers, and onions with macaroni in a spiced cheese sauce. This fusion dish offers a smoky, savory, and comforting twist on classic mac and cheese."
            },
            {
              "strMeal": "Chicken Ham and Leek Pie",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/xrrtss1511555269.jpg",
              "idMeal": "52875",
              "strMealDescription": "Chicken Ham and Leek Pie is a comforting savory dish made with tender chicken, smoky ham, and sautéed leeks in a creamy sauce. The filling is encased in a flaky, golden pastry crust. This hearty pie is perfect for a cozy meal, often served with mashed potatoes or greens."
            },
            {
              "strMeal": "Chicken Quinoa Greek Salad",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/k29viq1585565980.jpg",
              "idMeal": "53011",
              "strMealDescription": "Chicken Quinoa Greek Salad is a fresh and nutritious dish made with grilled chicken, quinoa, cherry tomatoes, cucumbers, red onions, and olives. It is tossed in a tangy lemon-olive oil dressing and topped with feta cheese. This light yet protein-packed salad is perfect for a healthy meal."
            },
            {
              "strMeal": "General Tso's Chicken",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/1529444113.jpg",
              "idMeal": "52951",
              "strMealDescription": "General Tso's Chicken is a popular Chinese-American dish featuring crispy, deep-fried chicken tossed in a sweet, tangy, and spicy sauce. The sauce is made with soy sauce, garlic, ginger, vinegar, and chili for a bold flavor. It is typically served with steamed rice and vegetables."
            },
            {
              "strMeal": "Honey Balsamic Chicken with Crispy Broccoli & Potatoes",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/kvbotn1581012881.jpg",
              "idMeal": "52993",
              "strMealDescription": "Honey Balsamic Chicken with Crispy Broccoli & Potatoes is a savory-sweet dish featuring tender chicken glazed with a honey balsamic sauce. It is served with roasted potatoes and crispy broccoli, which are seasoned and baked until golden brown. This balanced meal offers a mix of tangy, sweet, and roasted flavors."
            },
            {
              "strMeal": "Katsu Chicken curry",
              "strMealThumb": "https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg",
              "idMeal": "52820",
              "strMealDescription": "Katsu Chicken Curry is a Japanese dish featuring crispy, breaded chicken cutlet served with a rich and mildly spiced curry sauce. The curry is made with onions, carrots, and potatoes, creating a thick, flavorful gravy. It is typically served over steamed rice for a comforting meal."
            }
          ]
