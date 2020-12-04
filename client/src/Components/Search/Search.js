import React from 'react';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import Home from '../Home/Home'
import Data from '../Data/Data'

const HOME = <Home />;
const DATA = <Data />;

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
        page: HOME // what the page will display below the search forms (HOME or DATA)
    }

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
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="justify-content-center">
                        <Col className="col-sm-5">
                            <Form.Control type="text" name="instructor" placeholder="Instructor Name" />
                        </Col>
                        <Col className="col-sm-3">
                            <Form.Control type="text" name="quarters" placeholder="Quarters" />
                        </Col>
                        <Col className="col-sm-3">
                            <Form.Control type="text" name="years" placeholder="School Year" />
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