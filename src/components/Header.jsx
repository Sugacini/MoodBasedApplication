import { useState } from "react";
import Login from './Login.jsx'
import SideBar from "./sideBar.jsx";
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";

function Header({setUserId, userUniqueId, loginBtn={loginBtn}, backTo, obj}) {
    const [loggedIn, setLog] = useState(false);
    const [isLogCLicked, setLogClicked] = useState(false);
    const [wayToLogin, setWay] = useState(null);
    const [userIconCliked,setUIconClick] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="header">
            <div className="headersLeft">
                {backTo?<FaLeftLong className="backBtn" onClick={()=>navigate("/"+backTo, obj)} style={{cursor:'pointer'}}/>: <FaLeftLong className="logo"/>}
                {backTo?<img src="logo4.png" alt="" className="logo" onClick={()=>navigate("/", obj)} style={{cursor:'pointer'}}/>:<img src="logo4.png" alt="" className="logo" />}
                <h3>UnarvAI</h3>
            </div>
            {/* {backTo?<div className="headersLeft" onClick={()=>navigate("/"+backTo, obj)} style={{cursor:'pointer'}}>
                <img src="logo4.png" alt="" className="logo" />
                <h3>UnarvAI</h3>
            </div>:<div className="headersLeft">
                <img src="logo4.png" alt="" className="logo" />
                <h3>UnarvAI</h3>
            </div>} */}
            

            {/* <i NamclassName="fa-solid fa-circle-user icon" onClick={()=>setUIconClick(!userIconCliked)}></i> */}
            
            {userUniqueId?<i className="fa-solid fa-circle-user icon" onClick={()=>setUIconClick(!userIconCliked)}></i>:
            isLogCLicked ? loggedIn ?
                <i className="fa-solid fa-circle-user icon" onClick={()=>setUIconClick(!userIconCliked)}></i> :
                <div className="forLogin">
                    <Login setLog={setLog} setWay={setWay} wayToLogin={wayToLogin} setUserId={setUserId} userUniqueId={userUniqueId} setLogClicked={setLogClicked} loggedIn={loggedIn} isLogCLicked={isLogCLicked}/>
                </div>
                : <div className="gettingIn">
                    {loginBtn?<div className="loginTxt" ref={loginBtn} onClick={() => {
                        setLogClicked(true);
                        setWay('login');
                    }} >
                        <p>Sign in</p>
                    </div>:<div className="loginTxt" onClick={() => {
                        setLogClicked(true);
                        setWay('login');
                    }} >
                        <p>Sign in</p>
                    </div>}
                </div>}

            {userIconCliked? <SideBar />:null }
        </div>

    )
}

export default Header;