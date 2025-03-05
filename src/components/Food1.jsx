function Food1({data}){
    console.log(data);
    var qutoesData = null;
  const foodQuotes = {
    happy: ['"Good food is all the sweeter when shared with good friends"', '"Good food, good mood, that is the perfect recipe for life"', '"The happiest moments are those shared over a delicious meal"', '"Happiness is homemade and served on a plate"'],
    angry: ['"Hunger and anger are both powerful, but food is the one that silences them"', '"Sometimes, food is the only thing that understands your anger"', '"In moments of anger, food is the one thing that can silence the storm."', '"Even in anger, peace comes with the first bite of your favorite dish."'],
    sad: ['"When you are feeling down, food has a way of reminding you that not all is lost"', '"In times of sadness, a warm meal is a gentle reminder that comfort still exists"', '"When you are feeling low, food is a small piece of joy you can hold on to"', '"A sad heart is often soothed by the simplest of meals"'],
    surprised: ['"The best meals are often the ones that surprise you"', '"Food has the power to surprise and delight in the most unexpected ways"', '"The best meals are often the ones that surprise you"', '"Sometimes the most surprising ingredients create the best dishes"'],
    neutral: ['"Food is symbolic of love when words are inadequate"', '"Life is uncertain. Eat dessert first"', '"There is no sincere love than the love of food"', '"Food for the body is not enough. There must be food for the soul"'],
    fearful: ['"In times of fear, food is a steady comfort that brings calm to the soul"', '"When fear takes over, food can be a small refuge of peace and comfort"', '"Food may not erase fear, but it can help soothe your heart, one bite at a time"', '"Fear may cloud your mind, but a simple meal can clear the path to peace"'],
    disgusted: ['"Life is uncertain. Eat dessert first"', '"Happiness is... a well-cooked meal, no matter the day"', '"Sometimes the best memories are made from simple meals shared with loved ones"', '"Food brings people together, and there’s nothing better than sharing a meal with a friend or family"']
  }

  const key = Object.keys(foodQuotes);
  for (let i = 0; i < key.length; i++) {
    if (data == key[i]) {
      console.log(key[i]);
      qutoesData = key[i];
      console.log(qutoesData);
      break;
    }
  }
    return(
        <div className="foodHead">
            <div className="foodHead1">
                <img src={data+".png"} className="emojiImage1"></img>
              <p className="foodQuo">
                {(qutoesData != null) ? foodQuotes[qutoesData][Math.floor(Math.random() * 4)] : null}
              </p>
            </div>
          </div>
    )
}

export default Food1;