import React from 'react';
import {Row, Col} from "react-bootstrap";
import Chart from "chart.js";

export default class Data extends React.Component {
    constructor(props){
        super(props);

        let gradeListPopulation = [props.data.a, props.data.b, props.data.c, props.data.d, props.data.f,
            props.data.p, props.data.np]
        const sum = gradeListPopulation.reduce(function(a, b){
            return a + b;
        });
        let gradeListPercentage = gradeListPopulation.map(grade => {
            return ((grade/sum)*100).toFixed(1);
        })

        this.state = {
            gradeListPercentage: gradeListPercentage,
            gradeListPopulation: gradeListPopulation,
            instructorDisplay: "none",
            sideInfoHeight: "0px"
        }
    }

    componentDidMount() {
        let ctx = document.getElementById('myChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['A', 'B', 'C', 'D', 'F', 'P', 'NP'],
                datasets: [{
                    label: "Percent",
                    data: this.state.gradeListPercentage,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(255, 206, 86, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {display: false},
                animation: {duration: 1000},
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Percent"
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: 'Grade'
                        }
                    }]
                }
            }
        });

        this.resizeSideLists();
        window.addEventListener("resize", this.resizeSideLists);
    }

    resizeSideLists = () => {
        let height = document.getElementById('graphDiv').offsetHeight + document.getElementById('topDiv').offsetHeight;
        this.setState({sideInfoHeight: height.toString() + "px"});
    }

    displayInstructorList = (e) => {
        if(this.state.instructorDisplay === "none"){
            this.setState({instructorDisplay: "inherit"});
        } else {
            this.setState({instructorDisplay: "none"});
        }
    }

    displayClassList = (e) => {

    }

    render() {
        let title = this.props.data.department + " " + this.props.data.classNumber + " " + this.props.data.instructor;
        let instructorAmount = Object.keys(this.props.data.instructors).length;
        return (
            <>
                <Row>
                    {/* Instructor Side List */}
                    <Col sm={2} className="justify-content-center text-center px-0">
                        <div className="card overflow-auto" style={{display: this.state.instructorDisplay, maxHeight: this.state.sideInfoHeight}} id="profList">
                            <div className="card-body px-0">
                                <h5 className="card-title">Instructors</h5>
                                {Object.entries(this.props.data.instructors).map(([key, value]) => {
                                    return(
                                        <p className="card-text text-decoration-none" style={{color: "#212529"}}>{key} • {value}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col sm={8}>
                        {/* Headers */}
                        <h5 className="text-center">{title}</h5>
                        <Row className="justify-content-between d-flex mb-1 px-2" id="topDiv">
                            <div className="flex-even">
                                <a id="instructors" onClick={this.displayInstructorList} style={{cursor: "pointer", userSelect: "none"}}><span style={{fontFamily: "Symbola"}}>&#x2B9C;</span> <u>{instructorAmount} Instructors</u></a>
                            </div>
                            <div className="flex-even text-center">
                                <h6>Quarter Year</h6>
                            </div>
                            <div className="flex-even text-right">
                                <a id="instructors" onClick={this.displayClassList} style={{cursor: "pointer", userSelect: "none"}}><u>{this.props.data.count} Classes</u><span style={{fontFamily: "Symbola"}}> &#x2B9E;</span></a>
                            </div>
                        </Row>
                        {/* Graph */}
                        <Row className="justify-content-center" id="graphDiv">
                            <Col sm={12}>
                                <canvas id="myChart"></canvas>
                            </Col>
                        </Row>
                        {/* Buttons and GPA */}
                        <Row className="justify-content-center">
                            <Col sm={3}></Col>
                            <Col sm={6} className="text-center">
                                <p>Average GPA: {this.props.data.averageGPA}</p>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                    </Col>
                    {/* Class Side List*/}
                    <Col sm={2}></Col>
                </Row>
            </>
        )
    }
}