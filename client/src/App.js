import React from 'react'
import './App.css';
import Dog from './Components/Dog/Dog'
import NavBar from './Components/NavBar/NavBar'
import Search from "./Components/Search/Search";
import {Slide} from 'react-reveal';
function App() {
    return (
        <div>
            <Slide top >
                <NavBar/>
            </Slide>
            <Slide bottom>
                <Search />
            </Slide>
            <Dog />
        </div>
    );
}

export default App;
