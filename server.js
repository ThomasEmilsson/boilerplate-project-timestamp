var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string", function(req, res) {

  var input = req.params.date_string;

  if (isNaN(input)){

    // if input is a Date
    var utc = new Date(input);
    utc = utc.toUTCString();

    var unix = new Date(input).getTime() / 1000;

    res.json({unix: unix, utc: utc})

  } else {

    // if input is unix
    var utc = new Date(input * 1000);
    utc = utc.toUTCString();

    var unix = input;

    res.json({unix: unix, utc: utc})
  }
});


app.get("/api/timestamp/", function(req, res) {

  var date = new Date();
  var utc = date.toUTCString();
  var unix = date.getTime() / 1000;


  res.json({unix: unix, utc: utc});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
