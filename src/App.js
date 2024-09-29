import React from "react";
import Menu from "./Menu/Menu";
import Hero from "./Hero/Hero";
import HomePage from "./HomePage/HomePage";
import Footer from "./Footer/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import AboutPage from "./AboutPage/AboutPage";

function App() {
    return (
        <Router>
            <Menu/>
            <Hero/>
            <div className="mainContainer">
                <Routes>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    {/*<Route path="/" element={<HomePage/>}/>*/}
                </Routes>
            </div>
            <HomePage/>
            <Footer/>
        </Router>
    );
}

export default App;
