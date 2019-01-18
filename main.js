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

let latestContext = false

app.get('/math-test', function(request, response) {

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

    const answeredCorrectly = (latestContext.answer == answer)

    const context = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operand: operand,
        answer: answer,
        answeredCorrectly: answeredCorrectly,
        latestContext: false
    }
    latestContext = context

    response.render("math-test.hbs", context)
})

app.get('/calculator', function(request, response) {
    const context = {
        answered: false
    }

    console.log(request.query)
    
    
    if (Object.keys(request.query).length) {
        context.answered = true

        switch(request.query.operand) {
            case "+":
                context.operand = "+"
                context.answer = parseFloat(request.query.firstNumber) + parseFloat(request.query.secondNumber)
                break
            case "-":
                context.operand = "-"
                context.answer = parseFloat(request.query.firstNumber) - parseFloat(request.query.secondNumber)
                break
            case "*":
                context.operand = "*"
                context.answer = parseFloat(request.query.firstNumber) * parseFloat(request.query.secondNumber)
                break
            case "/":
                context.operand = "/"
                context.answer = parseFloat(request.query.firstNumber) / parseFloat(request.query.secondNumber)
                break
            default:
                context.errorMessage = "Invalid operand"
        }
        if (!context.errorMessage) {
            context.firstNumber = request.query.firstNumber
            context.secondNumber = request.query.secondNumber
        }
    }

    console.log(context)
    
    response.render("calculator.hbs", context)
})

// --- POST ----
app.post('/s', function(request, response) {
    const context = req.body
    response.render("search.hbs", context)
})

app.post('/math-test', function(request, response) {
    const answeredCorrectly = latestContext.answer == request.body.answer

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
        answer: answer,
        answeredCorrectly: answeredCorrectly,
        latestContext: latestContext
    }

    latestContext = context
    
    response.render("math-test.hbs", context)
})


app.listen(8080)


