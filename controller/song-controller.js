'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('http:controller');

const DATA_URL = `${__dirname}/../data/json-storage`;
module.exports = exports = {};


exports.createItem = function(schema, song) {
  debug('controller.createItem()');

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!song) return Promise.reject(createError(400, 'song required'));

  let songData = JSON.stringify(song);
  return fs.writeFileProm(`${DATA_URL}/${song.id}.json`, songData, debug('createItem.writeFileProm()'))
  .then(() => song)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id) {
  debug('controller.fetchItem()');

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.readFileProm(`${DATA_URL}/${id}.json`, debug('fetchItem.readFileProm()'))
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateItem = function(schema, id, song) {
  debug('controller.updateItem()');

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!song) return Promise.reject(createError(400, 'song required'));

  return fs.readFileProm(`${DATA_URL}/${id}.json`, debug('updateItem.readFileProm()'))
  .then(data => {
    let songData = JSON.parse(data.toString());
    songData.title = song.title || songData.title;
    songData.artist = song.artist || songData.artist;
    songData.album = song.album || songData.album;

    let jsonData = JSON.stringify(songData);

    return fs.writeFileProm(`${DATA_URL}/${id}.json`, jsonData, debug('updateItem.writeFileProm()'))
    .then(() => songData)
    .catch(err => Promise.reject(createError(500, err.message)));

  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteItem = function(schema, id) {
  debug('controller.deleteItem()');

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  // return fs.unlinkProm(`${DATA_URL}/${id}.json`);
};
