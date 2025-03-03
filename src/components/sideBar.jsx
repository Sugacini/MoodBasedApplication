import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();
    return (
        <div className="sideBar">
            <p onClick={() => {navigate("/todaysMood")}}>Today's mood</p>

            {/* <p>This week</p>

            <p>Change userId</p> */}

            <p className="logoutBtn" onClick={() => {navigate("/")}}>Log out</p>
        </div>
    )
    
}

export default SideBar;
