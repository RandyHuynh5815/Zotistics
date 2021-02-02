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

    return (
        <>
            {/*<p>Data</p>*/}
            {/*<p>Count: {props.data.count}</p>*/}
            {/*<p>Average GPA: {props.data.averageGPA}</p>*/}
            {/*<p>A: {props.data.a}</p>*/}
            {/*<p>B: {props.data.b}</p>*/}
            {/*<p>C: {props.data.c}</p>*/}
            {/*<p>D: {props.data.d}</p>*/}
            {/*<p>F: {props.data.f}</p>*/}
            {/*<p>P: {props.data.p}</p>*/}
            {/*<p>NP: {props.data.np}</p>*/}
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <p>Name and Class</p>
                    <Row></Row>
                    <Row>
                        <Col sm={12}>
                            <canvas id="myChart"></canvas>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}