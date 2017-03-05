var express = require('express')
var router  = express.Router()
var move = require('../move.js')


// API docs don't indicate that we need a GET '/' callback
// Handle GET request to '/'
// router.get(config.routes.info, function (req, res) {
//   // Response data
//   var data = {
//   };

//   return res.json(data);
// });

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#DFFF00",
    name: "Trump Snake",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "Let's do thisss thang!", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move

  // Response data

  // var data = {
  //   move: 'right', // one of: ['up','down','left','right']
  //   taunt: 'Outta my way, snake!', // optional, but encouraged!
  // }

  var data = move.move(req.body)

  return res.json(data);
});

module.exports = router