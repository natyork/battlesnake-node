var fs = require("fs");
var filePath = "./testData.json";

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

fs.readFile(filePath, function (err, data) {
   if (err) {
      return console.error(err);
   }
   move(data.toString());
});