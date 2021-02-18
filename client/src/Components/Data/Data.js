import React from "react";

export default function Data(props) {
  return (
    <>
      <p>Data</p>
      <div>
        {Object.keys(props.data).map((key) => {
          return (
            <div>
              <h1>Result {key}</h1>
              <p>Count: {props.data[key].count}</p>
              <p>Average GPA: {props.data[key].averageGPA}</p>
              <p>A: {props.data[key].a}</p>
              <p>B: {props.data[key].b}</p>
              <p>C: {props.data[key].c}</p>
              <p>D: {props.data[key].d}</p>
              <p>F: {props.data[key].f}</p>
              <p>P: {props.data[key].p}</p>
              <p>NP: {props.data[key].np}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
