const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 4001;
const { clog } = require('./middleware/clog');
const path = require('path');
const api = require('./routes/index.js');
// const notes = require('./routes/index-notes.js');

const app = express();

// Middlewares
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
// app.use('/notes', notes);


app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
