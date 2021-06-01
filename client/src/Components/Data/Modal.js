import React from 'react';
import { Modal, Table } from "react-bootstrap";

export default function InfoModal(props) {

    return (
        <Modal
            show={props.show}
            onHide={props.handleModalClose}
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
                        <th scope="col">GPA</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.data.map(cl => {
                            return (
                                cl.courseList.map(course => {
                                    let c = course.course_offering
                                    return (
                                        <tr>
                                            <td>{c.quarter} {c.exact_year}</td>
                                            <td>{c.course.department}</td>
                                            <td>{c.course.number}</td>
                                            <td>{c.course.title}</td>
                                            <td>{c.instructors[0].name ? c.instructors[0].name : c.instructors[0].shortened_name}</td>
                                            <td>{c.section.code}</td>
                                            <td>{course.average_gpa}</td>
                                        </tr>
                                    );
                                })
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}