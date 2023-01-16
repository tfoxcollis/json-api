const express = require('express')
const app = express() //initializing instance of express
const cors = require('cors')
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ 
  parameterLimit: 10000000,
  limit: '50mb',
  extended: true 
}))
app.use(bodyParser.json({ limit: "50mb" }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.options('*', cors())
app.use(cors())
var fs = require('fs')

app.set('port', process.env.PORT || 3001) // set is a function and I'm passing 2 params
app.locals.title = 'Json Converter'

app.post('/converter', (request, response) => {
  const title = request.body.jobName
  const txt = request.body.results.transcripts.map(object => object.transcript) // reading json file being sent from UI
  console.log("title:", title)
  console.log("body:", txt)
  response.json({jobName: title, file: txt}) // function- passing it an argument
  
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`)
})