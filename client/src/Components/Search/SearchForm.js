import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import './searchform.css';

//temp
const instructors = [
    { name: 'Alex Thornton', value: 'ics-at' },
    { name: 'Richard Pattis', value: 'ics-rp' },
    { name: 'Michael Shindler', value: 'ics-ms' },
];

const quarters = [
    { name: 'Fall', value: 'fa' },
    { name: 'Winter', value: 'wi' },
    { name: 'Spring', value: 'sp' },
    { name: 'Summer', value: 'su' },
];

const years = [
    { name: '2020-2021', value: '21' },
    { name: '2019-2020', value: '20' },
    { name: '2018-2019', value: '19' },
    { name: '2017-2018', value: '18' },
    { name: '2016-2017', value: '17' },
    { name: '2015-2016', value: '16' },
    { name: '2014-2015', value: '15' },
];


const departments = [
    { name: 'All Departments', value: 'all' },
    { name: 'STATS', value: 'stats' },
    { name: 'COMPSCI', value: 'compsci' },
    { name: 'ICS', value: 'ics' },
    { name: 'IN4MATX', value: 'ics' },
];


export const SearchForm = ({handleSubmit}) => {


    const handleFormSubmit = (e) =>{
        e.preventDefault();
    }

    return (
        <Form onSubmit = {handleFormSubmit}>
            <Row className="justify-content-center search-form-row">
                <Col className="col-sm-5">
                    <SelectSearch
                        options={instructors}
                        search fuzzy
                        name="instructors"
                        onChange={(val) => handleSubmit({name: "instructor", value:val})}
                        placeholder="Instructor Name"
                    />
                </Col>
                <Col className="col-sm-3">
                    <SelectSearch
                        closeOnSelect={false}
                        printOptions="on-focus"
                        multiple
                        name="quarters"
                        onChange={(val) => handleSubmit({name: "quarters", value:val})}
                        placeholder="Quarters"
                        options={quarters}
                    />
                </Col>
                <Col className="col-sm-3">
                    <SelectSearch
                        closeOnSelect={false}
                        printOptions="on-focus"
                        name="years"
                        onChange={(val) => handleSubmit({name: "years", value:val})}
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
                        onChange={(val) => handleSubmit({name: "department", value:val})}
                        placeholder="All Departments"
                    />
                </Col>
                <Col className="col-sm-3">
                    <Form.Control className="search-text-box" type="text" placeholder="Class Number (Ex. 45C)" />
                </Col>
                <Col className="col-sm-3">
                    <Form.Control className="search-text-box" type="text" placeholder="Class Code (Ex. 34060)" />
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

export default SearchForm;