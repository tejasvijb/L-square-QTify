import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <Section type="top" />
            <Section type="new" />
        </div>
    );
}

export default App;
