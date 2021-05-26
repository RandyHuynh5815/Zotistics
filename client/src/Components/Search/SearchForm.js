import React from "react";
import { Form, Row, Col, Container, Collapse } from "react-bootstrap";
import SelectSearch from "react-select-search";

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

export default function SearchForm({ formID, instructors, handleFormValueChange, state }) {

  const handleValueChange = (e) => {
    handleFormValueChange({ formID: formID, name: e.name, value: e.value })
  };

  return (
    <Container>
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
                handleValueChange({ name: "advancedVisible", value: !state.advancedVisible })
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
                        handleValueChange({ name: "excludePNP", value: evt.target.checked })
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
                        handleValueChange({ name: "covid19", value: evt.target.checked })
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
                        handleValueChange({ name: "lowerDiv", value: evt.target.checked })
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
                        handleValueChange({ name: "upperDiv", value: evt.target.checked })
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
