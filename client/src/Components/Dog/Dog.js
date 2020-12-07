
import React from 'react';
import './dog.css'
import DogglesImg from './doggles.png'
import {toggleNightMode} from './dark'
class Dog extends React.Component{
    dark = ()=>{
        toggleNightMode();
        this.forceUpdate();
    }
    render(){
        return (
        <div id = "dog">
            <img className = "slideInRight animated" onClick={this.dark} src={DogglesImg} alt="Logo" />
        </div>
        );
    }
}

export default Dog;