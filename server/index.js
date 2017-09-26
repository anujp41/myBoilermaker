const express = require('express')
const morgan= require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000
module.exports = app

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', require('./apiRoutes')) //app will hit this route first

app.use(express.static(path.join(__dirname, '..', 'public'))) //static file-serving middleware

//if a path is given that is not in the api above then, then will be serve our index.html page from public folder
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

//if internal server error (500 error), then this will catch it; always provided at the last
app.use((err, req, res, next) => {
    console.log(err)
    console.log(err.stack)
    req.status(err.status || 500).send(err.message || 'Internal server error.')
})

//app will listen for requests on port 1337
app.listen(port, () => console.log(`App is listening on port ${port}`))

