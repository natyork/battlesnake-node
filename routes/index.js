var express = require('express')
var router  = express.Router()
var move = require('../move')

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
    name: "Raptor Snake",
    head_url: "http://vignette3.wikia.nocookie.net/jurassicpark/images/8/84/JP-Rayarnold.jpg/revision/latest?cb=20111125054803", // optional, but encouraged!
    taunt: "hold on to your butts", // optional, but encouraged!
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

  try {
      var data = move(req.body)
} catch (err) {
    console.log(err)
    console.log(req.body)
}




  return res.json(data);
});

module.exports = router