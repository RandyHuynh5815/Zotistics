import React, { useState, useEffect } from "react";
import "./searchform.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Data from "../Data/Data";
import SearchForm from "./SearchForm";
import FormTabs from "./FormTabs"
import {useLocation} from 'react-router-dom';

const OPACITY = 0.6
const HSL = [[204, 82, 57], //blue
[130, 84, 73], //green
[8, 100, 67], //orange
[344, 68, 80]] //pink



const INITIAL_INSTRUCTORS = [
  { name: "SHEPHERD, B.", value: "SHEPHERD, B." },
  { name: "LEVIN, K.", value: "LEVIN, K." },
  { name: "SEONG, A.", value: "SEONG, A." },
  { name: "SPENCER, P.", value: "SPENCER, P." },
  { name: "WOLFF, B.", value: "WOLFF, B." }];

/*
  Handles all the searchforms, and keeps track of state of each form
  Also handles fetching instructors list, fetching results, and setting page to data
*/
export default function Search({ nightMode }) {
  const [instructors, setInstructors] = useState(INITIAL_INSTRUCTORS);
  
  const [currentForm, setCurrentForm] = useState(1);
  const [lastFormID, setLastFormID] = useState(0);
  const [results, setResults] = useState([]);
  const [resultsPercent, setResultsPercent] = useState([]);
  const [resultsPopulation, setResultsPopulation] = useState([]);
  let query = new URLSearchParams(useLocation().search);

  const EMPTY_STATE = {
    formID: 1, //make sure to change this when using this
    color: `hsl(${HSL[0][0]}, ${HSL[0][1]}%, ${HSL[0][2]}%)`,
    instructor: query.get("instructor") || "",
    quarters: query.get("quarters")?query.get("quarters").split(","):[],
    years: query.get("years")?query.get("years").split(","):[],
    department: query.get("department") || "",
    classNumber: query.get("classNumber") || "",
    classCode: query.get("classCode") || "",
    advancedVisible: query.get("advancedVisible") || false,
    excludePNP: query.get("exludePNP") || false,
    covid19: query.get("covid19") || false,
    lowerDiv: query.get("lowerDiv") || false,
    upperDiv: query.get("upperDiv") || false
  }
  const [forms, setForms] = useState({
    1: EMPTY_STATE
  }); // {formID: formState}

  //on component mount, fetch instructors and add a form
  useEffect(() => fetchInstructors(), []);
  //check currentform in forms and update lastformid on change of forms{}
  useEffect(() => updateFormNumbers(), [forms]);

  useEffect(()=>{
    setResultsPercent(dataForGraph(results, true));
    setResultsPopulation(dataForGraph(results, false));
  }, [results])
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
    const i = Object.keys(forms).length //index in HSL array
    let newState = {
      formID: newFormID, //make sure to change this when using this
      color: `hsl(${HSL[i][0]}, ${HSL[i][1]}%, ${HSL[i][2]}%)`,
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

    //reassign colors
    newForms = reassignColors(newForms);

    setCurrentForm(Object.keys(newForms).length - 1);
    setForms(newForms);
    updateFormNumbers();

  }

  const reassignColors = (formStates) => {
    let i = 0;
    for (let f in formStates) {
      console.log(f);
      formStates[f].color = `hsl(${HSL[i][0]}, ${HSL[i][1]}%, ${HSL[i][2]}%)`
      i++;
    }
    return formStates;
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
    setResults([]);
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
    returns array of colors for use in chartjs
    [
      [Acolor, Bcolor, Ccolor, Dcolor, Fcolor, Pcolor, NPcolor],  //form 1(always blue n yellow)
      [Acolor, Bcolor, Ccolor, Dcolor, Fcolor, Pcolor, NPcolor],  //form 2
      [Acolor, Bcolor, Ccolor, Dcolor, Fcolor, Pcolor, NPcolor],  //form 3
      [Acolor, Bcolor, Ccolor, Dcolor, Fcolor, Pcolor, NPcolor]   //form 4
    ]
  */

  const getGraphColors = (numGraphs) => {

    const NUMBARS = 7;

    //im going straight to hell
    let colors = HSL.map(([h, s, l]) => Array(...Array(NUMBARS)).map(() => `hsla(${h},${s}%,${l}%,${OPACITY})`))

    if (numGraphs === 1) {
      //change the first one to yellow for pnp
      let [h, s, l] = [43, 100, 67];
      colors[0][5] = `hsla(${h},${s}%,${l}%,${OPACITY})`;
      colors[0][6] = `hsla(${h},${s}%,${l}%,${OPACITY})`;
    }
    return colors;
  }

  /*
  Creates an array of objects with the grade data and colors
  to put in the graph dataset in Data.js
   */
  const dataForGraph = (gradeData, percent) => {
    let dataset = [];
    let colors = getGraphColors(Object.keys(gradeData).length);

    let count = 0;
    for (let data of gradeData) {
      let dataPopulation = [data.a, data.b, data.c, data.d, data.f, data.p, data.np];
      let sum = dataPopulation.reduce((a, b) => a + b);
      let dataPercentage = dataPopulation.map(d => 100 * d / sum);

      dataset.push({
        label: `${count}`,
        data: percent ? dataPercentage : dataPopulation,
        backgroundColor: colors[count]
      });
      count++;
    }

    return dataset;
  }

  return (
    <div className="search-content-wrapper">
      <Container>
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
          <Row className="justify-content-center">
            <Col sm={2} />
            <Col sm={8}>
              {lastFormID > 0 &&
                <FormTabs
                  currentForm={currentForm}
                  forms={forms}
                  setCurrentForm={setCurrentForm}
                  removeForm={removeForm}
                  addForm={addForm} 
                />
              }
            </Col>
            <Col sm={2} />
          </Row>
        </Form>

        {results.length !== 0 && resultsPopulation.length !== 0 && resultsPercent.length !==0 &&
          <Data
            data={results}
            graphDataPopulation={resultsPopulation}
            graphDataPercent={resultsPercent}
            nightMode={nightMode}
          />
        }
      </Container>
    </div>
  );
}