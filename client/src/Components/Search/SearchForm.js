import React, {useState, useEffect } from "react";
import { Form, Row, Col, Container, Collapse } from "react-bootstrap";
import SelectSearch from "react-select-search";
import "./searchform.css";
import {useLocation} from "react-router-dom";
const dep = require("./departments");

const quarters = [
  { name: "Fall", value: "Fall" },
  { name: "Winter", value: "Winter" },
  { name: "Spring", value: "Spring" },
  { name: "Summer", value: "Summer" },
];

const years = [
  { name: "2020-2021", value: "2020-21" },
  { name: "2019-2020", value: "2019-20" },
  { name: "2018-2019", value: "2018-19" },
  { name: "2017-2018", value: "2017-18" },
  { name: "2016-2017", value: "2016-17" },
  { name: "2015-2016", value: "2015-16" },
  { name: "2014-2015", value: "2014-15" },
];

const departments = dep.departments;

export default function SearchForm({formID, color, updateForm, instructors}){
  const [state, setState] = useState({
    formID: formID,
    color: color,
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
  });

  useEffect(()=>updateForm(state, formID), [state]);

  const handleValueChange = (e) => {
    setState({...state, [e.name]: e.value });
  };


    return (
      <Container>
        {formID}
        <Row className="justify-content-center search-form-row">
          <Col className="col-12 col-sm-12 col-md-5">
            <SelectSearch
              options={instructors}
              filterOptions={(q, options) => {
                return options.slice(0, 4);
              }}
              search
              name="instructors"
              onChange={(val) =>
                handleValueChange({
                  name: "instructor",
                  value: val
                })
              }
              placeholder="Instructor Name"
            />
          </Col>
          <Col className="col-12 col-sm-12 col-md-3">
            <SelectSearch
              closeOnSelect={false}
              printOptions="on-focus"
              multiple
              name="quarters"
              onChange={(val) =>
                handleValueChange({
                  name: "quarters",
                  value: val
                })
              }
              placeholder="Quarters"
              options={quarters}
            />
          </Col>
          <Col className="col-12 col-sm-12 col-md-3">
            <SelectSearch
              closeOnSelect={false}
              printOptions="on-focus"
              name="years"
              onChange={(val) =>
                handleValueChange({
                  name: "years",
                  value: val
                })
              }
              multiple
              placeholder="Years"
              options={years}
            />
          </Col>
        </Row>
        <Row className="justify-content-center search-form-row">
          <Col className="col-12 col-sm-12 col-md-5">
            <SelectSearch
              options={departments}
              search
              name="department"
              onChange={(val) =>
                handleValueChange({
                  name: "department",
                  value: val
                })
              }
              placeholder="All Departments"
            />
          </Col>
          <Col className="col-12 col-sm-12 col-md-3">
            <Form.Control
              onChange={(val) =>
                handleValueChange({
                  name: "classNumber",
                  value: val.target.value
                })
              }
              className="search-text-box"
              type="text"
              placeholder="Class Number (Ex. 45C)"
            />
          </Col>
          <Col className="col-12 col-sm-12 col-md-3">
            <Form.Control
              onChange={(val) =>
                handleValueChange({
                  name: "classCode",
                  value: val.target.value
                })
              }
              className="search-text-box"
              type="text"
              placeholder="Class Code (Ex. 34060)"
            />
          </Col>
        </Row>
        <Row className="justify-content-center search-form-row">
          <Col className="col-12">
            <div className="advanced-options-wrapper">
              <a
                id="advanced-options-link"
                onClick={() =>
                  setState({...state, advancedVisible:!state.advancedVisible}) 
                }
                aria-controls="example-collapse-text"
                aria-expanded={state.advancedVisible}
              >
                Advanced Options ▼
              </a>
              <Collapse in={state.advancedVisible}>
                <div className="advanced-options">
                  
                    <Row className="justify-content-center text-center">
                      <Col>
                        <Form.Check
                          checked={state.excludePNP}
                          onChange={(evt) => {
                            setState({...state, excludePNP:evt.target.checked}) 
                            handleValueChange({
                              name: "excludePNP",
                              value: !state.excludePNP
                            });
                          }}
                          type="checkbox"
                          id={`exclude-pnp`}
                          label={`Exclude P/NP`}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          checked={state.covid19}
                          onChange={(evt) => {
                            setState({...state, covid19:evt.target.checked}) 
                            handleValueChange({
                              name: "covid19",
                              value: !state.covid19
                            });
                          }}
                          type="checkbox"
                          id={`exclude-covid-19`}
                          label={`Exclude COVID-19`}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          checked={state.lowerDiv}
                          onChange={(evt) => {
                            setState({...state, lowerDiv:evt.target.checked}) 
                            handleValueChange({
                              name: "lowerDiv",
                              value: !state.lowerDiv
                            });
                          }}
                          type="checkbox"
                          id={`lower-div-only`}
                          label={`LowerDiv Only`}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          checked={state.upperDiv}
                          onChange={(evt) => {
                            setState({...state, upperDiv:evt.target.checked}) 
                            handleValueChange({
                              name: "upperDiv",
                              value: !state.upperDiv
                            });
                          }}
                          type="checkbox"
                          id={`upper-div-only`}
                          label={`UpperDiv Only`}
                        />
                      </Col>
                    </Row>
                  
                </div>
              </Collapse>
            </div>
          </Col>
        </Row>
      </Container>
    );
}
