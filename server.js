const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');

app.use( (req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error)
            console.log(error);
    } ) 
    next();
})

// app.use( (req, res, next) => { 
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req,res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        message: 'Welcome to my website'
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        title: 'About Page',
    })
})


app.listen(port, () => {
    console.log(`Server is up on ${port}`);
})