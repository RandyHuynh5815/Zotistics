const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const calc = require('./calculations');
// const instructors = require("./instructors.json")
const app = express()
const port = 5000

const url = 'https://api.peterportal.org/graphql'
const query = `
    query {
      grades {
        instructors
      }
    }
`

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}))

app.use('/instructors', (req, res) => {
    fetch(url, {
        body: JSON.stringify({query}),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'Zotistics-48e7d5db47d3bf0ebfef45fe0aea7b3df77d0c77b243ee4bc9b780df6c9dd91f'
        }})
        .then(res => res.json())
        .then(data => {
            res.send({instructors: data.data.grades.instructors})
        });
})

function searchQuery(args){
    return `
        query {
          grades(${args}) {
            grade_distributions{
              grade_a_count
              grade_b_count
              grade_c_count
              grade_d_count
              grade_f_count
              grade_p_count
              grade_np_count
              average_gpa
              course_offering{
                year
                quarter
                instructors{
                  name
                }
                section{
                  code
                }
                course {
                  department
                  number
                  title
                }
              }
            }
          }
        }
        `
}

app.use('/search', (req, res) => {
    let params = req.body;
    let quarters = params.quarters.join(';');
    let years = params.years.join(';');
    let code = (params.classCode !== '') ? parseFloat(params.classCode) : null
    let args = `instructor: "${params.instructor}", quarter: "${quarters}", year: "${years}", department: "${params.department}",
        number: "${params.classNumber}", code: ${code}`

    fetch(url, {
        body: JSON.stringify({"query": searchQuery(args)}),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'Zotistics-48e7d5db47d3bf0ebfef45fe0aea7b3df77d0c77b243ee4bc9b780df6c9dd91f'
        }})
        .then(res => res.json())
        .then(data => {
            let filtered = calc.filter(data.data.grades.grade_distributions, params.excludePNP, params.covid19, params.lowerDiv, params.upperDiv);
            let classList = filtered.reverse() // reversed to order it from most recent to oldest
            calc.addData(classList);
            let count = classList.length; // total amount of classes in query
            let stats = calc.cumulativeData(classList); // object that has grade data
            let classes = calc.classList(classList);
            let instructors = calc.instructorList(classList);
            let displayTerm = calc.quarterYear(params.quarters, params.years); // used to display term in results page above graph

            res.send({count: count, a: stats.a, b: stats.b, c: stats.c, d: stats.d, f: stats.f, p: stats.p, np: stats.np,
                      averageGPA: stats.gpa, classes: classes, instructors: instructors,
                      instructor: params.instructor, quarter: displayTerm.quarter, year: displayTerm.year,
                      department: params.department, classNumber: params.classNumber,
                      classCode: params.classCode, courseList: classList
            });
        });
})



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})