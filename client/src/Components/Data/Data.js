import React, { useEffect, useState } from 'react';
import { Row, Col, FormCheck } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import "./Data.css";


export const InstructorsSideList = ({ instructorDisplay, sideInfoHeight, data }) => {
    return (
        <div className="card overflow-auto" style={{ display: instructorDisplay, maxHeight: sideInfoHeight }} id="profList">
            <div className="card-body px-0">
                <h5 className="card-title">Instructors</h5>
                {data.map(x => {
                    return (
                        Object.entries(x.instructors).map(([key, value], idx) => {
                            return <p key={idx} className="card-text text-decoration-none" style={{ color: "#212529" }}>{key} • {value}</p>
                        })
                    )
                })}
            </div>
        </div>
    );
}


export const ClassSideList = ({classDisplay, sideInfoHeight, data}) => {
    return (
        <div className="card overflow-auto" style={{ display: classDisplay, maxHeight: sideInfoHeight }} id="cardList">
            <div className="card-body px-0">
                <h5 className="card-title mb-0">Classes</h5>
                <p style={{ fontSize: "0.75rem" }}><i>Click class to expand</i></p>
                {data.map(x => {
                    return (
                        Object.entries(x.classes).map(([key, value], idx) => {
                            return (
                                <p key={idx} className="card-text text-decoration-none" style={{ color: "#212529" }}>{key} • {value.count}</p>
                            )
                        })
                    )
                })}
            </div>
        </div>);
}





export default function Data({data, graphData, nightMode }) {
    const [gradeListPopulation, setGradeListPopulation] = useState([data[0].a, data[0].b, data[0].c, data[0].d, data[0].f, data[0].p, data[0].np]);
    const sum = gradeListPopulation.reduce((a, b) => a + b);
    const [gradeListPercentage, setGradeListPercentage] = useState(gradeListPopulation.map(grade => ((grade / sum) * 100).toFixed(1)));
    const [instructorAmount, setInstructorAmount] = useState(data.map(x => Object.keys(x.instructors).length).reduce((a, b) => a + b));
    const [chartData, setChartData] = useState(gradeListPercentage);
    const [classAmount, setClassAmount] = useState(data.map(x => x.count).reduce((a, b) => a + b));
    const [instructorDisplay, setInstructorDisplay] = useState("none"); //display none or inherit
    const [classDisplay, setClassDisplay] = useState("none"); //display none or inherit
    const [sideInfoHeight, setSideInfoHeight] = useState("0px"); // max height for the side cards that changes on window resize
    const [chartSwitch, setChartSwitch] = useState(false);
    const [chartLabelY, setChartLabelY] = useState("Percent"); // Percent or Students
    const labels =  ['A', 'B', 'C', 'D', 'F', 'P', 'NP'];

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
                    labelString: chartLabelY
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


    useEffect(()=>updateChartOptions(), [chartLabelY, nightMode])
    useEffect(() => init(), []);
    //when gradelistpercentage changes, set chart data to it
    useEffect(() => setChartData(gradeListPercentage), [gradeListPercentage]);

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

    const changeChart = () => {
        if (!this.state.chartSwitch) {
            setChartData(gradeListPopulation);
            setChartLabelY("Students");
        } else {
            this.setState({ chartData: this.state.gradeListPercentage, chartLabelY: "Percent" });
            setChartData(gradeListPercentage);
            setChartLabelY("Percent");
        }
        setChartSwitch(!chartSwitch);
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
                        labelString: chartLabelY
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
                            <a className="side-list-link" onClick={displayInstructorList} style={{ cursor: "pointer", userSelect: "none" }}><span style={{ fontFamily: "Symbola" }}>&#x2B9C;</span> <u>{instructorAmount} Instructors</u></a>
                        </div>
                        <div className="flex-even text-center">
                            <h5 className="side-list-link">Quarter Year</h5>
                        </div>
                        <div className="flex-even text-right">
                            <a className="side-list-link" onClick={displayClassList} style={{ cursor: "pointer", userSelect: "none" }}><u>{classAmount} Classes</u><span style={{ fontFamily: "Symbola" }}> &#x2B9E;</span></a>
                        </div>
                    </Row>

                    {/* Graph */}
                    <Row className="justify-content-center" id="graphDiv">
                        <Col sm={12}>
                            <Bar
                                data={{labels:labels, datasets:graphData}}
                                width={100}
                                height={50}
                                options={options}
                            />
                        </Col>
                    </Row>

                    {/* Buttons and GPA */}
                    <Row className="justify-content-center">
                        <Col sm={3}></Col>
                        <Col sm={6} className="text-center">
                            {/*<p>Average GPA: {data[0].averageGPA}</p>*/}
                            <p>GPA: {data.map(obj => {
                                return obj.averageGPA + ' ';
                            })}</p>
                        </Col>
                        <Col sm={3} className="text-right">
                            <FormCheck
                                id="chartSwitch"
                                type="switch"
                                checked={chartSwitch}
                                onChange={changeChart}
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
        </>
    );
}