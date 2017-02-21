var JSONitems = [];
var data;
fs = require('fs');
fs.readFile('JSON/booking.json', 'utf8', function (error,data) {
  if (error) {
    return console.log(error);
  }
  console.log("first log: " + data);
  JSONitems.push(data);
  console.log("second log: " + JSONitems);
});


/*
function readJSON(){
  console.log("doing some stuff");
  JSONitems = JSON.parse(data);
  console.log("second log: " + JSONitems);
  }

readJSON();
*/
