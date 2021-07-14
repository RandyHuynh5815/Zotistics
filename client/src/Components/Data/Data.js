import React, { useEffect, useState } from 'react';
import {Row, Col, FormCheck, Button} from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import InfoModal from './Modal'
import ClassSideList from "./ClassSideList";
import InstructorSideList from "./InstructorSideList";

export default function Data(props) {
    const [instructorDisplay, setInstructorDisplay] = useState("none"); //display none or inherit
    const [classDisplay, setClassDisplay] = useState("none"); //display none or inherit
    const [sideInfoHeight, setSideInfoHeight] = useState("0px"); // max height for the side cards that changes on window resize
    const [chartSwitch, setChartSwitch] = useState(true); //true = percent, false = numbers
    const labels =  ['A', 'B', 'C', 'D', 'F', 'P', 'NP'];
    const [chartData, setChartData] = useState({labels:labels, datasets: props.graphDataPercent});
    const [show, setShow] = useState(false); // Modal display

    // caps viewable side list
    const MAX_INSTRUCTORS = 500
    const MAX_CLASSES = 500

    const handleModalClose = () => setShow(false);
    const handleModalShow = () => setShow(true);

    useEffect(() => {
        setChartData({labels:labels, datasets: props.graphDataPercent})
    }, [props.data])

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
                    color: props.nightMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" //change later
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
                    color: props.nightMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" //change later
                },
            }]
        }
        
    }


    useEffect(()=>updateChartOptions(), [chartSwitch])
    useEffect(()=>updateChartOptions(), [props.nightMode])
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
                        color: props.nightMode ?  "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" //change later
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
                        color: props.nightMode ?  "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" //change later
                    },
                }]
            }
        }
        setChartData({labels:labels, datasets: chartSwitch?props.graphDataPercent:props.graphDataPopulation});
    }

    return (
        <>
            <Row className="data-row">
                {/* Instructor Side List */}
                <Col sm={2} className="justify-content-center text-center px-0">
                    {props.instructorAmount <= MAX_INSTRUCTORS &&
                        <InstructorSideList
                            instructorDisplay={instructorDisplay}
                            sideInfoHeight={sideInfoHeight}
                            data={props.data}
                            setResults={props.setResults}
                            queryParams={props.queryParams}
                        />
                    }
                </Col>

                {/*middle section */}
                <Col sm={8}>
                    {/* Links to expand Instructor and Classes Lists */}
                    <Row className="justify-content-between d-flex mb-1 px-2" id="topDiv">
                        <div className="align-self-center">
                            {props.instructorAmount <= MAX_INSTRUCTORS
                                ? <Button variant='link' className="text-decoration-none shadow-none text-dark pl-0" onClick={displayInstructorList} style={{ cursor: "pointer", userSelect: "none" }}><span style={{ fontFamily: "Symbola" }}>&#x2B9C;</span> <u>{props.instructorAmount} Instructors</u></Button>
                                : <p className="text-decoration-none shadow-none text-dark m-0">{props.instructorAmount} Instructors</p>
                            }
                        </div>
                        <div className="text-center">
                            <h5 className="main-text-color">{props.data.length === 1 ? props.data[0].quarter + ' ' + props.data[0].year : 'Multiple'}</h5>
                        </div>
                        <div className="text-right align-self-center">
                            {props.classAmount <= MAX_CLASSES
                                ? <Button variant='link' className="text-decoration-none shadow-none text-dark pr-0" onClick={displayClassList} style={{ cursor: "pointer", userSelect: "none" }}><u>{props.classAmount} Classes</u><span style={{ fontFamily: "Symbola" }}> &#x2B9E;</span></Button>
                                : <p className="text-decoration-none shadow-none text-dark m-0">{props.classAmount} Classes</p>
                            }
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
                            <p className="main-text-color">GPA: {props.data.map(obj =>obj.averageGPA).join(", ")}</p>
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
                    {props.classAmount <= MAX_CLASSES &&
                        <ClassSideList
                            classDisplay={classDisplay}
                            sideInfoHeight={sideInfoHeight}
                            data={props.data}
                            setResults={props.setResults}
                            queryParams={props.queryParams}
                        />
                    }
                </Col>
            </Row>
            {props.classAmount <= MAX_CLASSES &&
                <InfoModal handleModalClose={handleModalClose} show={show} data={props.data} />
            }
        </>
    );
}