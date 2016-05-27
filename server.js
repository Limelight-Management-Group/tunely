// SERVER-SIDE JAVASCRIPT
var db = require("./models");
var parser = require('body-parser');



//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
db.Album.find({}, function(err, albums) {
res.json(albums);
})
})

app.post('/api/albums', function album_post(req, res){
  console.log("hello from server");  // this is getting called from app.js
db.Album.create({}, function(err, albums) {
res.json(albums);
})
});

  // parse the body of the req and send it back to createAlbum
  // db.Album.create()
// res.json(req)
// });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
