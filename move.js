var fs = require("fs");
var filePath = "./testData.json";

var startData = {
  width: 20,
  height: 20,
  game_id: "abc123"
}

function walls(data) {
  var maxX = data.width;
  var maxY = data.height;
  var wall_coords = [[0,0], [0, maxY], [maxX, 0], [maxX, maxY]];

  for (var j = 1; j < maxY; j++) {
    wall_coords.push([0, j]);
    wall_coords.push([maxX, j])
  }

  for (var i = 1; i < maxX; i++) {
    wall_coords.push([i, 0]);
    wall_coords.push([i, maxY])
  }


  console.log(wall_coords.sort())

}

walls(startData)

function move(data) {
  var dataJSON = JSON.parse(data);
  console.log(dataJSON.snakes[0].taunt);
}

function dangerZone(data) {
// danger zones
//  1 - if space occupied by snake including your own body
//  2 - if space surrounded on 3 sides
//  3 - if space is a wall



}

// fs.readFile(filePath, function (err, data) {
//    if (err) {
//       return console.error(err);
//    }
//    move(data.toString());
// });