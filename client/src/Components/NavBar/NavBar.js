import React from 'react';
import './NavBar.css'
import {Navbar, Nav, Container, Col} from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar id="navbar" className="py-0 mb-2" expand="sm">
            <Container className="justify-content-center">
                <Col />
                <Col className="text-center">
                    <a href="/" className="text-decoration-none p-0 m-0" id="logo">Zotistics</a>
                </Col>
                <Col className="">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/" className="tabLinks">Info</Nav.Link>
                            <Nav.Link href="/" className="tabLinks">Feedback</Nav.Link>
                            <Nav.Link href="/" className="tabLinks">Donate</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Col>
            </Container>
        </Navbar>
    );
}