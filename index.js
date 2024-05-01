// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, resp) => {
  let date = req?.params?.date;
  let unix = null,
    utc = null;
  // console.log(date, "Type of date =>", typeof date);
  date = isNaN(Date.parse(date)) ? parseInt(date) : date;

  console.log(date, "Type of date =>", typeof date);
  try {
    unix = new Date(date).getTime();
    utc = new Date(date).toUTCString();
    if (utc === "Invalid Date") {
      throw new Error("Invalid Date");
    }
    resp.json({ unix, utc });
  } catch (error) {
    resp.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
