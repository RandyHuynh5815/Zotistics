import React, { useEffect, useState } from 'react';
import {Row, Col, FormCheck, Button, Card, Accordion} from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import InfoModal from './Modal'


export const InstructorsSideList = ({ instructorDisplay, sideInfoHeight, data }) => {
    return (
        <Card className="overflow-auto shadow-sm" style={{ display: instructorDisplay, maxHeight: sideInfoHeight }} id="profList">
            <Card.Body className="px-0">
                <h5 className="card-title">Instructors</h5>
                {data.map(x => {
                    return (
                        Object.entries(x.instructors).map(([key, value], idx) => {
                            return <p key={idx} className="card-text text-decoration-none" >{key} • {value}</p>
                        })
                    )
                })}
            </Card.Body>
        </Card>
    );
}


export const ClassSideList = ({classDisplay, sideInfoHeight, data}) => {
    return (
        <Card className="overflow-auto shadow-sm" style={{ display: classDisplay, maxHeight: sideInfoHeight }} id="cardList">
            <Card.Body className="px-0">
                <h5 className="card-title mb-0">Classes</h5>
                <p style={{ fontSize: "0.75rem" }}><i>Click class to expand</i></p>
                {data.map(x => {
                    return (
                        Object.entries(x.classes).map(([key, value], idx) => {
                            return (
                                <Accordion key={idx}>
                                    <Accordion.Toggle className="text-decoration-none shadow-none text-dark" as={Button} variant="link" eventKey="0">
                                        {key} • {value.count}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            {value.courses.map((j, idx) => {
                                                return (
                                                    <Card.Text key={idx} style={{fontSize: '0.7rem'}}>{j.year} {j.quarter} - {j.code}</Card.Text>
                                                )
                                            })}
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                            )
                        })
                    )
                })}
            </Card.Body>
        </Card>);
}





export default function Data({data, nightMode, graphDataPopulation, graphDataPercent}) {
    const [instructorAmount] = useState(data.map(x => Object.keys(x.instructors).length).reduce((a, b) => a + b));
    const [classAmount] = useState(data.map(x => x.count).reduce((a, b) => a + b));
    const [instructorDisplay, setInstructorDisplay] = useState("none"); //display none or inherit
    const [classDisplay, setClassDisplay] = useState("none"); //display none or inherit
    const [sideInfoHeight, setSideInfoHeight] = useState("0px"); // max height for the side cards that changes on window resize
    const [chartSwitch, setChartSwitch] = useState(true); //true = percent, false = numbers
    const labels =  ['A', 'B', 'C', 'D', 'F', 'P', 'NP'];
    const [chartData, setChartData] = useState({labels:labels, datasets: graphDataPercent});
    const [show, setShow] = useState(false); // Modal display

    const handleModalClose = () => setShow(false);
    const handleModalShow = () => setShow(true);

    var options = {
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        animation: { duration: 1000 },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    color: nightMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" //change later
                },
                scaleLabel: {
                    display: true,
                    labelString: chartSwitch?"Percent":"Students"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: false,
                    labelString: 'Grade'
                },
                gridLines: {
                    color: nightMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" //change later
                },
            }]
        }
        
    }


    useEffect(()=>updateChartOptions(), [chartSwitch])
    useEffect(()=>updateChartOptions(), [nightMode])
    useEffect(() => init(), []);
    //when gradelistpercentage changes, set chart data to it

    const init = () => {
        //stuff to run at start
        resizeSideLists();
        window.addEventListener("resize", resizeSideLists);
    }

    const resizeSideLists = () => {
        let height = document.getElementById('graphDiv').offsetHeight + document.getElementById('topDiv').offsetHeight;
        setSideInfoHeight(height.toString() + "px");
    }

    const displayInstructorList = (e) => {
        e.preventDefault();
        if (instructorDisplay === "none") {
            setInstructorDisplay("inherit");
        } else {
            setInstructorDisplay("none");
        }
    }

    const displayClassList = (e) => {
        e.preventDefault();
        if (classDisplay === "none") {
            setClassDisplay("inherit");
        } else {
            setClassDisplay("none");
        }
    }

    const updateChartOptions = () =>{
        options = {
            responsive: true,
            maintainAspectRatio: true,
            legend: { display: false },
            animation: { duration: 1000 },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: nightMode ?  "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" //change later
                    },
                    scaleLabel: {
                        display: true,
                        labelString: chartSwitch?"Percent":"Students"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: false,
                        labelString: 'Grade'
                    },
                    gridLines: {
                        color: nightMode ?  "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" //change later
                    },
                }]
            }
        }
        setChartData({labels:labels, datasets: chartSwitch?graphDataPercent:graphDataPopulation});
    }

    return (
        <>
            <Row className="data-row">
                {/* Instructor Side List */}
                <Col sm={2} className="justify-content-center text-center px-0">
                    <InstructorsSideList
                        instructorDisplay={instructorDisplay}
                        sideInfoHeight={sideInfoHeight}
                        data={data}
                    />
                </Col>

                {/*middle section */}
                <Col sm={8}>
                    {/* Links to expand Instructor and Classes Lists */}
                    <Row className="justify-content-between d-flex mb-1 px-2" id="topDiv">
                        <div className="flex-even">
                            <Button variant='link' className="text-decoration-none shadow-none text-dark pl-0" onClick={displayInstructorList} style={{ cursor: "pointer", userSelect: "none" }}><span style={{ fontFamily: "Symbola" }}>&#x2B9C;</span> <u>{instructorAmount} Instructors</u></Button>
                        </div>
                        <div className="flex-even text-center">
                            <h5 className="main-text-color">{data.length === 1 ? data[0].quarter + ' ' + data[0].year : 'Multiple'}</h5>
                        </div>
                        <div className="flex-even text-right">
                            <Button variant='link' className="text-decoration-none shadow-none text-dark pr-0" onClick={displayClassList} style={{ cursor: "pointer", userSelect: "none" }}><u>{classAmount} Classes</u><span style={{ fontFamily: "Symbola" }}> &#x2B9E;</span></Button>
                        </div>
                    </Row>

                    {/* Graph */}
                    <Row className="justify-content-center" id="graphDiv">
                        <Col sm={12}>
                            <Bar
                                data={chartData}
                                width={100}
                                height={50}
                                options={options}
                            />
                        </Col>
                    </Row>

                    {/* Buttons and GPA */}
                    <Row className="justify-content-center">
                        <Col sm={3}>
                            <Button variant="outline-secondary" size="sm" onClick={handleModalShow}>
                                Details
                            </Button>
                        </Col>
                        <Col sm={6} className="text-center">
                            <p className="main-text-color">GPA: {data.map(obj =>obj.averageGPA).join(", ")}</p>
                        </Col>
                        <Col sm={3} className="text-right">
                            <FormCheck
                                id="chartSwitch"
                                type="switch"
                                checked={chartSwitch}
                                onChange={()=>setChartSwitch(!chartSwitch)}
                                onClick={e => e.target.blur()}
                                label="Numbers"
                            />
                        </Col>
                    </Row>
                </Col>

                {/* Class Side List*/}
                <Col sm={2} className="justify-content-center text-center px-0">
                    <ClassSideList
                        classDisplay={classDisplay}
                        sideInfoHeight={sideInfoHeight}
                        data={data}
                    />
                </Col>
            </Row>
            <InfoModal handleModalClose={handleModalClose} show={show} data={data} />
        </>
    );
}