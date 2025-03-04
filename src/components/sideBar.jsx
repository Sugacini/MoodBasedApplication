import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();
    return (
        <div className="sideBar">
            <div className="triangle"></div>
            {/* <p onClick={() => {navigate("/todaysMood")}}>Today's mood</p> */}

            <p onClick={() => {navigate("/pastSevendays")}}>Statistics</p>

            {/* <p>Change userId</p> */}

            <p className="logoutBtn" onClick={() => {
                console.log('clicked');
                
                sessionStorage.clear();
                navigate("/");
                }}>Log out</p>
        </div>
    )
    
}

export default SideBar;
