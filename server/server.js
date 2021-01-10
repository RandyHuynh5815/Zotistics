const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const calc = require('./calculations');
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/search', (req, res) => {
    let params = req.body;
    let quarters = params.quarters.join(';');
    let years = params.years.join(';');
    let department = params.department.replace('&', '%26').replace('/', '%2');
    let query = `instructor=${params.instructor}&quarter=${quarters}&year=${years}&department=${department}` +
        `&number=${params.classNumber}&code=${params.classCode}`


    fetch(`http://api.peterportal.org/rest/v0/grades/calculated?${query}`)
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

            //sends json as response
            res.json({count: count, a: a, b: b, c: c, d: d, f: f, p: p, np: np,
                      classes: classes, instructors: instructors});
        });
})




app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})