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

// --- POST ----
app.post('/s', function(req, res) {
    const city = req.body.city
})


app.listen(8080)


