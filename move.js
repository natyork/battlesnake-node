var fs = require("fs");
var filePath = "./testData.json";

var startData = {
  width: 20,
  height: 20,
  game_id: "abc123"
}

var moveData = {
  "you": "25229082-f0d7-4315-8c52-6b0ff23fb1fb",
  "width": 2,
  "turn": 0,
  "snakes": [
    {
      "taunt": "git gud",
      "name": "my-snake",
      "id": "25229082-f0d7-4315-8c52-6b0ff23fb1fb",
      "health_points": 93,
      "coords": [
        [
          0,
          0
        ],
        [
          0,
          0
        ],
        [
          0,
          0
        ]
      ]
    },
    {
      "taunt": "gotta go fast",
      "name": "other-snake",
      "id": "0fd33b05-37dd-419e-b44f-af9936a0a00c",
      "health_points": 50,
      "coords": [
        [
          1,
          0
        ],
        [
          1,
          0
        ],
        [
          1,
          0
        ]
      ]
    }
  ],
  "height": 2,
  "game_id": "870d6d79-93bf-4941-8d9e-944bee131167",
  "food": [
    [
      1,
      1
    ]
  ],
  "dead_snakes": [
    {
      "taunt": "gotta go fast",
      "name": "other-snake",
      "id": "c4e48602-197e-40b2-80af-8f89ba005ee9",
      "health_points": 50,
      "coords": [
        [
          5,
          0
        ],
        [
          5,
          0
        ],
        [
          5,
          0
        ]
      ]
    }
  ]
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

function start(data) {
  var startData = JSON.parse(data)
  return startData
}

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
  var snakes = dataJSON.snakes
  var you = dataJSON.you
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

function dangerZone(start, move) {
// danger zones
  var danger_zones = []
  var ourCoords = getMySnake(move)
  var us = ourCoords.coords

  console.log("our coord: ", us)




//  1 - if space occupied by snake including your own body
//  2 - if space surrounded on 3 sides
//  3 - if space is a wall
// 4 -  last coord on a

return danger_zones
}

dangerZone (startData, moveData)

