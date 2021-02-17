import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Home from "../Home/Home";
import Data from "../Data/Data";
import SearchForm from "./SearchForm";
const HOME = <Home />;
let DATA = <Data />;

const DEFAULT_STATE = {
  formID: 0,
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

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      forms: {},
      formStates: {},
      currentForm: 0,
      numForms: 0,
      page: HOME, // what the page will display below the search forms (HOME or DATA)
    };
  }

  componentDidMount() {
    fetch("/instructors")
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          instructors: res.instructors.map((teacher) => ({
            name: teacher,
            value: teacher,
          })),
        })
      )
      .then(()=>this.setState({forms:{}, formStates:{}}))
      .then(() => this.addNewForm())
  }

  setCurrentForm = (key, e) => {
    e.preventDefault(); //ignore link behavior
    this.setState(
      {
        currentForm: key,
      },
      function () {
        this.forceUpdate();
      }
    );
  };

  addNewForm = () => {
    this.setState(
      {
        numForms: this.state.numForms + 1,
        currentForm: this.state.numForms + 1,
      },
      function () {
        this.setState({
          forms: {
            ...this.state.forms,
            [this.state.currentForm]: (
              <SearchForm
                handleFormSubmit={this.handleFormSubmit}
                updateForm={this.updateForm}
                formID={this.state.currentForm}
                instructors={this.state.instructors}
              ></SearchForm>
            ),
          },
          formStates: {
            ...this.state.formStates,
            [this.state.formStates]: DEFAULT_STATE,
          },
        });
      }
    );
  };

  updateForm = (formState) => {
    console.log("setting form " + formState.formID);

    this.setState(
      {
        formStates: {
          ...this.state.formStates,
          [formState.formID]: formState,
        },
      },
      function () {}
    );
  };

  handleFormSubmit = (e) => {
    console.log("form submitted");
    e.preventDefault();

    fetch("/search", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        DATA = <Data data={data} />;
        this.setState({ page: DATA });
      });
    //{currentForm !== 0 ? forms[currentForm] : null}
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <p>Current Form: {this.state.currentForm}</p>
          {Object.keys(this.state.forms).map((key) => {
            return <div className={key===""+this.state.currentForm?"visible":"invisible"}>{this.state.forms[key]}</div>;
          })}
          <Row className="justify-content-center search-form-row">
            <Col>
              <Form.Group className="text-center">
                <Button
                  id="submit-button"
                  as="input"
                  type="submit"
                  name="submit"
                  value="Submit"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button onClick={this.addNewForm}>+</Button>
            </Col>
          </Row>

          <Row>
            {Object.keys(this.state.formStates).map((key) => {
              return (
                <Col>
                  <a href="#" onClick={(e) => this.setCurrentForm(key, e)}>
                    {this.state.formStates[key].formID}
                  </a>
                </Col>
              );
            })}
          </Row>
        </Form>
        {this.state.page}
      </Container>
    );
  }
}

export default Search;
