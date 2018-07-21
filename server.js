const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        message: 'Welcome to the Home Page!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});