import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";

async function bookDetails(data1) {
    let response = await fetch("http://localhost:3000/getBookById", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            bookId: data1,
        })
    })
    // let response = await fetch("https://www.googleapis.com/books/v1/volumes/"+data1);
    console.log(response);
    let res = response.json();
    let res1 = await res.then();
    console.log(res1);
    return res1;
}

function SingleBook() {
    const location = useLocation();
    const data = location.state;
    const data1 = data.bookId;
    const data2 = data.findEmo;
    const userId = data.idOfUser
    console.log(data);
    const [isBookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        bookDetails(data1).then(res => setBookDetails(res));
    },[])
    console.log("Enter");
    return (
        <div className="singleBookOuter">
            <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'book'} obj={{state: {emo: data2, idOfUser: userId}}}/>
            {console.log(isBookDetails)}
            {(isBookDetails != null) ? 
            <div className="singleBookOuter1">
                <div className="booknameImg">
                    <div className="imgBook">
                        <img src={isBookDetails.volumeInfo.imageLinks.thumbnail} className="bookImage"></img>
                        <p className="bName"></p>
                    </div>
                    <div className="nameBook">
                        <p className="title">{isBookDetails.volumeInfo.title}</p>
                        <p className="author1">{isBookDetails.volumeInfo.authors}</p>
                    </div>
                </div>
                <div className="aboutBook">
                    <div className="publisher">
                        <p className="publish">Publisher</p>
                        <p className="publisherName">{isBookDetails.volumeInfo.publisher}</p>
                    </div>

                    <div className="publisher">
                        <p className="publish">Publishing Year</p>
                        <p className="year">{isBookDetails.volumeInfo.publishedDate}</p>
                    </div>

                    {(isBookDetails.volumeInfo.description) ? <div className="bookDesc">
                        <p className="publish">Description</p>
                        <p className="bookDescription">{isBookDetails.volumeInfo.description}</p>
                    </div> : <p></p>}

                    <div className="linkOfBook">
                        <a href={isBookDetails.volumeInfo.infoLink} className="navigateLinks" target="_blank">Info</a> ||  
                        <a href={isBookDetails.volumeInfo.previewLink} className="navigateLinks" target="_blank">  Preview</a>
                    </div>
                </div>
            </div>
            :<div class="loader">
            <span></span>
            <span></span>
            <span></span>
            {/* <p>Loading</p> */}
          </div>}
        </div>
    )
}

export default SingleBook;