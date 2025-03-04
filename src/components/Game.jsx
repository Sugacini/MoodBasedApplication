import { useLocation } from "react-router-dom";
import Header from "./Header";

function Game() {
    const location = useLocation();
    const data = location.state;
    const data1 = data.emo;
    const userId = data.idOfUser;
    const smallDivs = Array.from({ length: 3 });
    const gameArr = ["https://scratch.mit.edu/projects/1044819398/fullscreen/", "https://scratch.mit.edu/projects/1044819398/fullscreen/", "https://scratch.mit.edu/projects/1044798295/fullscreen/"];
    const gameDesc = ["A Jumbled Word Game is a fun and challenging puzzle where players unscramble mixed-up letters to form correct words.", "Fruit Ninja is a fast-paced arcade game where players slice flying fruits with a swipe while avoiding bombs to achieve high scores.", "Flappy Bird is a simple yet challenging arcade game where players navigate a bird through gaps between pipes by tapping the screen to keep it flying."];
    const gameImg = ["jumbled.jpg", "fruit.jpg", "flappy.jpg"];
    console.log(data1);
    const gameQuote = ['"Games are the perfect blend of challenge and escape"', '"In every game, you either win or learn—there is no losing"', '"In every game, we find pieces of ourselves we didn’t know existed"', '"Games are a way to challenge your limits, but also to enjoy the process of growth"', '"Play, enjoy, and let the game bring out the best in you"'];
    return (
        <div className="gameOuter">
            <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'features'} obj={{ state: { findEmo: data1, idOfUser: userId } }} />
            <div className="gameInsideOuter1">
                <div className="gameSideBar">
                    <img src={data1+".png"} className="emojiImage1"></img>
                    <p className="gameSideBar1">{gameQuote[Math.floor(Math.random() * 5)]}</p>
                    </div>
                <div className="gameInsideOuter">
                    <div className="gameHead"></div>
                    {/* <div className="gameQuote">{gameQuote[Math.floor(Math.random() * 5)]}</div> */}
                    <div className="game">
                        {smallDivs.map((_, index) => {
                            return (
                                <div className="game1" style={{ backgroundImage: "url(" + gameImg[index] + ")" }}>
                                    <div className="game1Inside">
                                        <p className="gameDesc">{gameDesc[index]}</p>
                                        <a href={gameArr[index]} className="gameLink" target="_blank">
                                            <button className="gameBtn">Play</button>
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game;