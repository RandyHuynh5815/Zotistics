import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Data from "../Data/Data";
import SearchForm from "./SearchForm";
import FormTabs from "./FormTabs"
/*  
CREDIT: https://gist.github.com/bendc/76c48ce53299e6078a76#file-random-color-js
*/
const randomColor = (() => {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return () => {
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
})();

const EMPTY_STATE = {
  formID: 1, //make sure to change this when using this
  color: "hsl(203, 100%, 32%)",
  instructor: "",
  quarters: [],
  years: [],
  department: "",
  classNumber: "",
  classCode: "",
  advancedVisible: false,
  excludePNP: false,
  covid19: false,
  lowerDiv: false,
  upperDiv: false
}


/*
  Handles all the searchforms, and keeps track of state of each form
  Also handles fetching instructors list, fetching results, and setting page to data
*/
export default function Search() {

  const INITIAL_INSTRUCTORS = [
    { name: "SHEPHERD, B.", value: "SHEPHERD, B." },
    { name: "LEVIN, K.", value: "LEVIN, K." },
    { name: "SEONG, A.", value: "SEONG, A." },
    { name: "SPENCER, P.", value: "SPENCER, P." },
    { name: "WOLFF, B.", value: "WOLFF, B." }];

  const [instructors, setInstructors] = useState(INITIAL_INSTRUCTORS);
  const [forms, setForms] = useState({
    1: EMPTY_STATE
  }); // {formID: formState}
  const [currentForm, setCurrentForm] = useState(1);
  const [lastFormID, setLastFormID] = useState(0);
  const [results, setResults] = useState([]);

  //on component mount, fetch instructors and add a form
  useEffect(() => fetchInstructors(), []);
  //check currentform in forms and update lastformid on change of forms{}
  useEffect(() => updateFormNumbers(), [forms]);
  /*
    checks if currentForm is in forms{}
    if not, set currentforms to last formID
    also updates lastFormID
    called on every change of forms
  */
  const updateFormNumbers = () => {
    if (!(currentForm in forms)) {
      const formIDs = Object.keys(forms);
      const id = formIDs[formIDs.length - 1];
      setCurrentForm(id);
      console.log("updating currentformid to " + id);
    }
    setLastFormID(lastFormID + 1)
    return null;
  }
  /*
    called by SearchForm component with currentFormID
  */
  const handleFormValueChange = ({ formID, name, value }) => {
    if (!(formID in forms)) {
      console.log("Form " + formID + " not found in forms");
      console.log(Object.keys(forms));
      return;
    }
    let formState = forms[formID];
    formState[name] = value;
    setForms({ ...forms, [formID]: formState });
  }

  /*
    Adds a new form and formstate
  */
  const addForm = () => {
    let newFormID = lastFormID + 1;
    let newState = {
      formID: newFormID, //make sure to change this when using this
      color: randomColor(),
      instructor: "",
      quarters: [],
      years: [],
      department: "",
      classNumber: "",
      classCode: "",
      advancedVisible: false,
      excludePNP: false,
      covid19: false,
      lowerDiv: false,
      upperDiv: false
    }
    var newForms = Object.assign({ [newFormID]: newState }, forms);
    setForms(newForms);
    setCurrentForm(newFormID);
  }

  /*
    Removes form with given formID
  */
  const removeForm = (formID) => {
    //copy forms
    var newForms = Object.assign({}, forms);
    delete newForms[formID];
    setCurrentForm(Object.keys(newForms).length - 1);
    setForms(newForms);
    updateFormNumbers();
  }

  const fetchInstructors = async () => {
    fetch("/instructors")
      .then((res) => res.json())
      .then((res) =>
        setInstructors(
          res.instructors.map((teacher) => ({
            name: teacher,
            value: teacher,
          })))
      ).then(addForm());
  }

  /*
  fetches results for one particular form as JSON
  */
  const fetchDataFromForm = async (formID) =>
    fetch("/search", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forms[formID]),
    }).then((res) => res.json())
      .then((res) => Object.assign({ color: forms[formID].color }, res))

  /*
  Runs when submit button is clicked
  For each formID in formStates, fetches from /search
  and adds to results a new key/value pair where
  key=formID and value=allTheDataForThatForm
  */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    const getResultData = async () => {
      return Promise.all(
        Object.keys(forms).map(async (formID) => {
          return await fetchDataFromForm(formID);
        })
      );
    };
    getResultData().then((results) => {
      setResults(results);
    });
  };

  /*
  Creates an array of objects with the grade data and colors
  to put in the graph dataset in Data.js
   */
  const dataForGraph = (gradeData) => {
    let dataset = [];
    let colors;
    if(gradeData.length > 1){
      colors = ['rgba(72, 21, 103, 0.6)', 'rgba(57, 86, 140, 0.6)', 'rgba(31, 150, 138, 0.6)', 'rgba(85, 198, 104, 0.6)'];
    } else {
      colors = [[
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 206, 86, 0.6)'
      ]]
    }

    let count = 0;
    for (let data of gradeData) {
      dataset.push({
        label: data.instructor,
        data: [data.a, data.b, data.c, data.d, data.f, data.p, data.np],
        backgroundColor: data.color
      });
      count++;
    }
    return dataset;
  }

  return (
    <div className="search-content-wrapper">
      <Form onSubmit={handleFormSubmit}>
        <Row>
          {currentForm in forms ?
            <SearchForm
              formID={currentForm}
              instructors={instructors}
              handleFormValueChange={handleFormValueChange}
              state={forms[currentForm]}
            /> : null}
        </Row>

        <Row className="justify-content-center search-form-row" noGutters>
          <Col className="text-center">
            <Form.Group >
              <Button
                className="submit-button"
                as="input"
                type="submit"
                name="submit"
                value="Submit"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center form-tabs-row">
            {lastFormID > 0 ?
              <FormTabs
                currentForm={currentForm}
                forms={forms}
                setCurrentForm={setCurrentForm}
                removeForm={removeForm}
                addForm={addForm} /> : null}
          
        </Row>
      </Form>

      {results.length !== 0 && <Data data={results} graphData={dataForGraph(results)} />}
    </div>
  );
}