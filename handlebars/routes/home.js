const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Home Page',
        css: [],
        js: [],
    })
});

module.exports = {
    homeRouter: router
}

