const express = require('express');
const { validateStudentInfo, validatePublickey} = require('./utils/validate');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'ssshhhhh'}));
app.use(express.urlencoded());
app.use(express.json());
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

var sess;
app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/request', (req, res) =>{
    res.render('request.hbs');
});

app.get('/instruction', (req, res) => {
    sess = req.session;
    if (sess.name && sess.idNumber) {
        res.render('instruction.hbs', {name: sess.name, id: sess.idNumber});
    } else {
        res.redirect('/request');
    }
});

app.post('/student/info', (req, res) => {
    var data = JSON.parse(JSON.stringify(req.body));
    var validateValue = validateStudentInfo(data.name, data.id);
    if (validateValue === 0) {
        sess = req.session;
        sess.name = data.name;
        sess.idNumber = data.id;
        res.redirect('/instruction');
    } else {
        res.redirect(`/request?error=${validateValue}`);
    }
});

app.post('/student/key', (req, res) => {
    backURL = req.header('Referer') || '/';
    var data = JSON.parse(JSON.stringify(req.body));
    if(validatePublickey(data.key)) {
        // do stuff here
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/?status=success');
        });
    } else {
        res.redirect('/instruction?status=key');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/request');
    });
});

app.listen(port, () => {
    console.log('server is starting...');
});