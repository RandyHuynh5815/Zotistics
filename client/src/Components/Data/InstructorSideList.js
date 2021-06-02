import React, {useState} from "react";
import './Data.css'
import {Card, Dropdown} from "react-bootstrap";

export default function InstructorSideList({ instructorDisplay, sideInfoHeight, data }) {
    const [instructors , setInstructors] = useState(data);

    const handleSortAmount = (e) => {
        e.preventDefault();
        let result = JSON.parse(JSON.stringify(instructors)); // deep copy

        for(let i = 0; i < instructors.length; i++){
            result[i].sort((a, b) => b.count - a.count); // sorts descending
        }

        setInstructors(result);
    }

    const handleSortName = (e) => {
        e.preventDefault();
        let result = JSON.parse(JSON.stringify(instructors)); // deep copy

        for(let i = 0; i < instructors.length; i++){
            result[i].sort((a, b) => {
                let fa = a.name.toLowerCase()
                let fb = b.name.toLowerCase();

                // sorts ascending
                if (fa < fb) { return -1; }
                if (fa > fb) { return 1; }
                return 0;
            });
        }

        setInstructors(result);
    }

    return (
        <div style={{ display: instructorDisplay}}>
            <Dropdown className="text-right">
                <Dropdown.Toggle size="sm" className="sidelist-sort-btn">
                    Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item value="amount" onClick={handleSortAmount}>Amount</Dropdown.Item>
                    <Dropdown.Item value="name" onClick={handleSortName}>Name</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Card className="overflow-auto shadow-sm" style={{ maxHeight: sideInfoHeight }}>
                <Card.Body className="px-0">
                    <h5 className="card-title mb-0">Instructors</h5>
                    {instructors.map((x, idx) => (
                        <div key={idx}>
                            {x.map((j, idxn) => (
                                <p key={idxn} className="card-text text-decoration-none my-2" >{j.name} • {j.count}</p>
                            ))}
                            {idx < instructors.length - 1 &&
                                <p className="p-0 m-0">---</p>
                            }
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
}