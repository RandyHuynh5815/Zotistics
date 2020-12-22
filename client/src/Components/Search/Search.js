import React from 'react';
import {Container} from 'react-bootstrap';
import Home from '../Home/Home'
import Data from '../Data/Data'
import SearchForm from './SearchForm'
const HOME = <Home />;
const DATA = <Data />;

class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            instructor: '',
            quarters: [],
            years: [],
            department: [],
            classNumber: '',
            classCode: '',
            passNoPass: false,
            covid: false,
            lowerDiv: false,
            upperDiv: false,
            page: HOME // what the page will display below the search forms (HOME or DATA)
        };
    }
    

    handleValueChange = (e) => {
        console.log(e);
        let newState = this.state;
        newState[e.name] = e.value;
        this.setState(() => (newState));
        console.log(this.state);
    }

    handleFormSubmit = (e) =>{
        console.log("form submit called");
        e.preventDefault();
        fetch('/search', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({page: DATA});
            console.log("Got count: "+data.count)
        })
    }

    render() {
        return (
            <Container>
                <SearchForm 
                    handleValueChange={this.handleValueChange} 
                    handleFormSubmit={this.handleFormSubmit}
                />
                {this.state.page}
            </Container>
        );
    }
}


export default Search;