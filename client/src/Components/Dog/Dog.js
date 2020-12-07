
import React from 'react';
import './dog.css'
import DogglesImg from './doggles.png'

class Dog extends React.Component{
    render(){
        return (
        <div id = "dog">
            <img src={DogglesImg} alt="Logo" />
        </div>
        );
    }
}

export default Dog;