import React from 'react';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import Select from 'react-select';
import Home from '../Home/Home'
import Data from '../Data/Data'

const HOME = <Home />;
const DATA = <Data />;

const instructorOptions = [
    { value: 'PATTIS, R.', label: 'PATTIS, R.' },
    { value: 'THORNTON, A.', label: 'THORNTON, A.' },
    { value: 'KLEFSTAD, R.', label: 'KLEFSTAD, R.' }
];

const quarterOptions = [
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' }
];

const yearOptions = [
    { value: '2020-21', label: '2020-2021' },
    { value: '2019-20', label: '2019-2020' },
    { value: '2018-19', label: '2018-2019' }
];

export default class Search extends React.Component {
    state = {
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
        page: HOME, // what the page will display below the search forms (HOME or DATA)
        selectedInstructorOption: null, // used for react-select
        selectedQuarterOption: null,
        selectedYearOption: null
    }

    handleInstructorChange = selectedInstructorOption => {
        this.setState(
            { selectedInstructorOption },
            () => console.log(`Option selected:`, this.state.selectedInstructorOption)
        );
    };

    handleInputChange = (typedOption) => {
        if( typedOption.length > 1 ) {
            this.setState(
                { showOptions : true },
                () => console.log('Shown')
            )
        }
        else {
            this.setState(
                { showOptions : false },
            )
        }
    }

    handleQuarterChange = selectedQuarterOption => {
        this.setState(
            { selectedQuarterOption },
            () => console.log(`Option selected:`, this.state.selectedQuarterOption)
        );
    };

    handleYearChange = selectedYearOption => {
        this.setState(
            { selectedYearOption },
            () => console.log(`Option selected:`, this.state.selectedYearOption)
        );
    };

    handleSubmit = (e) => {
        e.preventDefault(); // prevents page refresh
        let newState = {};

        for(let x of e.target){
            newState[x.name] = x.value;
        }

        this.setState(() => (newState));

        fetch('/search', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newState)
        }).then(res => {this.setState({page: DATA})})
    }

    render() {
        const { selectedInstructorOption } = this.state;
        const { selectedQuarterOption } = this.state;
        const { selectedYearOption } = this.state;

        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="justify-content-center">
                        <Col className="col-sm-5">
                            {/*<Form.Control type="text" name="instructor" placeholder="Instructor Name" />*/}
                            <Select
                                value={selectedInstructorOption}
                                onChange={this.handleInstructorChange}
                                options={instructorOptions}
                                placeholder="Instructor"
                                onInputChange = {this.handleInputChange}
                                openMenuOnClick = {false}
                                components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                            />
                        </Col>
                        <Col className="col-sm-3">
                            {/*<Form.Control type="text" name="quarters" placeholder="Quarters" />*/}
                            <Select
                                isMulti
                                value={selectedQuarterOption}
                                onChange={this.handleQuarterChange}
                                options={quarterOptions}
                                placeholder="Quarters"
                                closeMenuOnSelect={false}
                                isSearchable={false}
                                components={{ IndicatorSeparator:() => null }}
                            />
                        </Col>
                        <Col className="col-sm-3">
                            {/*<Form.Control type="text" name="years" placeholder="School Year" />*/}
                            <Select
                                isMulti
                                value={selectedYearOption}
                                onChange={this.handleYearChange}
                                options={yearOptions}
                                placeholder="School Year"
                                closeMenuOnSelect={false}
                                isSearchable={false}
                                components={{ IndicatorSeparator:() => null }}
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col />
                        <Col>
                            <Row className="justify-content-center">
                                <Col>
                                    <Form.Group className="text-center">
                                        <Button as="input" type="submit" name="submit" value="Submit" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col />
                    </Row>
                </Form>
                {this.state.page}
            </Container>
        );
    }
}