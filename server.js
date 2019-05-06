const express = require('express');
const { validateStudentInfo } = require('./utils/validate');
const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/request', (req, res) =>{
    res.render('request.hbs');
});

app.post('/student/info', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    var validateValue = validateStudentInfo(data.name, data.id);
    if (validateValue === 0) {
        return res.render('instruction.hbs', {name: data.name, id: data.id});
    } else {
        res.redirect(`/request?error=${validateValue}`);
    }
});

app.listen(port, () => {
    console.log('server is starting...');
});