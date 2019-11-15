import chai from 'chai';
const should = chai.should();
import chaiHttp from 'chai-http';
import server from '../lib/server';
const environment = process.env.NODE_ENV_TEST || 'test';
const configuration = require('../lib/knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('test', () => {
  it('Should run tests', () => {
    let neat = true;
    neat.should.equal(true);
  })
});
