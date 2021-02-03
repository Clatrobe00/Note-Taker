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
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

//api routes
app.post('/api/notes', (req, res) => {
  const body = req.body;
  body.id = uuidv4();
  const raw = fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json'));
  const noteArr = JSON.parse(raw);
  noteArr.push(req.body);
  const data = JSON.stringify(noteArr);
  fs.writeFileSync('./Develop/db/db.json', data, function(err) {console.log(err)});
  res.end();
});

// get all notes
app.get('/api/notes', (req, res) => {
  const rawNotes = fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json'));
  res.send(rawNotes);
  res.end();
});

// delete note
app.delete(`/api/notes/:id`, (req, res) => {
  const rawNotes = fs.readFileSync(path.resolve(__dirname, './Develop/db/db.json'));
  const noteArrDel = JSON.parse(rawNotes);
  const delNote = noteArrDel.filter(note => note.id !== req.params.id);
  fs.writeFileSync('./Develop/db/db.json', JSON.stringify(delNote), function(err) {console.log(err)});
  res.end();
});

// PORT
const localPORT = 3000;

app.listen((process.env.PORT || localPORT), () => {
   console.log(`Server is running on PORT`);
});