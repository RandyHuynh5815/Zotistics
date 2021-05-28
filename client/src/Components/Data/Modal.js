import React from 'react';
import { Modal, Table } from "react-bootstrap";

export default function InfoModal(props) {

    return (
        <Modal
            show={props.show}
            onHide={props.handleModalClose}
            backdrop="static"
            keyboard={false}
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>Search Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped hover>
                    <thead>
                    <tr>
                        <th scope="col">Term</th>
                        <th scope="col">Dept</th>
                        <th scope="col">Number</th>
                        <th scope="col">Title</th>
                        <th scope="col">Instructor</th>
                        <th scope="col">Code</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.data.map(cl => {
                            return (
                                cl.courseList.map(course => {
                                    return (
                                        <tr>
                                            <td>{course.quarter} {course.year}</td>
                                            <td>{course.department}</td>
                                            <td>{course.number}</td>
                                            <td>title</td>
                                            <td>{course.instructor}</td>
                                            <td>{course.code}</td>
                                        </tr>
                                    )
                                })
                            )
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}