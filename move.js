var fs = require("fs");
var filePath = "./testData.json";

function move(data) {
  var dataJSON = JSON.parse(data);
  console.log(dataJSON.snakes[0].taunt);
}

fs.readFile(filePath, function (err, data) {
   if (err) {
      return console.error(err);
   }
   move(data.toString());
});