'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const WordArtResource = require('./server/word-art-resource.js');

const wordArts = new WordArtResource();

function sendError(response, status, error) {
  let body = { status };
  if (error) {
    body.message = error.toString();
  }
  response.status(status).send(body);
}

app.all('*', function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static('client'));
app.use(bodyParser.json());

app.route('/api/word_art/:id?')
  .get((req, res) => {
    if (req.params.id) {
      wordArts.read(req.params.id)
          .then(result => res.json(result))
          .catch(error => sendError(res, 404, error));
    } else {
      wordArts.index()
          .then(result => res.json(result))
          .catch(error => sendError(res, 500, error));
    }
  })
  .put((req, res) => {
    wordArts.update(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(error => sendError(res, 500, error));
  })
  .post((req, res) => {
    wordArts.create(req.body || {})
        .then(result => res.json(result))
        .catch(error => sendError(res, 500, error));
  });


app.listen(8080);
console.log('Server listening on port 8080...');
