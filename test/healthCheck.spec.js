import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../lib/server';

chai.use(chaiHttp);

describe('Health Check', () => {
	let response;

	before(async () => {
		response = await request(server).get('/public/v1/health-check');
	});

	it('Should return a healthy response', () => {
		expect(response.status).to.equal(200);
		expect(response.body.status).to.equal('OK');
		expect(response.body.version).to.equal('v1');
	});
});
