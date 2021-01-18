import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import './searchform.css';
const dep = require('./departments')

//TODO: load options from db?


//http://api.peterportal.org/docs/REST-API/endpoints/#parameters_4
// const instructors = [
//     { name: 'Alex Thornton', value: 'THORNTON, A.' },
//     { name: 'Richard Pattis', value: 'PATTIS, R.' },
//     { name: 'Michael Shindler', value: 'SHINDLER, M.' },
// ];

const quarters = [
    { name: 'Fall', value: 'Fall' },
    { name: 'Winter', value: 'Winter' },
    { name: 'Spring', value: 'Spring' },
    { name: 'Summer', value: 'Summer' },
];

const years = [
    { name: '2020-2021', value: '2020-21' },
    { name: '2019-2020', value: '2019-20' },
    { name: '2018-2019', value: '2018-19' },
    { name: '2017-2018', value: '2017-18' },
    { name: '2016-2017', value: '2016-17' },
    { name: '2015-2016', value: '2015-16' },
    { name: '2014-2015', value: '2014-15' },
];


const departments = dep.departments;


function RenderOptions({options}){

}

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = props.handleValueChange;
        this.handleFormSubmit = props.handleFormSubmit;
    }

    render() {
        let instructors = []

        if(this.props.instructors !== []){
            instructors = this.props.instructors;
        }

        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Row className="justify-content-center search-form-row">
                    <Col className="col-sm-5">
                        
                        <SelectSearch
                            options={instructors}
                            filterOptions={(q, options) => {
                                return options.slice(0, 4);
                            }}
                            search 
                            name="instructors"
                            onChange={(val) => this.handleValueChange({ name: "instructor", value: val })}
                            placeholder="Instructor Name"
                        />
                    </Col>
                    <Col className="col-sm-3">
                        <SelectSearch
                            closeOnSelect={false}
                            printOptions="on-focus"
                            multiple
                            name="quarters"
                            onChange={(val) => this.handleValueChange({ name: "quarters", value: val })}
                            placeholder="Quarters"
                            options={quarters}
                        />
                    </Col>
                    <Col className="col-sm-3">
                        <SelectSearch
                            closeOnSelect={false}
                            printOptions="on-focus"
                            name="years"
                            onChange={(val) => this.handleValueChange({ name: "years", value: val })}
                            multiple
                            placeholder="Years"
                            options={years}
                        />
                    </Col>
                </Row>

                <Row className="justify-content-center search-form-row">
                    <Col className="col-sm-5">
                        <SelectSearch
                            options={departments}
                            search fuzzy
                            name="department"
                            onChange={(val) => this.handleValueChange({ name: "department", value: val })}
                            placeholder="All Departments"
                        />
                    </Col>
                    <Col className="col-sm-3">
                        <Form.Control
                            onChange={(val) => this.handleValueChange({ name: "classNumber", value: val.target.value })}
                            className="search-text-box" type="text" placeholder="Class Number (Ex. 45C)" />
                    </Col>
                    <Col className="col-sm-3">
                        <Form.Control
                            onChange={(val) => this.handleValueChange({ name: "classCode", value: val.target.value })}
                            className="search-text-box" type="text" placeholder="Class Code (Ex. 34060)" />
                    </Col>
                </Row>


                <Row className="justify-content-center search-form-row">
                    <Col>
                        <Form.Group className="text-center">
                            <Button id="submit-button" as="input" type="submit" name="submit" value="Submit" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        );
    }

}

export default SearchForm;