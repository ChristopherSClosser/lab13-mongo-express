'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

describe('Server method - Test', () => {
  let app;

  before(done => {
    app = server.listen(8000);
    done();
  });

  describe('/wrong endpoint', () => {

    it('should respond with a 404 on bad request', done => {
      chai.request(server)
      .post('/')
      .send({})
      .end((err, res) => {
        expect(res.status).to.deep.equal(404);
        done();
      });
    });
  });

  describe('POST method', function() {

    describe('/api/song endpoint', function() {

      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/api/song')
        .send({title: 'test-title', artist: 'test-artist', album: 'test-album', id: 'test-post'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/api/song')
        .send({title: 'test-title', artist: 'test-artist', album: 'test-album', id: 'test-post'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should save to json file', done => {
        expect('../data/json-storage/test-post.json').to.exist;
        done();
      });

      it('should have an id property', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.id).to.equal('test-post');
        });
        done();
      });

      it('should post a new song with title', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.title).to.equal('test-title');
        });

        done();
      });

      it('should post a new song with artist', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.artist).to.equal('test-artist');
        });

        done();
      });

      it('should post a new song with album', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.album).to.equal('test-album');
        });

        done();
      });
    });
  });

  describe('GET method', () => {

    describe('/api/song?id endpoint', () => {

      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/api/song/test-post')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should return the song by id', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.id).to.equal('test-post');
        });

        done();
      });

      it('should return the song with proper title property', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.title).to.equal('test-title');
        });

        done();
      });
    });
  });

  describe('PUT method', function() {

    describe('/api/song endpoint', function() {

      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .put('/api/song?id=test-post&title=newtest-title&artist=newtest-artist&album=newtest-album')
        .end((err, res) => {

          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should "put" changes to song property title', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.title).to.equal('newtest-title');
        });

        done();
      });

      it('should "put" changes to song property artist', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.artist).to.equal('newtest-artist');
        });

        done();
      });

      it('should "put" changes to song property album', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          data = JSON.parse(data.toString());

          expect(data.album).to.equal('newtest-album');
        });

        done();
      });

      it('should save to json file of same id name with changes', done => {

        expect('../data/json-storage/test-post.json').to.exist;

        done();
      });
    });
  });

  describe('DELETE method', function() {

    describe('/api/song endpoint', function() {

      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .delete('/api/song?id=test-post')
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
        done();
      });

      it('should delete the file by id selected', done => {
        fs.readFile('./data/json-storage/test-post.json', (err, data) => {
          expect(data).to.be('undefined');
          expect(err);
        });
        done();
      });
    });
  });

  after(done => {
    app.close();
    done();
  });
});
