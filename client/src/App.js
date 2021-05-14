import React, {useState, useEffect} from 'react'
import './App.css';
import Dog from './Components/Dog/Dog'
import NavBar from './Components/NavBar/NavBar'
import Search from "./Components/Search/Search";





export default function App() {
    const [nightMode, setNightMode] = useState(false);

    useEffect(()=>updateColors(), [nightMode]);

    const updateColors = ()=> {
        //switches some colors around
        let root = document.body;
        if(nightMode){
            root.style.setProperty('--main-bg-color', '#111111');
            root.style.setProperty('--main-text-color', 'hsl(210, 17%, 98%)');
            root.style.setProperty('--secondary-bg-color', '#424242');
            root.style.setProperty('--secondary-text-color', '#eeeaea');
        }else{
            root.style.setProperty('--main-bg-color', 'hsl(210, 17%, 98%)');
            root.style.setProperty('--main-text-color', '#111111');
            root.style.setProperty('--secondary-bg-color', '#eeeaea');
            root.style.setProperty('--secondary-text-color', '#424242');
        }
    }


    return (
        <>
            <NavBar/>
            <Search nightMode={nightMode}/>
            <Dog nightMode={nightMode} setNightMode={setNightMode}/>
        </>
    );
}
