import "../Home.css";
import { useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaBookOpen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FaLeftLong } from "react-icons/fa6";
import Story from "./Story";
import Header from "./Header";

let count = 0;

function Quotes(){

    const navigate = useNavigate();
    const[isQuotes, setQuotes] = useState("");
    const[author, setAuthor] = useState("");
    const[randomQuotes, setRandomQuotes] = useState(null);

    const location = useLocation();
    const data = location.state;
    console.log(data);
    const userId = data.idOfUser;
    const data1 = (JSON.stringify(data.emo))
    console.log(data1)
    const finalEmo = data1.slice(1,data1.length-1);
    console.log(finalEmo);

    async function nextQuoHandler(){
        try{
            let response = await fetch("https://api.paperquotes.com/apiv1/quotes/?tags="+finalEmo);
            let result = await fetch("https://dummyjson.com/quotes");
            let result1 = result.json();
            let result2 = await result1.then();
            let result3 = result2.quotes;
            setRandomQuotes(result3);
            console.log(result3);
            if(!response.ok){
                throw new Error("error")
            }
            let value = response.json();
            let value1 = await value.then();
            let finalValue = value1.results;
            if(finalValue.length > 0){
                let final = finalValue[Math.floor(Math.random() * (finalValue.length))];
                console.log(final.quote);
                setQuotes(final.quote)
                setAuthor(final.author);
                console.log(finalValue);
            }
            else{
                let newResponse = await fetch('https://dummyjson.com/quotes/1');
                let newResponse1 = newResponse.json();
                let newResponse2 = await newResponse1.then();
                console.log(newResponse2);
                setQuotes(newResponse2.quote);
                setAuthor(newResponse2.author);
            }
            
        }
        catch(err){
            console.log(err);
        }
        
    }

    useEffect(() => {
        nextQuoHandler();
    }, [])
    return(
        <>
            <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={"features"} obj={{state: {findEmo: finalEmo, idOfUser: userId}}}/>
            <div className="quotesDiv">
            {console.log(finalEmo)}
            <div className="quotesDiv2">
                <img src={finalEmo+".png"} className="emojiImage"></img>
                {(isQuotes != "") ? <p className="quotesQuo">" {isQuotes} "</p> : null}
            </div>
                <div className="quotesDiv1">
                       
                    <div className="innerOuter">
                        <ol className="hexagonOuter"><span>Other Quotes</span>
                            {(randomQuotes != null) ? randomQuotes.map((randomQuote, index) => {
                                return(<li className="random">{randomQuote.quote}</li>)
                            }):null}
                        </ol>
                        <div className="iconsDiv">
                            <div className="sto1" onClick={() => {
                                localStorage.setItem("emoData", JSON.stringify(finalEmo));
                                navigate("/story", {state: {emo: finalEmo, idOfUser: userId}})
                            }}>
                                <FaBookOpen className="iconSize"></FaBookOpen>
                            </div>
                            <button className="nextQuoBtn" onClick={nextQuoHandler}>NEXT</button>
                        </div>
                        {/* <div className="hexagonOuter">
                            <div className="hexagon">
                                <div className="quotesHeading">QUOTES</div>
                                    <div className="quotes1">
    
                                        <p className="setQuo">
                                            <FaQuoteLeft className="quoIcon" />
                                                {quotes}
                                            <FaQuoteRight  className="quoIcon1"/>
                                        </p>
                            
                                    </div>
                                    {author?<p className="authorOfQuo">-{author}</p>:<p className="authorOfQuo"></p>}
                            </div>
                        </div> */}
                        
                    </div>
                
                
                </div>
        </div>
        </>
        
    )
}

export default Quotes;




















































// import "../Home.css";
// import { useState } from "react";
// import { FaQuoteLeft, FaQuoteRight, FaBookOpen } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { FaLeftLong } from "react-icons/fa6";
// import Story from "./Story";
// import Header from "./Header";

// let count = 0;

// function Quotes(){

//     const navigate = useNavigate();
//     const[quotes, setQuotes] = useState("");
//     const[author, setAuthor] = useState("");
//     const[randomQuotes, setRandomQuotes] = useState([]);

//     const location = useLocation();
//     const data = location.state;
//     console.log(data);
//     const userId = data.idOfUser;
//     const data1 = (JSON.stringify(data.emo))
//     console.log(data1)
//     const finalEmo = data1.slice(1,data1.length-1);
//     console.log(finalEmo);

//     async function nextQuoHandler(){
//         try{
//             let response = await fetch("https://api.paperquotes.com/apiv1/quotes/?tags="+finalEmo);
//             let result = await fetch("https://dummyjson.com/quotes");
//             let result1 = result.json();
//             let result2 = await result1.then();
//             let result3 = result2.quotes;
//             setRandomQuotes(result3);
//             console.log(result3);
//             if(!response.ok){
//                 throw new Error("error")
//             }
//             let value = response.json();
//             let value1 = await value.then();
//             let finalValue = value1.results;
//             if(finalValue.length > 0){
//                 let final = finalValue[Math.floor(Math.random() * (finalValue.length))];
//                 setQuotes(final.quote)
//                 setAuthor(final.author);
//                 console.log(finalValue);
//             }
//             else{
//                 let newResponse = await fetch("https://api.api-ninjas.com/v1/quotes");
//                 let newResponse1 = newResponse.json();
//                 let newResponse2 = await newResponse1.then();
//                 console.log(newResponse2);
//             }
            
//         }
//         catch(err){
//             console.log(err);
//         }
        
//     }

//     useEffect(() => {
//         nextQuoHandler();
//     }, [])
//     return(
//         <>
//             <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={"features"} obj={{state: {findEmo: finalEmo, idOfUser: userId}}}/>
//             <div className="quotesDiv">
//             {console.log(finalEmo)}
//             <div className="quotesDiv2">
//                 <img src={finalEmo+".png"} className="emojiImage"></img>
//                 <p className="quotesQuo">" {quotes} "</p>
//             </div>
//                 <div className="quotesDiv1">
//                         <div className="sto1" onClick={() => {
//                             localStorage.setItem("emoData", JSON.stringify(finalEmo));
//                             navigate("/story", {state: {emo: finalEmo, idOfUser: userId}})
//                         }}>
//                             <FaBookOpen className="iconSize"></FaBookOpen>
//                     </div>
//                     <div className="innerOuter">
//                         {/* <div className="hexagonOuter">
//                             <div className="hexagon">
//                                 <div className="quotesHeading">QUOTES</div>
//                                     <div className="quotes1">
    
//                                         <p className="setQuo">
//                                             <FaQuoteLeft className="quoIcon" />
//                                                 {quotes}
//                                             <FaQuoteRight  className="quoIcon1"/>
//                                         </p>
                            
//                                     </div>
//                                     {author?<p className="authorOfQuo">-{author}</p>:<p className="authorOfQuo"></p>}
//                             </div>
//                         </div> */}
//                         <button className="nextQuoBtn" onClick={nextQuoHandler}>NEXT</button>
//                     </div>
                
                
//                 </div>
//         </div>
//         </>
        
//     )
// }

// export default Quotes;
























