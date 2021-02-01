const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./Develop/public'))


// html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/notes.html')));

//api routes

app.post('/api/notes', (req, res) => console.log(req));

// PORT
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});


//PSEUDOCODE
// add express server DONE
// create express app  DONE
// include midleware to parse json DONE
// html routes (routes that will serve websites) DONE
//define landing page route  DONE
  // use index.html inside public folder DONE
// note page route DONE
  // use notes.html inside public folder DONE
//API routes 
// post route to save a note 
  // ADD the new note to the db.json
// get route to get all notes
// put route to update a note (app.put())
// delete route to delete a note
// invoke listen function on express app