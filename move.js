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
      "health_points": 33,
      "coords": [
        [
          2,
          3
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
      4
    ],
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

const HUNGRY = 50;

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

// walls(startData)
function start(data) {
  var startData = JSON.parse(data)
  return startData
}

function checkInclusion(DZCoords, move){
  move = move.toString()
  DZCoords = DZCoords.toString()
  console.log(`checking ${move} vs ${DZCoords}`)
  if (DZCoords.includes(move)) {
    return true
  }
  return false
}

function move(data) {
  let returnData = {status:200, taunt:'Samuel L Jackson said it was cool if we stayed on the plane. We\'re that awesome.'}
  let us = getMySnake(data)
  let head = us.coords[0]
  dangerZone()
  let moveCoord = prioritize()
  if (typeof(moveCoord) === 'string'){
    returnData.taunt = moveCoord;
    return returnData;
  }
  if(head[0] < moveCoord[0]){
    returnData.move = "right"
  }
  if(head[1] < moveCoord[1]){
    returnData.move = "down"
  }
  if(head[1] > moveCoord[1]){
    returnData.move = "up"
  }
  if(head[0] > moveCoord[0]){
    returnData.move = "left"
  }
  return returnData
}
//pass in our head location and the coords of where we want to get to
//returns an array of potential move locations to check against danger zones
function potentialMoves(head, goal) {
  console.log('head', head)
  console.log('goal', goal)
  let startX = head[0]
  let startY = head[1]
  let potentials = []
  if(head[0] < goal[0]){
    console.log('adding direction east')
    potentials.push([startX+1, startY])
  }
  if(head[1] < goal[1]){
    console.log('adding direction south')
    potentials.push([startX,startY+1])
  }
  if(head[1] > goal[1]){
    console.log('adding direction north')
    potentials.push([startX, startY-1])
  }
  if(head[0] > goal[0]){
    console.log('adding direction west')
    potentials.push([startX-1, startY])
  }
  console.log(potentials)
  return potentials;
}

let dangerZones = [[2,3],[1,1],[1,2],[1,3],[2,4]]
prioritize(dangerZones,moveData)

function prioritize(dangerZones, data) {
  us = getMySnake(data);
  if(us.health_points <= HUNGRY) {
    let eatThis = scavenge(data, us)
    let safeFood = onTheHunt(dangerZones, eatThis, data)
    if (safeFood){
      return safeFood
    }
  }
  let tail = chaseTail(us)
  if (tail) {
    return tail
  }
  let potentialSafety = potentialMoves(us.coords[0], [maxX, maxY])
  let safety;
  for (let i = 0; i < potentialSafety.length; i++){
    if (!checkInclusion(dangerZones, potentialSafety[i])){
      return safety;
    } else {
      taunt = "I'll get you yet! And your little dog, too!!!!!!"
      return taunt
    }
  }
}


function scavenge(data, us) {
  let food = data.food;
  let head = us.coords;
  let diffHorizontal = Math.abs(food[0][0] - head[0]);
  let diffVertical = Math.abs(food[0][1] - head[1]);
  let priority = food[0];
  let absoluteDiff = diffHorizontal + diffVertical;
  for (let i = 1; i < food.length; i++){
    diffHorizontal = Math.abs(food[i][0] - head[0]);
    diffVertical = Math.abs(food[i][1] - head[1]);
    totalDiff = diffHorizontal + diffVertical;
    if (totalDiff < absoluteDiff){
      absoluteDiff = totalDiff
      priority = food[i]
    }
  }
  return priority
}

function onTheHunt(dangerZones, food, data) {
  let head = getMySnake(data).coords[0]
  let potentials = potentialMoves(head, food)
  for (let i = 0; i < potentials.length; i++) {
    if (!checkInclusion(dangerZones, potentials[i])){
      return potentials[i]
    }
  }
  return false;
}

function chaseTail(us, dangerZones){
  let head = us.coords[0]
  let tail = us.coords[coords.length - 1]
  let potentials = potentialMoves(head, tail)
  for (let i = 0; i < potentials.length; i++) {
    if (!checkInclusion(dangerZones, potentials[i])){
      return potentials[i]
    }
  }
  return false;
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

// dangerZone (startData, moveData)
// move(moveData)

