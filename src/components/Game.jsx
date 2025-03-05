import { useLocation } from "react-router-dom";
import Header from "./Header";

function Game() {
    const location = useLocation();
    const data = location.state;
    const data1 = data.emo;
    const userId = data.idOfUser;
    const smallDivs = Array.from({ length: 3 });
    const gameArr = {
        happy: ["https://scratch.mit.edu/projects/1044819398/fullscreen/", "https://scratch.mit.edu/projects/1040640763/fullscreen/", "https://scratch.mit.edu/projects/1044798295/fullscreen/"],
        sad: ["https://scratch.mit.edu/projects/1044459433/fullscreen/", "https://scratch.mit.edu/projects/1044417104/fullscreen/", "https://scratch.mit.edu/projects/1041092581/fullscreen/"],
        angry: ["https://scratch.mit.edu/projects/1040953446/fullscreen/", "https://scratch.mit.edu/projects/1041113111/fullscreen/", "https://scratch.mit.edu/projects/1044819398/fullscreen/"],
        disgusted : ["https://scratch.mit.edu/projects/1044493610/fullscreen/", "https://scratch.mit.edu/projects/1040855612/fullscreen/", "https://scratch.mit.edu/projects/1041097324/fullscreen/"],
        fearful : ["https://scratch.mit.edu/projects/1039054027/fullscreen/", "https://scratch.mit.edu/projects/1041085798/fullscreen/", "https://scratch.mit.edu/projects/1040246369/fullscreen/"],
        neutral : ["https://scratch.mit.edu/projects/1043780740/fullscreen/", "https://scratch.mit.edu/projects/1044459433/fullscreen/", "https://scratch.mit.edu/projects/1041113111/fullscreen/"],
        surprised: ["https://scratch.mit.edu/projects/1040953446/fullscreen/", "https://scratch.mit.edu/projects/1044798295/fullscreen/", "https://scratch.mit.edu/projects/1040246369/fullscreen/"],
    }
    const gameDesc = {
        happy: ["A Jumbled Word Game is a fun and challenging puzzle where players unscramble mixed-up letters to form correct words.", "Fruit Ninja is a fast-paced arcade game where players slice flying fruits with a swipe while avoiding bombs to achieve high scores.", "Flappy Bird is a simple yet challenging arcade game where players navigate a bird through gaps between pipes by tapping the screen to keep it flying."], 
        sad: ['"123 Game" is a simple yet engaging number-based puzzle or reflex game that tests quick thinking and pattern recognition. Fun and easy to play!', "Dice Mania is a fun and addictive dice-rolling game that combines luck and strategy. Roll the dice, score points, and challenge yourself or friends!", "Typing Master is an educational game designed to improve typing speed and accuracy through fun exercises and challenges. Perfect for learning fast typing!"],
        angry: ["Memory Game is a classic brain-training game where players match pairs of cards by remembering their positions. It enhances concentration.", "Connecting Dots is a simple yet addictive puzzle game where players link dots of the same color to complete patterns. It boosts logic and problem-solving skills!", "A Jumbled Word Game is a fun and challenging puzzle where players unscramble mixed-up letters to form correct words."],
        disgusted: ["Pac-Man is a classic arcade game where you navigate a maze, eat pellets, and avoid ghosts. Collect power-ups to chase the ghosts and score big!", "Mars War is a multiplayer shooter set on Mars, featuring intense battles and sci-fi action.", "Quiz is a question-and-answer game that tests knowledge on various topics. Fun for learning and challenges!"],
        fearful: ["4 Pics 1 Word is a puzzle game where players guess a common word linking four images. Simple, fun, and great for brain training!", "Correct Word is a word puzzle game where players form or fix words from given letters. It improves vocabulary and spelling skills!", "Super Mario is a classic platformer where Mario jumps through levels, defeats enemies, and rescues Princess Peach. Fun, adventure-packed, and iconic!"],
        neutral: ["Plants vs. Zombies is a fun strategy game where players use plants to defend their garden from waves of zombies. Addictive, challenging, and entertaining!", '"123 Game" is a simple yet engaging number-based puzzle or reflex game that tests quick thinking and pattern recognition. Fun and easy to play!', "Connecting Dots is a simple yet addictive puzzle game where players link dots of the same color to complete patterns. It boosts logic and problem-solving skills!"],
        surprised: ["Memory Game is a classic brain-training game where players match pairs of cards by remembering their positions. It enhances concentration.", "Flappy Bird is a simple yet challenging arcade game where players navigate a bird through gaps between pipes by tapping the screen to keep it flying.", "Super Mario is a classic platformer where Mario jumps through levels, defeats enemies, and rescues Princess Peach. Fun, adventure-packed, and iconic!"],
};
    const gameImg = {
        happy: ["jumbled.jpg", "fruit.jpg", "flappy.jpg"],
        sad: ["123.png", "diceMania.jpg", "typing.png"],
        angry: ["memory.jpg", "connects.jpg", "jumbled.jpg"],
        disgusted: ["pacman.jpg", "marswar.jpg", "quiz.jpg"],
        fearful: ["oneWord.png", "correct.jpeg", "superMario.jpg"],
        neutral: ["plants.jpg", "123.png", "connects.jpg"],
        surprised: ["memory.jpg", "flappy.jpg", "superMario.jpg"]
    }
    console.log(data1);
    console.log(gameArr[data1][0])
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
                                <div className="game1" style={{ backgroundImage: "url(" + gameImg[data1][index] + ")" }}>
                                    <div className="game1Inside">
                                        <p className="gameDesc">{gameDesc[data1][index]}</p>
                                        <a href={gameArr[data1][index]} className="gameLink" target="_blank">
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