const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.cookies.username) {
        res.redirect('hello')
    } else {
        const name = req.cookies.username;
        res.render('index.pug', {name});
    }
});


router.get('/sandbox', (req, res) => {
    res.render('sandbox', {names})
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello', {name: req.cookies.username})
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
});

router.post('/goodbye', (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.clearCookie('username')
        res.redirect('hello');
    }
});

module.exports = router;