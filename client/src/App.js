import React from 'react'
import './App.css';
import Dog from './Components/Dog/Dog'
import NavBar from './Components/NavBar/NavBar'
import Search from "./Components/Search/Search";

function App() {
    return (
        <div>
            <NavBar />
            <Search />
            <Dog />
        </div>
    );
}

export default App;
