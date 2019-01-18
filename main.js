const express = require('express')
const expressHandlebars = require('express-handlebars')
const bp = require('body-parser')

const app = express()

app.use(bp.urlencoded({
    extended: false
}))

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}))

// --- GET ----

app.get('/', function(request, response) {
    response.render("home.hbs")
})

app.get('/about', function(request, response) {
    response.render("about.hbs")
})

app.get('/search', function(request, response) {
    response.render("search.hbs")
})

app.get('/post-mathtest', function(request, response) {

    const firstNumber = Math.floor(Math.random() * 10)
    const secondNumber = Math.floor(Math.random() * 10)
    let operand = ""
    let answer = ""

    switch(Math.ceil(Math.random() * 4)) {
        case 1:
            operand = "+"
            answer = firstNumber + secondNumber
            break
        
        case 2:
            operand = "-"
            answer = firstNumber - secondNumber
            break

        case 3:
            operand = "*"
            answer = firstNumber * secondNumber
            break

        case 4:
            operand = "/"
            answer = firstNumber / secondNumber
            break
    }

    const context = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operand: operand,
        answer: answer
    }
    response.render("post-mathtest.hbs", context)
})

// --- POST ----
app.post('/s', function(req, res) {
    const context = req.body
    res.render("search.hbs", context)
})

app.post('/post-mathtest', function(request, response) {

    res.render("post-mathtest", context)
})


app.listen(8080)


