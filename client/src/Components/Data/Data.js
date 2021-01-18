import React from 'react';

export default function Data(props) {
    return (
        <>
            <p>Data</p>
            <p>Count: {props.data.count}</p>
            <p>Average GPA: {props.data.averageGPA}</p>
            <p>A: {props.data.a}</p>
            <p>B: {props.data.b}</p>
            <p>C: {props.data.c}</p>
            <p>D: {props.data.d}</p>
            <p>F: {props.data.f}</p>
            <p>P: {props.data.p}</p>
            <p>NP: {props.data.np}</p>
        </>
    )
}