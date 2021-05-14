import React from 'react';
import {Row, Col, FormCheck} from "react-bootstrap";
import {Bar} from 'react-chartjs-2';

export default class Data extends React.Component {
    constructor(props){
        super(props);
        let gradeListPopulation = [props.data[0].a, props.data[0].b, props.data[0].c, props.data[0].d, props.data[0].f,
            props.data[0].p, props.data[0].np]
        const sum = gradeListPopulation.reduce(function(a, b){
            return a + b;
        });
        let gradeListPercentage = gradeListPopulation.map(grade => {
            return ((grade/sum)*100).toFixed(1);
        })

        this.state = {
            gradeListPercentage: gradeListPercentage,
            gradeListPopulation: gradeListPopulation,
            chartData: gradeListPercentage,
            instructorDisplay: "none", // display none or inherit
            classDisplay: "none", // display none or inherit
            sideInfoHeight: "0px", // max height for the side cards that changes on window resize
            chartSwitch: false,
            chartLabelY: "Percent", // Percent or Students
        }
    }

    componentDidMount() {
        this.resizeSideLists();
        window.addEventListener("resize", this.resizeSideLists);
    }

    resizeSideLists = () => {
        let height = document.getElementById('graphDiv').offsetHeight + document.getElementById('topDiv').offsetHeight;
        this.setState({sideInfoHeight: height.toString() + "px"});
    }

    displayInstructorList = (e) => {
        e.preventDefault();
        if(this.state.instructorDisplay === "none"){
            this.setState({instructorDisplay: "inherit"});
        } else {
            this.setState({instructorDisplay: "none"});
        }
    }

    displayClassList = (e) => {
        e.preventDefault();
        if(this.state.classDisplay === "none"){
            this.setState({classDisplay: "inherit"});
        } else {
            this.setState({classDisplay: "none"});
        }
    }

    changeChart = () => {
        if(!this.state.chartSwitch){
            this.setState({chartData: this.state.gradeListPopulation, chartLabelY: "Students"});
        } else {
            this.setState({chartData: this.state.gradeListPercentage, chartLabelY: "Percent"});
        }
        this.setState({chartSwitch: !this.state.chartSwitch});
    }

    render() {
        let title = this.props.data[0].department + " " + this.props.data[0].classNumber + " " + this.props.data[0].instructor;
        let instructorAmount = this.props.data.map(x => Object.keys(x.instructors).length).reduce((a,b) => a + b);
        let data = {
            labels: ['A', 'B', 'C', 'D', 'F', 'P', 'NP'],
            datasets: this.props.graphData
        };
        let options = {
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
                        labelString: this.state.chartLabelY
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

        return (
            <>
                <Row>
                    {/* Instructor Side List */}
                    <Col sm={2} className="justify-content-center text-center px-0">
                        <div className="card overflow-auto" style={{display: this.state.instructorDisplay, maxHeight: this.state.sideInfoHeight}} id="profList">
                            <div className="card-body px-0">
                                <h5 className="card-title">Instructors</h5>
                                {this.props.data.map(x => {
                                    return (
                                        Object.entries(x.instructors).map(([key, value], idx) => {
                                            return <p key={idx} className="card-text text-decoration-none" style={{color: "#212529"}}>{key} • {value}</p>
                                        })
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
                                <a id="instructors" onClick={this.displayClassList} style={{cursor: "pointer", userSelect: "none"}}><u>{this.props.data[0].count} Classes</u><span style={{fontFamily: "Symbola"}}> &#x2B9E;</span></a>
                            </div>
                        </Row>
                        {/* Graph */}
                        <Row className="justify-content-center" id="graphDiv">
                            <Col sm={12}>
                                <Bar
                                    data={data}
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
                                {/*<p>Average GPA: {this.props.data[0].averageGPA}</p>*/}
                               <p>GPA: {this.props.data.map(obj => {
                                   return obj.averageGPA + ' ';
                               })}</p>
                            </Col>
                            <Col sm={3} className="text-right">
                                <FormCheck
                                    id="chartSwitch"
                                    type="switch"
                                    checked={this.state.chartSwitch}
                                    onChange={this.changeChart}
                                    onClick={e => e.target.blur()}
                                    label="Numbers"
                                />
                            </Col>
                        </Row>
                    </Col>
                    {/* Class Side List*/}
                    <Col sm={2} className="justify-content-center text-center px-0">
                        <div className="card overflow-auto" style={{display: this.state.classDisplay, maxHeight: this.state.sideInfoHeight}} id="cardList">
                            <div className="card-body px-0">
                                <h5 className="card-title mb-0">Classes</h5>
                                <p style={{fontSize: "0.75rem"}}><i>Click class to expand</i></p>

                                {Object.entries(this.props.data[0].classes).map(([key, value], idx) => {
                                    return(
                                        <p key={idx} className="card-text text-decoration-none" style={{color: "#212529"}}>{key} • {value.count}</p>
                                        // <>
                                        //     <p><a className="card-text text-decoration-none" href={"#" + key.replace(" ", "")} data-toggle="collapse" aria-expanded="false" aria-controls="collapse1" style={{color: "#212529"}}>{key} • {value.count}</a></p>
                                        //     <div className="collapse" id={key.replace(" ", "")}>
                                        //         <div className="card-block">
                                        //             {Object.entries(value.courses).map(([key, value]) => {
                                        //                 return(
                                        //                     <p style={{fontSize: "0.7rem"}}>{key}</p>
                                        //                 )
                                        //             })}
                                        //         </div>
                                        //     </div>
                                        // </>
                                    )
                                })}
                            </div>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}