const express = require('express')
const app = express()

const env = require('./env.json')
const Airtable = require('airtable')
const base = new Airtable({apiKey: env.apiKey}).base(env.base)
const table = base('Thingy-actions')

app.use(express.json())
app.use(express.static('public'))

// POST request to log an incoming event from Thingy
app.post('/event', function (request, response) {  
  const eventData = request.body
  // Send to client the response which contains the content of the request object
  response.send(request.body)
  // Create a row in Airtable
  createRow(eventData)
})

// Create a row in Airtable
const createRow = function(eventData) {
  table.create([
    {
      "fields": {
        "Thingy ID": eventData[0].thingyID,
        "Action": eventData[0].thingyAction,
        "Action details": eventData[0].actionDetails
      }
    }
  ], { typecast: true }, function(err, records) {
    if (err) {
      console.error(err)
      return;
    }
    records.forEach(function (record) {
      console.log('New record: ', record.getId())
    })
  })
}

// Optional: list all existing records
app.get('/list-records', function(request, response) {
  let allRecords = []
  table.select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      console.log('Retrieved record: ', record.get('Record ID'))   
    })
    allRecords = allRecords.concat(records)
    fetchNextPage()
  }, function done(err) {
    if (err) { 
      console.error(err)
      return
    }
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify(allRecords))
  })
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

const listener = app.listen(8080, function() {
  console.log('Your app is listening on port ' + listener.address().port)
})