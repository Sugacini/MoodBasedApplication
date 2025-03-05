import style from "./Journel.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function JournelLogo() {

    const createTextDiv = useRef();
    const newDiv = useRef();
    const writeText = useRef();
    const saveText = useRef();
    const writingDataSave = useRef();
    const JournalSelected = useRef();

    const [newJournelDiv, setJournalBoxes] = useState([]);
    const [newDataDiv, setDataDiv] = useState([]);

    const [selectedJournal, selectJournal] = useState(null);

    const [count, setCount] = useState(0);

    const location = useLocation();
    const result = location.state;
    var userId = result.idOfUser;
    // console.log(userId);

    const data1 = (JSON.stringify(result.emo));
    var finalEmo = data1.slice(1, data1.length - 1);

    function createDiv() {
        // JournalSelected.idx=null;//set journal selected to zero to make an empty display
        console.log(count);
        if (count == 0) {
            setJournalBoxes((prev) => [...prev, {}]);
        }
        setCount(count + 1);
        // console.log(count)
    }

    async function saveData() {
        let value = writeText.current.value;
        let value1 = ((value.indexOf(" ") != -1) && (value.indexOf(" ") < 9)) ? value.slice(0, value.indexOf(" ")) : value.slice(0, 8);
        let now = new Date();
        let dateAndTime = (now.toLocaleString()).split(",");
        let date = dateAndTime[0];
        date = date.slice(6) + "/" + date.slice(3, 5) + "/" + date.slice(0, 2);
        let time = dateAndTime[1];
        setDataDiv((prev) => [...prev, { value1, date, time, value }]);
        newDiv.current.remove();
        setCount(0);
        if (JournalSelected.idx != null) {
            await fetch("http://localhost:3000/updateJournal", {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    date: date,
                    time: time,
                    content: value,
                    id: JournalSelected.idx
                })
            })
        }
        else {
            var addToDb = await fetch("http://localhost:3000/addJournal", {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    date: date,
                    time: time,
                    content: value
                })
            })
        }
        JournalSelected.idx = null;

        // addToDb

    }

    async function deleteData() {


        if (JournalSelected.idx != null) {
            await fetch("http://localhost:3000/deleteJournal?id=" + JournalSelected.idx);
            var toDeleteElement;

            newDataDiv.map((ele, idx) => {
                if (ele.idx == JournalSelected.idx) {
                    toDeleteElement = idx;

                }
            })
            newDataDiv.splice(toDeleteElement, 1);
            newDiv.current.remove();
            setCount(0);
            JournalSelected.idx = null;
        }
        else {
            newDiv.current.remove();
            setCount(0);
            console.log("Delete the data");
        }

    }

    function singleJournalClickHandler(e) {

        var clickedElement = e.target;
        if (JournalSelected.idx != null) {
            newDiv.current.remove();

        }
        // if (JournalSelected.idx==null) {
        if (clickedElement.id) {
            JournalSelected.idx = clickedElement.id;
        }
        else if (clickedElement.parentElement.id) {
            JournalSelected.idx = clickedElement.parentElement.id;

        }
        else if (clickedElement.parentElement.parentElement.id) {
            JournalSelected.idx = clickedElement.parentElement.parentElement.id;

        }
        // console.log(JournalSelected.idx);
        setCount(0);

        setJournalBoxes((prev) => [...prev, {}]);
        // writeText.current.remove();

        setCount(count + 1);
        // }

    }


    async function initializer() {
        var allPrevJournalsResponse = await fetch("http://localhost:3000/prevJournals?userId=" + userId);
        var allPrevJournals = await allPrevJournalsResponse.json();
        var prevJournals = []
        allPrevJournals.map((journal) => prevJournals.push({
            value1: ((journal.content.indexOf(" ") != -1) && (journal.content.indexOf(" ") < 9)) ? journal.content.slice(0, journal.content.indexOf(" ")) : journal.content.slice(0, 8),
            date: journal.date.split("T")[0].split("-").join("/"),
            time: journal.time,
            value: journal.content,
            idx: journal.journalId
        }))
        setDataDiv(prevJournals)


    }

    useEffect(() => {
        initializer()
    }, [newDataDiv.length])

    return (
        <>
            <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'features'} obj={{ state: { findEmo: finalEmo, idOfUser: userId } }} />

            {/* <div className={style.journelHeader}>
                <div className={style.logo}>
                    <div className={style.name}>Journel</div>
                </div> */}

            <div className={style.create + " " + style.option} onClick={createDiv} style={(count != 0) ? { opacity: "0" } : null}>
                <i className="fa-solid fa-square-plus" style={{ fontSize: "35px" }}></i>
            </div>
            {/* </div> */}
            <div className={style.journalOuter}>
                <div className={style.journelSideBar}>
                    <img src={finalEmo+".png"} className={style.emojiImage2}></img>
                    <p className={style.journelQuote}>Music is the soundtrack of your best moments</p>
                </div>
                <div className={style.writeJournel}>
                    <div className={style.journelContainer} ref={createTextDiv} style={(count == 0) ? { width: '0%' } : { width: '80%' }}>
                        {newJournelDiv.map((el, index) => (

                            <div key={index} className={style.journelBox} ref={newDiv}>

                                <textarea className={style.textBox} ref={writeText} placeholder="You can start writing here..." defaultValue={JournalSelected.idx ? newDataDiv.filter(el => (el.idx == JournalSelected.idx))[0].value : undefined}></textarea>
                                <div className={style.buttons}>
                                    <button className={style.saveButton} onClick={saveData}>Save</button>
                                    <button className={style.trash} onClick={deleteData}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={style.saveJournel} ref={writingDataSave} style={(count == 0) ? { flexDirection: 'row', height: 'fit-content', minWidth: '343px' } : { width: '20%' }}>
                        {newDataDiv.length != 0 ? newDataDiv.map((ele, index) => {
                            return <div className={style.dataSaveDiv} ref={saveText} key={index} id={ele.idx} onClick={singleJournalClickHandler} style={((JournalSelected.idx) == ele.idx) ? { background: '#0085e1' } : null}>
                                <p className={style.headOfJournel}>{ele.value1}</p>
                                <div className={style.timeAndDate}>
                                    <p>{ele.date}</p>
                                    <p>{ele.time}</p>
                                </div>
                            </div>
                        }) :
                            <div className={style.noDataFound}>
                                <img src="noDataFound.jpg" alt="" />
                                <p>No Journals created yet!</p>
                            </div>
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default JournelLogo;


