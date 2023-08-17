const notes = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETE Route for a specific tip
notes.delete('/:tip_id', (req, res) => {
  const tipId = req.params.tip_id;
  readFromFile('./db/tips.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((tip) => tip.tip_id !== tipId);

      // Save that array to the filesystem
      writeToFile('./db/tips.json', result);

      // Respond to the DELETE request
      res.json(`Item ${tipId} has been deleted 🗑️`);
    });
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text} = req.body;

  if (req.body) {
    const newTip = {
      title,
      text,
      // tip_id: uuidv4(),
    };

    readAndAppend(newTip, './db/db.json');
    res.json(`<note> added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
