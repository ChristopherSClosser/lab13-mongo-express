'use strict';

const Song = require('../model/song');
const expect = require('chai').expect;

describe('Song model', () => {
  let newSong = new Song({title: 'wat', artist: 'yo',album: 'up'});

  it('should make a new song', done => {
    expect(newSong).to.exist;
    console.log('newsong' + newSong);
    done();
  });

  it('should have title property equal to value entered', done => {
    expect(newSong.title).to.equal('wat');
    done();
  });

  it('should have artist property', done => {
    expect(newSong).to.have.property('artist');
    done();
  });

  it('should have album property', done => {
    expect(newSong).to.have.property('album');
    done();
  });
});
