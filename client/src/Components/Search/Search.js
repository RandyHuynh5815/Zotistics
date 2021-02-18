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

class Search extends React.Component {
  /*
    Handles all the searchforms, and keeps track of state of each form
    Also handles fetching instructors list, fetching results, and setting page to data
  */
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      forms: {
        1: (
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            updateForm={this.updateForm}
            formID={1}
            instructors={[]}
          ></SearchForm>
        ),
      }, //{formID : formComponent}
      formStates: {
        1: {}
      }, //{formID : formStates}
      currentForm: 1,
      numForms: 1,
      page: HOME, // what the page will display below the search forms (HOME or DATA)
    };
    //we need to do this for some reason
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /*
  fetch /instructors and set state.instructors to options list
  make sure forms and formStates is empty
  then add new empty form
  */
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
      .then(() => this.setState({ forms: {
        1: <SearchForm
        handleFormSubmit={this.handleFormSubmit}
        updateForm={this.updateForm}
        formID={this.state.currentForm}
        instructors={this.state.instructors}
      ></SearchForm>
      }, formStates: {


      } }))
  }

  /*
  Runs when form name is clicked and sets current form
  */
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

  /*
  increments numForms and currentForm
  adds new SearchForm component
  NOTE: doesn't add state to formStates 
    because that happens when searchform is updated
  */
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
        });
      }
    );
  };

  /*
  update a particular form's formState
  formID should be included in formState
  */
  updateForm = (formState) => {
    console.log("setting form " + formState.formID);
    this.setState({
      formStates: {
        ...this.state.formStates,
        [formState.formID]: formState,
      },
    });
  };

  /*
  Probably the worst part of this code
  Runs when submit button is clicked
  For each formID in formStates, fetches from /search
  and adds to results a new key/value pair where
  key=formID and value=allTheDataForThatForm
  finally, sets page to data component with results
  */
  handleFormSubmit = async (e) => {
    console.log("form submitted");
    e.preventDefault();
    let { formStates } = this.state;
    const fetchDataFromForm = async (formID) => {
      let result = fetch("/search", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formStates[formID]),
      }).then((res) => res.json());
      console.log(result);
      return result;
    };
    const getResultData = async () => {
      return Promise.all(
        Object.keys(formStates).map(async (formID) => {
          return await fetchDataFromForm(formID);
        })
      ); //only god can judge me
    };
    getResultData().then((results) => {
      console.log(results);
      this.setState({ page: <Data data={results}></Data> });
    });
  };

  /*
  technically renders ALL the searchforms, but makes only
  the current one visible with css lol
  */
  render() {
    let { forms, currentForm, formStates } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          {Object.keys(forms).map((key) => {
            return (
              <div
                key={key}
                className={key === "" + currentForm ? "visible" : "invisible"}
              >
                {forms[key]}
              </div>
            );
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
            {Object.keys(formStates).map((key) => {
              return (
                <Col key={key}>
                  <a href="#" onClick={(e) => this.setCurrentForm(key, e)}>
                    {formStates[key].instructor}
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
