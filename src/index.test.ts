/* eslint-disable no-undef */
import request from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';
import server from '.';

describe('Initialize', ():void => {
  it('should run', (done):void => {
    done();
  });

  it('Hello World!', (done) => {
    request(server.app).get('/').expect(200).end((_err, res) => {
      assert.equal(res.text, 'Hello World!');
      done();
    });
  });
});

describe('Search routes', ():void => {
  it('Search all', (done) => {
    request(server.app).get('/api/v1/search').expect(200).end((_err, res) => {
      assert.equal(res.text, 'search all');
      done();
    });
  });
  it('Search Dentists', (done) => {
    request(server.app).get('/api/v1/search/dentists').expect(200).end((_err, res) => {
      assert.equal(res.text, 'search dentists');
      done();
    });
  });
  it('Search Vets', (done) => {
    request(server.app).get('/api/v1/search/vets').expect(200).end((_err, res) => {
      assert.equal(res.text, 'search vets');
      done();
    });
  });
});

after('Exit mocha gracefully after finishing all tests execution', () => {
  // Exit node process
  process.exit();
});
