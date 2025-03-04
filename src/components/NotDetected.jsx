import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaRotateRight } from "react-icons/fa6";

function NotDetected(){
    const location = useLocation();
    const userData = location.state;
    const userId = userData.idOfUser;
    const navigate = useNavigate();
    return(
        <div className="notFoundOuter">
            <div className="notFoundInner">
                <p className="errorMsg1">Your face Not detected. Kindly retry</p>
                <button className="tryAgain" onClick={() => {
                    navigate("/home", {state: {idOfUser: userId}})
                }}><FaRotateRight icon="fa-solid fa-rotate-right" /></button>
            </div>
            
        </div>
    )
}

export default NotDetected;