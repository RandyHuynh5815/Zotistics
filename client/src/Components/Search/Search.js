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

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      forms: {}, //{formID : formComponent}
      formStates: {}, //{formID : formStates}
      currentForm: 0,
      numForms: 0,
      page: HOME, // what the page will display below the search forms (HOME or DATA)
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);


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
      .then(() => this.setState({ forms: {}, formStates: {} }))
      .then(() => this.addNewForm());
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
    var newFormStates = Object.assign({}, this.state.formStates);
    delete newFormStates["0"]; //fixed bug with 0 key

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

  handleFormSubmit = async (e) => {
    console.log("form submitted");
    e.preventDefault();

    let {formStates} = this.state;


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
    }


    const getResultData = async () => {
      return Promise.all(
        Object.keys(formStates)
        .map(async (formID) => {
          return await fetchDataFromForm(formID);
        }))
      
    }

    getResultData()
    .then((results) => {
      console.log(results);
      this.setState({page: <Data data={results}></Data>});
      
    })

    
    
  };

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
            {Object.keys(this.state.formStates).map((key) => {
              return (
                <Col key={key}>
                  <a href="#" onClick={(e) => this.setCurrentForm(key, e)}>
                    {this.state.formStates[key].instructor}
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
