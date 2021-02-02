const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./Develop/public'))


// html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/notes.html')));

//api routes

app.post('/api/notes', (req, res) => {
  const body = req.body;
  body.id = uuidv4();
  console.log(body.id);
  const raw = fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json'));
  const noteArr = JSON.parse(raw);
  noteArr.push(req.body);
  const data = JSON.stringify(noteArr);
  fs.writeFileSync('./Develop/db/db.json', data, function(err) {console.log(err)});
});

// get all notes

app.get('/api/notes', (req, res) => {
  const rawNotes = fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json'));
  res.send(rawNotes);
  //console.log(rawNotes);
})

// delete note

app.delete(`/api/notes/:id`, (req, res) => {
  const rawNotes = fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json'));
  const noteArrDel = JSON.parse(rawNotes);
  console.log(req.params);
  //console.log(noteArrDel);
})

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
// post route to save a note DONE
  // ADD the new note to the db.json DONE
// get route to get all notes DONE
// put route to update a note (app.put()) 
// delete route to delete a note
// invoke listen function on express app