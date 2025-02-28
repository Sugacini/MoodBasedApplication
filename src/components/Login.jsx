import { useState, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

function Login({setLog, setWay, wayToLogin, setUserId, userUniqueId, setLogClicked}) {
    const [clicked,setClick] = useState(false);
    const [userIdErr,setIdErr] = useState(null);
    const [passwordErr,setPasswordErr] = useState(null);
    const name = useRef();
    const password = useRef();
    const userId = useRef();

     

    async function sigUpHandler(event) {
        var usersName = name.current.value;
        var usersUserId = userId.current.value;
        var usersPassword = password.current.value; 
        event.preventDefault();

        setUserId(usersUserId);
                      
        if (usersUserId.length<6 || usersPassword.length<8 || isNaN(usersPassword)==false || usersPassword.split('').some(x=>x>-1)==false) {
            if (usersUserId.length<6) {
                setIdErr('Minimum 6 characters required for user id');
            }
            else if(usersPassword.length<8){
                setIdErr(null);
                setPasswordErr('Minimum 8 characters required for user id');
            }
            else{
                setPasswordErr('Password must contain numbers and letters');
            }
        }
        else{
            setPasswordErr(null);
            var isIdAvailable;
            try {
                var idCheck = await fetch('http://localhost:3000/userIdCheck',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({userId:usersUserId})
                });
                isIdAvailable = await idCheck.json();
            } catch (error) {
                console.log(error);
            }
            if (!isIdAvailable) {
                
                setIdErr('UserId Already exists, try differently')
            }
            else{
                try {
                    console.log('atttempt to add account');
                    setLog(true);        
                    await fetch('http://localhost:3000/addAccount',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({userId:usersUserId, password:usersPassword, userName:usersName})
                    });
                    console.log('added.......');       
                } catch (error) {
                    console.log(error);
                }
            }
            console.log('added');   
        }
    }

    async function loginHandler(event) {
        event.preventDefault();
        console.log('yes');
        
        var usersUserId = userId.current.value;
        var usersPassword = password.current.value; 

        setUserId(usersUserId);

        try {
            var isCorrect = await fetch('http://localhost:3000/isValidUser',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({userId:usersUserId, password:usersPassword})
            });
            var isValid = await isCorrect.json();
            if(isValid){
                setLog(true);
            }
            else{
                setIdErr("Correct your username or password");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="loginBox">
            <div className="cancelLoginPage" onClick={()=>setLogClicked(false)}>
                <FaXmark />
            </div>
               

            {(wayToLogin=='login')?
            <form action="" className="signUpForm" onSubmit={loginHandler}>
            <h3 className="logHeading">Login</h3>
            <div className="inputParent">
                {userIdErr?<p className="errMsg">{userIdErr}</p>:<p className="opac">.</p>}
                <input className="inputBoxes" type="text" name="uerId" ref={userId} required autoComplete="off"/>
                <label htmlFor="uerId" className="labels">UserId</label>
            </div>
            <div className="inputParent">
                {passwordErr?<p className="errMsg">{passwordErr}</p>:<p className="opac">.</p>}
                <input className="inputBoxes" type="password" name="password" ref={password} required/>
                <label htmlFor="password" className="labels">Password</label>
            </div>
            <button className="signUpSubmitBtn" type="submit">Login</button>

            <p className="lastLineOfLogin">Are you a new User? <span className="underSmlLoginTxt" onClick={()=>setWay("SignUp")}> Sign up</span> </p>
        </form>
        :
        <form action="" className="signUpForm" onSubmit={sigUpHandler}>
                <h3 className="logHeading">Sign up</h3>
                <div className="inputParent">
                    <input className="inputBoxes" type="text" name="userName" ref={name} required autoComplete="off"/>
                    <label htmlFor="userName" className="nameLabel">Name</label>
                </div>
                <div className="inputParent">
                    {userIdErr?<p className="errMsg">{userIdErr}</p>:<p className="opac">.</p>}
                    <input className="inputBoxes" type="text" name="uerId" ref={userId} required autoComplete="off"/>
                    <label htmlFor="uerId" className="labels">UserId</label>
                </div>
                <div className="inputParent">
                    {passwordErr?<p className="errMsg">{passwordErr}</p>:<p className="opac">.</p>}
                    <input className="inputBoxes" type="password" name="password" ref={password} required/>
                    <label htmlFor="password" className="labels">Password</label>
                </div>
                <button className="signUpSubmitBtn" type="submit">Sign Up</button>

                <p className="lastLineOfLogin">Already have an account?<span className="underSmlLoginTxt" onClick={()=>setWay("login")}> Login</span></p>
            </form>
        }
            

            
            
        </div>
    )
}

export default Login;




























// import "./Login.css";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// function Login({change, setChange}){
//     console.log(change);

//     const navigate = useNavigate();

//     const userName = useRef();
//     const userPassword = useRef();
//     const msgError = useRef();

//     const[login, setLogin] = useState(true);

//     function signIn1(){
//         console.log("clicked");
//         setLogin(!login);
//         setChange(!change);
//     }

//     async function signIn(){
//         console.log("enter the sigin");
//         let uniqueId = userName.current.value;
//         let password = userPassword.current.value;
//         if(uniqueId && password){
//             let response=await fetch("http://localhost:3000/addUser",{
//                 method:"GET",
//                 // mode: "no-cors"
//             });
//             console.log(response);
//             let res = response.json();
//             let res2 = await res.then();
//             console.log(res2);
//             let isEmail = false;
//             for(let i=0; i<res2.length; i++){
//                 if((uniqueId == res2[i].userUniqueId) && (password == res2[i].password)){
//                     isEmail=true;
//                     console.log("The details is already exists");
//                     navigate("/home");
//                 }
//             }
//             if(!isEmail){
//                 userName.current.style.border = "2px solid red";
//                 userPassword.current.style.border="2px solid red";
//                 msgError.current.textContent = "UserId or password is invalid";

//                 // setTimeout(() => {
//                 //     userName.current.style.border = "none";
//                 //     userPassword.current.style.border="none";
//                 // },2000)
//             }
            
//         }
//         else{
//             setLogin(!login);
//             setChange(!change);
//         }
//         console.log("clicked");
        
//     }

//     if(change){
//         return(
//             <div className="login">
//                 <p className="signInHead">Sign In</p>
//                 <input type="email" placeholder="Enter your UserId" className="email" required ref={userName}></input>
//                 <input type="password" placeholder="Enter you password" className="password" required ref={userPassword} onKeyDown={(event) => {
//                     if(event.key == "Enter"){
//                         signIn();
//                     }
//                 }}></input>
//                 <p className="errorMsg" ref={msgError}></p>
//                 <button onClick={signIn} className="signInBtn" value="signin" >SIGN IN</button>
//             </div>
//         )
//     }
//     else{
//         return(
//             <div className="signin">
//                 <p className="heading">Already Have An Account!</p>
//                 <p className="desc">Register with your personal details to use all of features</p>
//                 <button onClick={signIn1} className="signUpBtn">SIGN IN</button>
//             </div>
//         )
//     }
    
// }

// export default Login;






















// import "./Login.css";
// import { useState } from "react";

// function Login({change, setChange}){

//     const[login, setLogin] = useState(true);

//     function signIn(){
//         console.log("clicked");
//         setLogin(!login);
//         setChange(!change);
//     }

//     if(change){
//         return(
//             <div className="login">
//                 <p className="signInHead">Sign In</p>
//                 <input type="email" placeholder="Enter your Email" className="email"></input>
//                 <input type="password" placeholder="Enter you password" className="password"></input>
//                 <button onClick={signIn} className="signInBtn" value="signin">SIGN IN</button>
//             </div>
//         )
//     }
//     else{
//         return(
//             <div className="signin">
//                 <p className="heading">Already Have An Account!</p>
//                 <p className="desc">Register with your personal details to use all of features</p>
//                 <button onClick={signIn} className="signUpBtn">SIGN IN</button>
//             </div>
//         )
//     }
    
// }

// export default Login;