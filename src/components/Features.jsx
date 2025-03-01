import style from "./Features.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import ChatBot from "./ChatBot";
import { FaRobot, FaMusic, FaBook, FaQuoteRight, FaUtensils, FaClapperboard, FaGamepad, FaBookOpen, FaFilePen, FaLeftLong } from "react-icons/fa6";
import { useEffect } from "react";

let firstFeatureNotClicked = true;

function Features() {
    const [emoImg, setEmoImg] = useState("");
    const [userUniqueId, setUserId] = useState(null);
    // const [firstFeatureClicked, setFeatureClicked] = useState(false);
    const setImg = useRef();
    const location = useLocation();
    const data = location.state;
    // console.log(data);
    var uId = data.idOfUser;
    const data1 = (JSON.stringify(data.findEmo));
    const finalEmo = data1.slice(1, data1.length - 1);
    const finalEmo1 = finalEmo.toUpperCase();
    // console.log(JSON.stringify(data.findEmo), finalEmo);

    const loginBtn = useRef();

    const navigate = useNavigate();

    // if (count == 0) {
        useEffect(() => {
            setImg.current = finalEmo + ".png";
            // console.log(setImg.current)
            setEmoImg(finalEmo + ".png");
        }, [])
    //     count++;
    // }

    async function firstClickOfFeature(){
        if (userUniqueId!=null && firstFeatureNotClicked) {
            firstFeatureNotClicked=false;
            let now = new Date();
            let dateAndTime = (now.toLocaleString()).split(",");
            let date = dateAndTime[0];
            date = date.slice(6)+"/"+date.slice(3,5)+"/"+date.slice(0,2);
            let time = dateAndTime[1];
            console.log('%cfirst click', 'color: red; font-size: 30px;');

            await fetch("http://localhost:3000/userEntry",{
                method:'PUT',
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    userId:userUniqueId,
                    date:date,
                    time:time.trim(),
                    mood:finalEmo
                })
            })
        }
        else{
            console.log('%cNot the first click', 'color: green; font-size: 30px;');
            // console.log('Not the first click');
            
        }
    }


    function quotesHandler() {
        //to allow only if they logged in

        firstClickOfFeature();



        (userUniqueId == null) ? loginBtn.current.click() : navigate("/quotes", { state: { emo: (finalEmo), idOfUser: userUniqueId } });
    }

    function journelHandler() {
        // setFeatureClicked(true);
        firstClickOfFeature();

        (userUniqueId == null) ? loginBtn.current.click() : navigate("/journel", { state: { emo: (finalEmo), idOfUser: userUniqueId } });

        // navigate("/journel", { state: { emo: (finalEmo), idOfUser: userUniqueId } });
    }

    // function storyHandler() {
    //     navigate("/story");
    // }

    function musicHandler() {
        // setFeatureClicked(true);
        firstClickOfFeature();

        (userUniqueId == null) ? loginBtn.current.click() : navigate("/music", { state: { emo: (finalEmo), idOfUser: userUniqueId } });

        // navigate("/music", { state: { emo: (finalEmo), idOfUser: userUniqueId } });
    }

    function chatBotHandler() {
        // setFeatureClicked(true);
        firstClickOfFeature();

        (userUniqueId == null) ? loginBtn.current.click() : navigate("/chatBot", { state: { emo1: (finalEmo), idOfUser: userUniqueId } });

        // navigate("/chatBot", { state: { emo1: (finalEmo) , idOfUser: userUniqueId } });
    }

    function foodHandler() {
        // setFeatureClicked(true);
        firstClickOfFeature();

        (userUniqueId == null) ? loginBtn.current.click() : navigate("/food", { state: { emo: (finalEmo), idOfUser: userUniqueId } });

        // navigate("/food", { state: { emo: (finalEmo) , idOfUser: userUniqueId } });
    }

    function bookHander() {
        // console.log(finalEmo);
        firstClickOfFeature();

        (userUniqueId == null) ? loginBtn.current.click() : navigate("/book", { state: { emo: (finalEmo), idOfUser: userUniqueId } });
    }

    function gameHandler() {
        firstClickOfFeature();

        (userUniqueId == null) ? loginBtn.current.click() : navigate("/game", { state: { emo: (finalEmo), idOfUser: userUniqueId } });
    }

    // function backHome(params) {
    //     return navigate("/home");
    // }

    useEffect(() => { uId ? setUserId(uId) : null }, [])

    // console.log(setImg.current, emoImg, data1);
    return (

        <div className={style.featureOuter} >
            <div className={style.featureHead}>
                {/* {console.log('userUniqueId : ', userUniqueId)} */}
                <Header userUniqueId={userUniqueId} setUserId={setUserId} loginBtn={loginBtn} backTo={"home"} obj={{ state: { emo: (finalEmo), idOfUser: userUniqueId } }} />
                {/* <div className={style.backIcon} onClick={() => {navigate("/home")}}>
                    <FaLeftLong className={style.leftIcon}></FaLeftLong>
                </div> */}

            </div>
            <div className={style.feaContainer}>
                {/* <div className={style.loadingAni}>
                    <img src="/smile.gif" className={style.loadingGif}></img>
                </div> */}
                <div className={style.featureContainer}>

                    <div className={`${style.item} ${style.feature1}`} onClick={musicHandler} title="Songs">
                        <FaMusic className={style.icons} />
                    </div>

                    <div className={`${style.item} ${style.feature2}`} onClick={journelHandler} title="Writing Journel">
                        <FaFilePen className={style.icons} />
                    </div>

                    <div className={`${style.item} ${style.feature3}`} onClick={quotesHandler} title="Quotes">
                        <FaQuoteRight className={style.icons} />
                    </div>

                    <div className={`${style.item} ${style.feature4}`} title="Book" onClick={bookHander}>
                        <FaBookOpen className={style.icons} />
                    </div>

                    {/* {setImg.current ? <div className={style.item1} style={{ backgroundImage: `url(fear1.png)` }}>
                    </div> : <div className={style.item1} style={{ backgroundImage: `url(${setImg.current})` }}> {finalEmo1} </div>} */}

                    <div className="largeCircle">
                        {setImg.current ? <div className={style.item1} style={{ backgroundImage: `url(${setImg.current})` }}>
                        </div> : <div className={style.item1} style={{ backgroundImage: `url(${setImg.current})` }}> {finalEmo1} </div>}
                    </div>




                    <div className={`${style.item} ${style.feature5}`} title="Food" onClick={foodHandler}>
                        <FaUtensils className={style.icons} />
                    </div>

                    <div className={`${style.item} ${style.feature6}`} onClick={chatBotHandler} title="Chating">
                        <FaRobot className={style.icons} />
                    </div>

                    <div className={`${style.item} ${style.feature7}`} title="Games" onClick={gameHandler}>
                        <FaGamepad className={style.icons} />
                    </div>

                </div>
                {/* <div className={style.loadingAni}></div> */}
            </div>
            {/* </Router> */}
            {/* {(userUniqueId==null && featureClicked)?<Login setLog={setLog} setWay={setWay} wayToLogin={wayToLogin} setUserId={setUserId} userUniqueId={userUniqueId}/>:null} */}



        </div>
    )
}

export default Features;























// import style from "./Features.module.css";
// import { BrowserRouter as Router, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import ChatBot from "./ChatBot";
// import { FaRobot, FaMusic, FaBook, FaQuoteRight, FaUtensils, FaClapperboard, FaGamepad, FaBookOpen, FaFilePen, FaYammer } from "react-icons/fa6";

// let count = 0;

// function Features() {
//     const setImg = useRef();

//     const [emoImg, setEmoImg] = useState("");
//     const location = useLocation();
//     const data = location.state;
//     const data1 = (JSON.stringify(data.findEmo));
//     const finalEmo = data1.slice(1, data1.length - 1);
//     const finalEmo1 = finalEmo.toUpperCase();
//     console.log(JSON.stringify(data.findEmo), finalEmo);

//     const navigate = useNavigate();

//     if (count == 0) {
//         setImg.current = finalEmo + ".png";
//         console.log(setImg.current)
//         setEmoImg(finalEmo + ".png");
//         count++;
//     }


//     function quotesHandler() {
//         navigate("/quotes");
//     }

//     function journelHandler() {
//         navigate("/journel");
//     }

//     // function storyHandler() {
//     //     navigate("/story");
//     // }

//     function musicHandler() {
//         navigate("/music", { state: { emo: (finalEmo) } });
//     }

//     function chatBotHandler() {
//         navigate("/chatBot", { state: { emo1: (finalEmo) } });
//     }

//     console.log(setImg.current, emoImg, data1);
//     return (

//         <div className={style.featureOuter} >
//             <div className={style.featureContainer}>

//                 <div className={`${style.item} ${style.feature1}`} onClick={musicHandler} title="Songs">
//                     <FaMusic className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature2}`} onClick={journelHandler} title="Writing Journel">
//                     <FaFilePen className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature3}`} onClick={quotesHandler} title="Quotes">
//                     <FaQuoteRight className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature4}`} title="Story">
//                     <FaBookOpen className={style.icons} />
//                 </div>

//                 {/* {setImg.current ? <div className={style.item1} style={{ backgroundImage: `url(fear1.png)` }}>
//                 </div> : <div className={style.item1} style={{ backgroundImage: `url(${setImg.current})` }}> {finalEmo1} </div>} */}

//                 {setImg.current?<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}>
//                 </div>:<div className={style.item1} style={{backgroundImage: `url(${setImg.current})`}}> {finalEmo1} </div>}




//                 <div className={`${style.item} ${style.feature5}`} title="Food">
//                     <FaUtensils className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature6}`} onClick={chatBotHandler} title="Chating">
//                     <FaRobot className={style.icons} />
//                 </div>

//                 <div className={`${style.item} ${style.feature7}`} title="Games">
//                     <FaGamepad className={style.icons} />
//                 </div>

//             </div>
//             {/* </Router> */}
//         </div>
//     )
// }

// export default Features;