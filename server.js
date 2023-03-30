const express = require('express');
const app = express();
const budgets = require('./models/budget');
const port = 3000;

//middleware
app.set('view engine', 'ejs');
app.use(express.json());

app.use(express.urlencoded({ extended:false }));
app.use(express.static('public'));

//routes

//this is so you can update your total amount after adding a new budgtr (object)


//INDEX route
app.get('', (req, res) => {
    let total = 0;
    for(let i = 0; i < budgets.length; i++) {
        total += budgets[i].amount;
    }

    res.render('index', {budgets, total});
})

//NEW route  (brings us to a form)
app.get('/budgets/new', (req, res) => {
    for(let i = 0; i < budgets.length; i++){
        console.log(budgets[i].amount);
        parseInt(budgets[i].amount);
    }
    res.render('new');
})

//SHOW route
app.get('/budgets/:index', (req, res) => {
    let thisBudget = budgets[req.params.index];
    
    res.render('show', {budget: thisBudget});
})

//CREATE route
app.post('/budgets', (req, res) => {
    budgets.unshift(req.body);
    budgets[0].amount = parseInt(budgets[0].amount);
    res.redirect('/budgets');
})

//FALLBACK route
app.get('/*', (req, res) => {
    res.send("You've done bad");
})

app.listen(port, () => {
    console.log(`🏝️ Server is listening to port 3000 🎧`);
})