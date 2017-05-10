'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songItem = Schema({
  title: {type: String, required:true},
  artist: {type: String, required: true},
  album: {type: String, required: true},
});

module.exports = mongoose.model('song', songItem);
