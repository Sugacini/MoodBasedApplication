import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

async function BookCollection(emoData) {
    let response = await fetch("http://localhost:3000/getBooks", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            emo: emoData,
        })
    });
    let data = response.json();
    let data1 = await data.then();
    console.log(data1);
    return data1;
}


function Book() {

    const [isBook, setBook] = useState(null);
    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state;
    const data1 = data.emo;
    const userId = data.idOfUser
    console.log(data);
    const moodQuote ={
        happy: ['"Be happy for this moment. This moment is your life"', '"Happiness is secret to all beauty,There is no beauty without happiness"'],
    }
    const quote = ['"A book is proof that humans can work magic with emotions"', '"A day without laughter is a day wasted"', '"For every minute you are angry, you lose sixty seconds of happiness."']
    console.log(data1);

    useEffect(() => {
        BookCollection(data1).then(res => setBook(res));
      }, [])

    return (
        <>
        <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'features'} obj={{state: {findEmo: data1, idOfUser: userId}}} className="BookHeader"/>

        <div className="bookOuter">
            
            <div className="bookSideBar">
            {quote[(Math.floor(Math.random() * 3))]}
            </div>
            <div className="bookContainer">
                {(isBook != null) ? isBook.map((singleBook, index) => {
                    {console.log(singleBook.volumeInfo.imageLinks.thumbnail)}
                    return <div key={index} className="book" onClick={() => {navigate("/singleBook", {state: { bookId: singleBook.id, emo:data1, idOfUser: userId }})}}>
                        <img src={singleBook.volumeInfo.imageLinks.thumbnail} className="setBookImg"></img>
                        <p className="bookName">{singleBook.volumeInfo.title}</p>
                    </div>
                }) : <div class="loader">
                <span></span>
                <span></span>
                <span></span>
              </div>}
            </div>
        </div>
        </>
        
    )
}

export default Book;