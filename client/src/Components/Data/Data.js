import React, {useEffect} from 'react';
import {Row, Col} from "react-bootstrap";
import Chart from "chart.js";

export default function Data(props) {

    useEffect(() => {
        let ctx = document.getElementById('myChart').getContext('2d');
        let gradeListPopulation = [props.data.a, props.data.b, props.data.c, props.data.d, props.data.f,
                         props.data.p, props.data.np]
        const sum = gradeListPopulation.reduce(function(a, b){
            return a + b;
        });
        let gradeListPercentage = gradeListPopulation.map(grade => {
            return ((grade/sum)*100).toFixed(1);
        })

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['A', 'B', 'C', 'D', 'F', 'P', 'NP'],
                datasets: [{
                    label: "Percent",
                    data: gradeListPercentage,
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
    }, [])

    let title = props.data.department + " " + props.data.classNumber + " " + props.data.instructor;
    let instructorAmount = Object.keys(props.data.instructors).length;

    return (
        <>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <h5 className="text-center">{title}</h5>
                    <Row className="justify-content-between d-flex">
                        <div className="flex-even">
                            {instructorAmount} Instructors
                        </div>
                        <div className="flex-even text-center">
                            <h6>Quarter Year</h6>
                        </div>
                        <div className="flex-even text-right">
                            {props.data.count} Classes
                        </div>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <canvas id="myChart"></canvas>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col sm={3}></Col>
                        <Col sm={6} className="text-center">
                            <p>Average GPA: {props.data.averageGPA}</p>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </>
    )
}