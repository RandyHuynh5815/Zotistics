import React, {useEffect, useState} from "react";
import {CaretDownFill} from 'react-bootstrap-icons'
import {Accordion, Button, Card, Dropdown, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {calculateData} from "../Search/calculations";
import './Data.css'

export default function ClassSideList(props){
    const [courses , setCourses] = useState(props.data.map(x => x.classes)); // condensed data

    // useEffect(() => {
    //     setCourses(props.data.map(x => x.classes))
    // }, [props.data])

    const handleSortAmount = (e) => {
        e.preventDefault();
        let result = JSON.parse(JSON.stringify(courses)); // deep copy

        for(let i = 0; i < courses.length; i++){
            result[i].sort((a, b) => b.count - a.count); // sorts descending
        }

        setCourses(result);
    }

    const handleSortName = (e) => {
        e.preventDefault();
        let result = JSON.parse(JSON.stringify(courses)); // deep copy

        for(let i = 0; i < courses.length; i++){
            result[i].sort((a, b) => {
                // tokenizes string (dept_code course_num)
                let aSplit = a.name.toLowerCase().split(' ')
                let bSplit = b.name.toLowerCase().split(' ')

                // remove alphabetic characters from class number and removed from previous array
                let aNum = parseInt(aSplit.pop().replace(/\D/g, ''));
                let bNum = parseInt(bSplit.pop().replace(/\D/g, ''));

                // turns the array into a string excluding the course number
                let aa = aSplit.join(' ');
                let bb = bSplit.join(' ')

                // compares department code
                // sorts ascending
                if (aa < bb) { return -1; }
                if (aa > bb) { return 1; }

                // if both dept codes are the same, it compares the course number
                return aNum - bNum; // sorts ascending
            });
        }

        setCourses(result);
    }

    const removeCourse = (e, idx, dept, num) => {
        e.preventDefault();
        let result = JSON.parse(JSON.stringify(props.data));
        let cl = result[idx].courseList;

        for(let i = cl.length - 1; i >= 0; i--){
            if(cl[i].course_offering.course.department === dept && cl[i].course_offering.course.number === num){
                cl.splice(i, 1);
            }
        }

        let final = calculateData(result[idx].courseList, props.queryParams, undefined, false)
        final.color = result[idx].color
        result[idx] = final
        props.setResults(result);
    }

    return (
        <div style={{ display: props.classDisplay }}>
            <Dropdown className="text-left">
                <Dropdown.Toggle size="sm" className="sidelist-sort-btn">
                    Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item value="amount" onClick={handleSortAmount}>Amount</Dropdown.Item>
                    <Dropdown.Item value="name" onClick={handleSortName}>Name</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Card className="overflow-auto shadow-sm" style={{ maxHeight: props.sideInfoHeight }}>
                <Card.Body className="px-0">
                    <h5 className="card-title mb-0">Classes</h5>
                    {courses.map((x, i) => (
                        <div key={i}>
                        {x.map((c, idx) => (
                            <Accordion key={idx} className="mb-1">
                                <ToggleButtonGroup type="checkbox" className="">
                                    <ToggleButton className="sidelist-item px-1" id="tbg-check-2" value={1} onClick={e => e.target.blur()}>
                                        {c.name} • {c.count}
                                    </ToggleButton>
                                </ToggleButtonGroup>

                                <Accordion.Toggle className="card-text text-decoration-none shadow-none sidelist-item px-1" as={Button}
                                                  variant="link" eventKey="0">
                                    <CaretDownFill fontSize="0.65rem"/>
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        {c.courses.map((j, idx) => (
                                                <Card.Text key={idx} style={{fontSize: '0.7rem'}}>{j.year} {j.quarter} - {j.code}</Card.Text>
                                            )
                                        )}
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>
                        ))}
                        {i < courses.length - 1 &&
                        <p className="p-0 m-0">---</p>
                        }
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
}