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
          3,
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
    },
    {
      "taunt": "goat gud",
      "name": "your-snake",
      "id": "12345-f0d7-4315-8c52-6b0ff23fb1fb",
      "health_points": 93,
      "coords": [
        [
          2,
          0
        ],
        [
          2,
          1
        ],
        [
          1,
          1
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
  var maxW = data.width;
  var maxH = data.height;
  var wall_coords = [];

  for (var i = 0; i < maxW; i++) {
    wall_coords.push([i, -1]);
    wall_coords.push([i, maxH])
  }

  for (var j = 0; j < maxH; j++) {
    wall_coords.push([-1, j]);
    wall_coords.push([maxW, j])
  }

  return wall_coords;
}

function start(data) {
  var startData = JSON.parse(data)
  return startData
}

function move(move_data) {
var data = {
    move: 'right', // one of: ["up", "right", "down", "left"]
    taunt: config.snake.taunt.move
  }

  return data
}

//I want to work on this more because it seems hella clunky right now
function murderSnake(dataJSON) {
  let mySize = getMySnake(dataJSON).coords.length
  let otherSnakes = getOtherSnakes(dataJSON)
  for (let i = 0; i < otherSnakes.length; i++){
    if (mySize > otherSnakes[i].coords.length){
      if (isSafeSpace(otherSnakes[i].coords[0]))
        return false //fix
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
      return snakes[i].coords
    }
  }
}

//return an array of snake objects that aren't us
function getOtherSnakes(dataJSON){
  snakes = dataJSON.snakes
  let otherSnakes = []
  for (let i = 0; i < snakes.length; i++){
    if (snakes[i].id !== dataJSON.you){
      otherSnakes = otherSnakes.concat(snakes[i].coords)
    }
  }
  return otherSnakes
}

function addSnakesToDANGERZONE(dataJSON){ //needs fixing?
  dangerSnakes = []
  snakes = dataJSON.snakes
  for (let i = 0; i < snakes.length; i++){
    //exclude the head of a smaller snake from dangerous coords so we can kill it
    // also ignore our head and just figure out where our body is at (minus last segment)
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
  console.log("danger snakes: ", dangerSnakes);
  return dangerSnakes
}

function surrounded(move, danger_zones) {
  var snake_head = getMySnake(move).coords[0];
  var up  = [snake_head[0], snake_head[1] - 1];
  var down = [snake_head[0], snake_head[1] + 1];
  var right = [snake_head[0] + 1 , snake_head[1]];
  var left = [snake_head[0] - 1 , snake_head[1]];
  var up_arr = [];
  var down_arr = [];
  var right_arr = [];
  var left_arr = [];

  var surrounded_coords = [];

  for (var i = 0; i < danger_zones.length; i++) {
    var current_DZ_coord = danger_zones[i].toString();

    if ( current_DZ_coord == [up[0]-1, up[1]].toString() ||
      current_DZ_coord == [up[0], up[1]-1].toString() ||
      current_DZ_coord == [up[0]+1, up[1]].toString() ) {

      up_arr.push(current_DZ_coord)
    }

    if ( current_DZ_coord == [right[0], right[1]+1].toString() ||
      current_DZ_coord == [right[0]+1, right[1]].toString() ||
      current_DZ_coord == [right[0], right[1]-1].toString() ) {

      right_arr.push(current_DZ_coord)
    }

    if ( current_DZ_coord == [down[0]-1, down[1]].toString() ||
      current_DZ_coord == [down[0], down[1]+1].toString() ||
      current_DZ_coord == [down[0]+1, down[1]].toString() ) {

      down_arr.push(current_DZ_coord)
    }

    if ( current_DZ_coord == [left[0], left[1]+1].toString() ||
      current_DZ_coord == [left[0]-1, left[1]].toString() ||
      current_DZ_coord == [left[0], left[1]-1].toString() ) {

      left_arr.push(current_DZ_coord)
    }

  }

    if (up_arr.length == 3) {
      surrounded_coords.push (up);
    }

    if (right_arr.length == 3 ) {
      surrounded_coords.push (right);
    }

    if (left_arr.length == 3 ) {
      surrounded_coords.push (left);
    }

    if (down_arr.length == 3) {
      surrounded_coords.push (down);
    }

  return surrounded_coords;
}

function dangerZone(start, move) {
// danger zones
  var danger_zones = []

//  1 - if space occupied by snake including your own body (minus the last segment and head)
  var snake_coords = getOtherSnakes(move);
  danger_zones = danger_zones.concat(snake_coords);

  var my_snake_coords = getMySnake(move).pop();
  console.log("my snake minus its tail ", my_snake_coords)
  danger_zones = danger_zones.concat(my_snake_coords);

//  2 - if space is a wall
  var wall_coords = walls(start);
  danger_zones = danger_zones.concat(wall_coords)

  var interim_danger_zones = danger_zones.slice()
//  3 - if space surrounded on 3 sides
  var surrounded_coords = surrounded(move, interim_danger_zones);
  danger_zones = danger_zones.concat(surrounded_coords);

  console.log(danger_zones)
  return danger_zones
}

dangerZone (startData, moveData)
