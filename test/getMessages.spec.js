var path = require('path');
var dotEnvPath = path.resolve('../.env');
require('dotenv').config({ path: dotEnvPath});

import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../lib/server';
const environment = process.env.NODE_ENV_TEST || 'test';
const configuration = require('../lib/knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('GET - messages', () => {
	const recipient_id = 12345;
	const sender_id = 54321;

	beforeEach(async () => {
		await database.migrate
			.rollback()
			.then(() => database.migrate.latest())
			.catch(error => error);

		await database.seed
			.run()
			.catch(error => error);
	});

	describe('GET - success /public/v1/messages/:recipient_id/:sender_id', () => {
		let response;

		before(async () => {
			response = await request(server).get(`/public/v1/messages/${recipient_id}/${sender_id}`);
		});

		it('Should have status of 200', () => {
			expect(response.status).to.equal(200);
		});

		it('Should contain the correct response body', () => {
			const { body } = response;
			expect(body).to.have.property('sender_id');
			expect(body).to.have.property('recipient_id');
			expect(body).to.have.property('messages');

			const { sender_id, recipient_id, messages } = body;
			expect(sender_id).to.equal(sender_id);
			expect(parseInt(sender_id)).to.be.a('number');

			expect(recipient_id).to.equal(recipient_id);
			expect(parseInt(recipient_id)).to.be.a('number');

			expect(messages).to.be.an('array');
			expect(messages.length).to.equal(1);
			expect(messages[0]).to.have.property('message');
			expect(messages[0].message).to.be.a('string');
			expect(messages[0]).to.have.property('created_at');
			expect(messages[0].created_at).to.be.a('string');
		});

	});

	describe('GET - error /public/v1/messages/:recipient_id/:sender_id', () => {
		describe('Could not find messages from sender', () => {
			let response;

			before(async () => {
				response = await request(server).get('/public/v1/messages/12345/00000');
			});

			it('Should have status of 404', () => {
				expect(response.status).to.equal(404);
			});

			it('Should contain the correct error message', () => {
				expect(response.body.error).to.equal('Could not find messages from sender: 00000 to recipient: 12345');
			});

		});
	});
});
