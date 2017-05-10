'use strict';

const Song = require('../model/song');
const debug = require('debug')('http:server');
// const songCtrl = require('../controller/song-controller');

module.exports = function(router) {

  router.post('/api/song', (req, res) => {
    debug('routes.post()');
    new Song(req.body).save()
    .then(song => {
      console.log('the added song ', song);
      res.json(song);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/song', (req, res) => {
    debug('routes.get()');
    // console.log(req);
    if(!req.query.id) {
      Song.find()
      .then()
      .catch(err => res.status(400).send('no id queried ', err.message));
    } else {
      Song.findById(req.query.id)
      .then(song => {
        console.log('here is the song you requested: ', song);
        res.json(song);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.put('/api/song', (req, res) => {
    debug('routes.put()');
    if(!req.query.id) {
      Song.find()
      .then()
      .catch(err => res.status(400).send('no id queried', err.message));
    } else {
      Song.findByIdAndUpdate(req.query.id, req.body, {new: true})
      .then(song => {
        console.log('here is the song with updates ', song);
        res.json(song);
      });
    }
  });

  router.delete('/api/song', (req, res) => {
    debug('routes.delete()');
    if(!req.query.id) {
      Song.find()
      .then()
      .catch(err => res.status(400).send('no id queried ', err.message));
    } else {
      Song.findByIdAndRemove(req.query.id)
      .then(song => {
        console.log('you deleted this song ', song);
        res.json(song);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });
};
