import React, {useState} from "react";
import './Data.css'
import {Card, Dropdown} from "react-bootstrap";

export default function InstructorSideList({ instructorDisplay, sideInfoHeight, data }) {
    const [instructors , setInstructors] = useState(data);

    const handleSortAmount = (e) => {
        e.preventDefault();
        let result = JSON.parse(JSON.stringify(instructors));

        for(let i = 0; i < instructors.length; i++){
            result[i].sort((a, b) => b.count - a.count);
        }

        setInstructors(result);
    }

    const handleSortName = (e) => {
        e.preventDefault();
        let result = JSON.parse(JSON.stringify(instructors));

        for(let i = 0; i < instructors.length; i++){
            result[i].sort((a, b) => {
                let fa = a.name.toLowerCase()
                let fb = b.name.toLowerCase();

                if (fa < fb) { return -1; }
                if (fa > fb) { return 1; }
                return 0;
            });
        }

        setInstructors(result);
    }

    return (
        <Card className="overflow-auto shadow-sm" style={{ display: instructorDisplay, maxHeight: sideInfoHeight }} id="profList">
            <Card.Body className="px-0">
                <h5 className="card-title mb-0">Instructors</h5>
                <Dropdown>
                    <Dropdown.Toggle size="sm" className="sidelist-sort-btn mb-1">
                        Sort
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item value="amount" onClick={handleSortAmount}>Amount</Dropdown.Item>
                        <Dropdown.Item value="name" onClick={handleSortName}>Name</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {instructors.map((x, idx) => (
                    <>
                        {x.map((j, idx) => (
                            <p key={idx} className="card-text text-decoration-none my-1" >{j.name} • {j.count}</p>
                        ))}
                        {idx < instructors.length - 1 &&
                            <p key={idx} className="p-0 m-0">---</p>
                        }
                    </>
                ))}
            </Card.Body>
        </Card>
    );
}