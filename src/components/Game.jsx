import { useLocation } from "react-router-dom";
import Header from "./Header";

function Game() {
    const location = useLocation();
    const data = location.state;
    const data1 = data.emo;
    const userId = data.idOfUser;
    console.log(data1);
    const gameQuote = ['"Games are the perfect blend of challenge and escape"', '"In every game, you either win or learn—there is no losing"', '"In every game, we find pieces of ourselves we didn’t know existed"', '"Games are a way to challenge your limits, but also to enjoy the process of growth"', '"Play, enjoy, and let the game bring out the best in you"'];
    // const gameQuotes = {
    //     happy : ['"Every victory, big or small, is worth celebrating in the game of life!"', '"The best games are the ones that bring out the joy in every player"'],
    //     neutral: ['""']
    // }
    return (
        <div className="gameOuter">
            <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'features'} obj={{state: {findEmo: data1, idOfUser: userId}}}/>
            <div className="gameInsideOuter">
                <div className="gameHead"></div>
                <div className="gameQuote">{gameQuote[Math.floor(Math.random() * 5)]}</div>
                <div className="game">
                    <div className="game1">
                        <div className="game1Inside">
                            <p className="gameDesc">A Jumbled Word Game is a fun and challenging puzzle where players unscramble mixed-up letters to form correct words.</p>
                            <a href="https://scratch.mit.edu/projects/1044819398/fullscreen/" className="gameLink" target="_blank">
                                <button className="gameBtn">Play</button>
                            </a>
                        </div>
                    </div>

                    <div className="game2">
                        <div className="game1Inside">
                            <p className="gameDesc">Fruit Ninja is a fast-paced arcade game where players slice flying fruits with a swipe while avoiding bombs to achieve high scores.</p>
                            <a href="https://scratch.mit.edu/projects/1040640763/fullscreen/" className="gameLink" target="_blank">
                                <button className="gameBtn">Play</button>
                            </a>
                        </div>
                    </div>

                    <div className="game3">
                        <div className="game1Inside">
                            <p className="gameDesc">Flappy Bird is a simple yet challenging arcade game where players navigate a bird through gaps between pipes by tapping the screen to keep it flying.</p>
                            <a href="https://scratch.mit.edu/projects/1044798295/fullscreen/" className="gameLink" target="_blank">
                                <button className="gameBtn">Play</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game;