
import React from 'react';
import './dog.css'
import DogglesImg from './doggles.png'




export default function Dog({nightMode, setNightMode}){
    return (
        <div id = "dog">
            <img className = "" onClick={()=>setNightMode(!nightMode)} src={DogglesImg} alt="Logo" />
        </div>
    );
    
}
