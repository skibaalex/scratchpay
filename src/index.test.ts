/* eslint-disable no-undef */
import request from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { assert, expect } from 'chai';
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
      expect(res.body).to.be.an('array');
      done();
    });
  });
  it('Query specific opening', (done) => {
    request(server.app).get('/api/v1/search?opening=6:26').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array');
      done();
    });
  });
  it('Query specific state', (done) => {
    request(server.app).get('/api/v1/search?state=Ca').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array');
      done();
    });
  });
  it('Query specific name', (done) => {
    request(server.app).get('/api/v1/search?state=Sw').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array');
      done();
    });
  });
  it('Search Dentists', (done) => {
    request(server.app).get('/api/v1/search/dentists').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array');
      done();
    });
  });
  it('Search Vets', (done) => {
    request(server.app).get('/api/v1/search/vets').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array');
      done();
    });
  });
});

describe('Query dentists clinics', () => {
  it('Query specific opening', (done) => {
    request(server.app).get('/api/v1/search/dentists?opening=16:25').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array').length.is.greaterThan(0);
      done();
    });
  });
  it('Query specific state', (done) => {
    request(server.app).get('/api/v1/search/dentists?state=az').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array').length.is.greaterThan(0);
      done();
    });
  });
  it('Query specific name', (done) => {
    request(server.app).get('/api/v1/search/dentists?name=swedish').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array').length.is.greaterThan(0);
      done();
    });
  });
});

describe('Query dentists clinics', () => {
  it('Query specific opening', (done) => {
    request(server.app).get('/api/v1/search/vets?opening=16:25').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array').length.is.greaterThan(0);
      done();
    });
  });
  it('Query specific state', (done) => {
    request(server.app).get('/api/v1/search/vets?state=fl').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array').length.is.greaterThan(0);
      done();
    });
  });
  it('Query specific name', (done) => {
    request(server.app).get('/api/v1/search/vets?name=oo').expect(200).end((_err, res) => {
      expect(res.body).to.be.an('array').length.is.greaterThan(0);
      done();
    });
  });
});

describe('Errors', ():void => {
  it('404 Error', (done) => {
    request(server.app).get('/some/random/endpoint').expect(404).end(() => {
      done();
    });
  });
});

after('Exit mocha gracefully after finishing all tests execution', () => {
  // Exit node process
  process.exit();
});
