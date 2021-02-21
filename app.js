
const express = require("express");
const https = require("https"); // https is one of the 5 ways to ge data from external source
const bodyParser = require("body-parser"); //To collect data from form's body

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
})); // To Make use of bodyParser this line is compulsory to write

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html"); // when request is generated by page this is called
})

app.post("/", function(req, res) {

  const query = req.body.cityName; // get data from form with help of body parser.
  const apiKey = "e50cddca55c72084cb027906a20ed5d1";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) { // As we already have res therefor we created response
    console.log(response.statusCode); // statusCode returns the HTTP status of the page

    response.on("data", function(data) { // on method is used to get data via url
      const weatherData = JSON.parse(data); // data comes via url in form of hexadecimal therefor needs to type cast , JSON.parse method is used to convert into string
      const temp = weatherData.main.temp; // data comes in form of json in tree therefor for a perticular leaf we need we need to go to the path
      //console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" // to add image of the weather.
      //console.log(weatherDescription);
      // We can have only one res.send() in a page but can have multiple res.write() ad both have same same work.
      res.write("<p><h1>The weather in " + query + " is curently " + weatherDescription + "</h1><p>");
      res.write("<h1>The Temperature in " + query + " is " + temp + "degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send()
    });

  });

})


app.listen(3000, function() { // To connect to the server
  console.log("The surver is running on port 3000");
})
