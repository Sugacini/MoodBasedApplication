import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Story from "./components/Story";
import Quotes from "./components/Quotes";
import Journel1 from "./components/Journel1";
import LoginPage from "./components/LoginPage";
import Features from "./components/Features";
import Home from "./components/Home";
import MusicPage from "./components/musicPage";
import ChatBot from "./components/ChatBot";
import HomePage from "./components/HomePage";
import SingleRecipe from "./components/SingleRecipe";
import Food from "./components/Food";
import Book from "./components/Book";
import SingleBook from "./components/SingleBook";
import Game from "./components/Game";
import TodaysMood from "./components/TodaysMood";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landingPage" element={<HomePage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/story" element={<Story />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/journel" element={<Journel1 />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/chatBot" element={<ChatBot />} />
        <Route path="/food" element={<Food />} />
        <Route path="/singleFood" element={<SingleRecipe />} />
        <Route path="/book" element={<Book />} />
        <Route path="/singleBook" element={<SingleBook />} />
        <Route path="/game" element={<Game />} />
        <Route path="/todaysMood" element={<TodaysMood />} />
      </Routes>
    </Router>
  )
}

export default App






























// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'


// function DynamicComponent({ id }) {
//   return <div className="dynamic">📌 New Div {id}</div>;
// }

// function App() {
//   const [components, setComponents] = useState([]);

//   const addDiv = () => {
//     const newComponent = <DynamicComponent key={components.length} id={components.length + 1} />;
//     setComponents([...components, newComponent]); // Append new div as a component
//   };

//   return (
//     <div className="container">
//       <button onClick={addDiv}>➕ Add Div</button>
//       <div className="component-container">
//         {components}
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }