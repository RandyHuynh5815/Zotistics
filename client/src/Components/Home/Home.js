import React, {useState} from 'react';
import {Form, Row, Col, Card, Collapse } from 'react-bootstrap';

export default function Home() {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Row className="row justify-content-center mt-5">
            <Col className="col-sm-7 justify-content-center">
                <Form.Group className="form-group text-center">
                    <p><strong>Search for any combination of grade distributions</strong></p>
                </Form.Group>

                <div className="text-center">
                    <p className="" id="disclaimer" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="collapseDisclaimer">
                        <span style={{ cursor: 'pointer' }}>Notes </span>
                        <span id="disclaimerArrow" style={{ fontFamily: "Symbola", cursor: 'pointer' }}>&#x2B9F;</span>
                    </p>
                </div>

                <Collapse in={open}>
                    <div id="collapseDisclaimer">
                        <Card className="card card-body bg-theme-secondary">
                            Small classes (under 10 students) are excluded due to privacy concerns and classes that did not have
                            completed
                            data at the time it was queried are also excluded.
                        </Card>
                    </div>
                </Collapse>
            </Col>
        </Row>

        <div className="d-none d-sm-block">
            <div className="row justify-content-center">
                <p><i>Last Grade Update: Summer 2020</i></p>
            </div>
        </div>
        </>
    )
}