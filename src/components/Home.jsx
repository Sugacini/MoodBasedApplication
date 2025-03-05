import "../Home.css"
import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { useAppContext } from "../ForContext";
let count = 0;

function Home() {

    // const {userIdContext,setIdForContxt} = useAppContext();

    const navigate = useNavigate();

    const findEmotion = useRef();
    let detectFace = false;

    const location = useLocation();
    const userData = location.state;
    const userId = userData.idOfUser;
    console.log(userData);

    const [isEmotion, setEmotion] = useState(true);
    const srcVal = useRef();
    const canvasDetect = useRef();
    const detectMessage = useRef();
    const [detectClicked, setDetectClicked] = useState(false);
    const [stream, setStream] = useState(null);
    let localStream;

    async function uploadFiles() {
        try {

            await Promise.all(
                [
                    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
                    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
                ]
            )
            console.log("Uploaded");
        }
        catch (err) {
            console.log("Error: " + err);
        }
    }

    uploadFiles();

    console.log("Enter");
    const getUserMediaStream = async () => {
        console.log("Enter the async")
        try {
            localStream = await (navigator.mediaDevices.getUserMedia({ video: true }));
            console.log(localStream);
            if (srcVal.current) {
                srcVal.current.srcObject = localStream;
               
            }
        }
        catch (err) {
            console.error("Error accessing webcam:", err);
        }
    }
    getUserMediaStream();

    useEffect(() => {
        setStream(localStream)
    }, [])


    function detectHandler() {
        console.log("Enter it detecthandler")
        let liveVideo = srcVal.current;
        let count = 0;
        let emotion = []
        console.log(srcVal.current.clientHeight);
        const canvas = canvasDetect.current;

        const size = { width: liveVideo.clientWidth, height: liveVideo.clientHeight };
        faceapi.matchDimensions(canvas, size);

        var interval = setInterval(async () => {
            const ctx = canvas.getContext('2d');
            const detections = await faceapi
                .detectAllFaces(liveVideo, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();
            if (detections.length != 0) {
                emotion.push(detections);
                count++;
                if (count == 5) {
                    clearInterval(interval);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }

                if (count < 5) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    console.log(detections);

                    const resizedDetections = faceapi.resizeResults(detections, size);
                    console.log(resizedDetections);
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
                }
            }
        }, 500);

        setTimeout(() => {
            if (emotion.length != 0) {
                console.log(emotion);
                var final = {}
                var allEmotions = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];
                var idx = 0;
                allEmotions.forEach((emtns) => {
                    emotion.forEach((eachEmotion) => {
                        idx++
                        if (idx = 1) {
                            final[emtns] = eachEmotion[0].expressions[emtns];
                        }
                        final[emtns] += eachEmotion[0].expressions[emtns]

                    })
                    idx = 0;
                })
                console.log(final);
                console.log(emotion);
                let values = Object.values(final);
                var temp = values[0];
                console.log(values);
                for (let i = 1; i < values.length; i++) {
                    if (temp < values[i]) {
                        temp = values[i];
                    }
                }
                var indexVal = values.indexOf(temp);
                setEmotion(false);
                findEmotion.current = allEmotions[indexVal];
                console.log(allEmotions[indexVal], temp);
            }
            // setIdForContxt(findEmotion.current);
            // userId
            if (userId) {
                async function entryToDb(){
                    let now = new Date();
                    let dateAndTime = (now.toLocaleString()).split(",");
                    let date = dateAndTime[0];
                    date = date.slice(6)+"/"+date.slice(3,5)+"/"+date.slice(0,2);
                    let time = dateAndTime[1];
            
                    await fetch("http://localhost:3000/userEntry",{
                        method:'PUT',
                        headers:{
                            "Content-type":"application/json"
                        },
                        body:JSON.stringify({
                            userId:userId,
                            date:date,
                            time:time.trim(),
                            mood:findEmotion.current
                        })
                    })
                }
                entryToDb();
            }
            

            detectMessage.current.textContent = allEmotions[indexVal].toUpperCase();
            detectFace = true;
        }, 2000)

        setTimeout(() => {
            console.log(localStream.getTracks());
                localStream.getTracks().forEach(track => track.stop());
                if(detectFace){
                    navigate("/features", { state: { findEmo: (findEmotion.current), idOfUser: userData.idOfUser } });
                }
                else{
                    navigate("/notDetect", {state: { idOfUser: userId }}); 
                }
                
        }, 4500);

    }
    return (

        <>
            <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'landingPage'} obj={{ state: { idOfUser: userId } }} className="BookHeader" />
            <div className="homeOuter">
                <div className="detectHeading">CAPTURING EXPRESSION</div>
                <div className="videoImg">
                    <video className="videoDiv" ref={srcVal} autoPlay></video>
                </div>

                <canvas ref={canvasDetect} className="createCanvas"></canvas>
                <button onClick={detectHandler} className="detectBtn">Detect Mood</button>
                <div className="detected" ref={detectMessage}></div>
            </div>  
        </>
    )

}
export default Home;