import { useState } from "react";
import Context from "./SignUp1";


function CreateProvider({ children }){
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Context.Provider value={{ isSignUp, setIsSignUp }}>
      {children}
    </Context.Provider>
  )
}

export default CreateProvider;



// import Login from "./Login";
// import SignUp from "./SignUp";
// import "./Login.css";
// import CreateProvider from "./Login1";

// function LoginPage(){

//     return(
//         <div className="loginPage">
//             <CreateProvider>
//                 <Content></Content>
//             </CreateProvider>
//         </div>
//     )
// }

// function Content(){
//     const { isSignUp } = CreateProvider();
//     return <div>{isSignUp ? <SignUp /> : <SignIn />}</div>;
// }

// export default LoginPage;



// import { ClickProvider } from "./Login1";
// import ButtonOne from "./SignUp1";
// import ButtonTwo from "./Login";

// function App() {
//   return (
//     <ClickProvider>
//       <ButtonOne />
//       <ButtonTwo />
//     </ClickProvider>
//   );
// }

// export default App;



























// import "./Login.css";

// function Login1(){

//     function signIn(){
//         console.log("Enter");
//     }

//     return(
//         <div className="signUp">
//             <p className="heading">Hello, Friend!</p>
//             <p className="desc">Register with your personal details to use all of features</p>
//             <button onClick={signIn} className="signUpBtn">SIGN IN</button>
//         </div>
//     )
// }

// export default Login1;