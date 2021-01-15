const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/static', express.static('public'))


app.set('view engine', 'pug');

const mainRoutes = require('./routes/index');
const cardRoutes = require('./routes/cards')

app.use(mainRoutes)
app.use('/cards', cardRoutes) // this is linking to the card routes so the routes in this folder can start with '/'


// app.use( (req, res, next) => {
//     console.log("Hello There");
//     const err = new Error('Oh no')
//     err.status = 500;
//     next(err);
// })

app.use( (req, res, next) => {
    console.log("This is the second message");
    next();
})

app.use( (req, res, next) => {
    const err = new Error('Not found')
    err.status = 404;
    next(err);
})

app.use( (err, req, res, next) => {
    res.status(err.status);
    res.render('error', {err});
})

app.listen(3000);