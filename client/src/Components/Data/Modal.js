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
                                            <td>{c.course ? c.course.department : "dept"}</td>
                                            <td>{c.course ? c.course.number : "num"}</td>
                                            <td>{c.course ? c.course.title : "title"}</td>
                                            <td>{c.instructors[0].name}</td>
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