const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const calc = require('./calculations');
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb'}))

app.use('/instructors', (req, res) => {
    fetch(`http://api.peterportal.org/rest/v0/grades/calculated?`, {
        headers: {
            'x-api-key': 'Zotistics-48e7d5db47d3bf0ebfef45fe0aea7b3df77d0c77b243ee4bc9b780df6c9dd91f'
        }})
        .then(res => res.json())
        .then(data => {
            res.json({instructors: calc.uniqueInstructors(data['courseList'])});
        });
})

app.use('/search', (req, res) => {
    let params = req.body;
    let quarters = params.quarters.join(';');
    let years = params.years.join(';');
    let department = params.department.replace('&', '%26').replace('/', '%2');
    let query = `instructor=${params.instructor}&quarter=${quarters}&year=${years}&department=${department}` +
        `&number=${params.classNumber}&code=${params.classCode}`


    fetch(`http://api.peterportal.org/rest/v0/grades/calculated?${query}`, {
        headers: {
            'x-api-key': 'Zotistics-48e7d5db47d3bf0ebfef45fe0aea7b3df77d0c77b243ee4bc9b780df6c9dd91f'
        }})
        .then(res => res.json())
        .then(data => {
            let classes = calc.classList(data['courseList']);
            let instructors = calc.instructorList(data['courseList']);

            let count = data['gradeDistribution']['COUNT()']
            let a = data['gradeDistribution']['SUM(gradeACount)']
            let b = data['gradeDistribution']['SUM(gradeBCount)']
            let c = data['gradeDistribution']['SUM(gradeCCount)']
            let d = data['gradeDistribution']['SUM(gradeDCount)']
            let f = data['gradeDistribution']['SUM(gradeFCount)']
            let p = data['gradeDistribution']['SUM(gradePCount)']
            let np = data['gradeDistribution']['SUM(gradeNPCount)']
            let averageGPA = data['gradeDistribution']['AVG(averageGPA)']

            //sends json as response
            res.json({count: count, a: a, b: b, c: c, d: d, f: f, p: p, np: np,
                      averageGPA: averageGPA, classes: classes, instructors: instructors});
        });
})




app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})