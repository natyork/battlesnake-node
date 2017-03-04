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
  // console.log(murderSnake(dataJSON))
  // console.log('\n')
  // console.log(getMySnake(dataJSON))
  // console.log('\n')
  console.log(getOtherSnakes(dataJSON))
  // console.log('\n')
  // console.log(addSnakesToDANGERZONE(dataJSON))
}

//I want to work on this more because it seems hella clunky right now
function murderSnake(dataJSON) {
  let mySize = getMySnake(dataJSON).coords.length
  let otherSnakes = getOtherSnakes(dataJSON)
  for (let i = 0; i < otherSnakes.length; i++){
    if (mySize > otherSnakes[i].coords.length){
      if (isSafeSpace(otherSnakes[i].coords[0]))
        return true
    }
  }
  return false;
}

// return the object for our snake
function getMySnake(dataJSON) {
  snakes = dataJSON.snakes
  you = dataJSON.you
  for (var i = 0; i < snakes.length; i++){
    if (snakes[i].id === you) {
      return snakes[i]
    }
  }
}

//return an array of snake objects that aren't us
function getOtherSnakes(dataJSON){
  snakes = dataJSON.snakes
  let otherSnakes = []
  for (let i = 0; i < snakes.length; i++){
    if (snakes[i].id !== dataJSON.you){
      otherSnakes.push(snakes[i])
    }
  }
  return otherSnakes
}

function addSnakesToDANGERZONE(dataJSON){
  dangerSnakes = []
  snakes = dataJSON.snakes
  for (let i = 0; i < snakes.length; i++){
    //exclude the head of a smaller snake from dangerous coords so we can kill it
    // also ignore our head and just figure out where our body is at
    if (murderSnake(dataJSON) || snakes[i].id === dataJSON.you){
      for (let j = 1; j < snakes[i].coords.length; j++){
        dangerSnakes.push(snakes[i].coords[j])
      }
    } else {
      for (let j = 1; j < snakes[i].coords.length; j++){
        dangerSnakes.push(snakes[i].coords[j])
      }
    }
  }
  return dangerSnakes
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