import React from "react";
import { Form, Row, Col, Button, Container, Collapse } from "react-bootstrap";
import SelectSearch from "react-select-search";
import "./searchform.css";
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

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = props.handleFormSubmit;
    this.state = {
      formID: props.formID,
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
      upperDiv: false,
    };

  }

  handleValueChange = (e) => {
    this.setState({ [e.name]: e.value }, function () {
      this.props.updateForm(this.state);
    });
  };

  render() {
    let instructors = [];

    if (this.props.instructors !== []) {
      instructors = this.props.instructors;
    }

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
                  this.handleValueChange({
                    name: "instructor",
                    value: val,
                    formID: this.props.formID,
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
                  this.handleValueChange({
                    name: "quarters",
                    value: val,
                    formID: this.props.formID,
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
                  this.handleValueChange({
                    name: "years",
                    value: val,
                    formID: this.props.formID,
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
                  this.handleValueChange({
                    name: "department",
                    value: val,
                    formID: this.props.formID,
                  })
                }
                placeholder="All Departments"
              />
            </Col>
            <Col className="col-12 col-sm-12 col-md-3">
              <Form.Control
                onChange={(val) =>
                  this.handleValueChange({
                    name: "classNumber",
                    value: val.target.value,
                    formID: this.props.formID,
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
                  this.handleValueChange({
                    name: "classCode",
                    value: val.target.value,
                    formID: this.props.formID,
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
                    this.setState({
                      advancedVisible: !this.state.advancedVisible,
                    })
                  }
                  aria-controls="example-collapse-text"
                  aria-expanded={this.state.advancedVisible}
                >
                  Advanced Options ▼
                </a>
                <Collapse in={this.state.advancedVisible}>
                  <div className="advanced-options">
                    <Container>
                      <Row className="justify-content-center text-center">
                        <Col>
                          <Form.Check
                            checked={this.state.excludePNP}
                            onChange={(evt) => {
                              this.setState({ excludePNP: evt.target.checked });
                              this.handleValueChange({
                                name: "passNoPass",
                                value: !this.state.excludePNP,
                                formID: this.props.formID,
                              });
                            }}
                            type="checkbox"
                            id={`exclude-pnp`}
                            label={`Exclude P/NP`}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            checked={this.state.covid19}
                            onChange={(evt) => {
                              this.setState({ covid19: evt.target.checked });
                              this.handleValueChange({
                                name: "covid",
                                value: !this.state.covid19,
                                formID: this.props.formID,
                              });
                            }}
                            type="checkbox"
                            id={`exclude-covid-19`}
                            label={`Exclude COVID-19`}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            checked={this.state.lowerDiv}
                            onChange={(evt) => {
                              this.setState({ lowerDiv: evt.target.checked });
                              this.handleValueChange({
                                name: "lowerDiv",
                                value: !this.state.lowerDiv,
                                formID: this.props.formID,
                              });
                            }}
                            type="checkbox"
                            id={`lower-div-only`}
                            label={`LowerDiv Only`}
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            checked={this.state.upperDiv}
                            onChange={(evt) => {
                              this.setState({ upperDiv: evt.target.checked });
                              this.handleValueChange({
                                name: "upperDiv",
                                value: !this.state.upperDiv,
                                formID: this.props.formID,
                              });
                            }}
                            type="checkbox"
                            id={`upper-div-only`}
                            label={`UpperDiv Only`}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Collapse>
              </div>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default SearchForm;
