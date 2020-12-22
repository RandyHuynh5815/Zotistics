const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
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
    let count = 0;

    fetch(`http://api.peterportal.org/rest/v0/grades/calculated?instructor=${params.instructor}`)
        .then(res => res.json())
        .then(data => {
            count = data['gradeDistribution']['COUNT()']
            console.log(count);
            //sends json as response
            res.json({count: count});
        });
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})