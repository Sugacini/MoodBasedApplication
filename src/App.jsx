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
import NotDetected from "./components/NotDetected";
import PastSevenDays from "./components/PastSevendays";

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
        <Route path="/notDetect" element={<NotDetected />} />
        <Route path="/pastSevenDays" element={<PastSevenDays />} />

      </Routes>
    </Router>
  )
}

export default App