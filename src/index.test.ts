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
  it('');
});
