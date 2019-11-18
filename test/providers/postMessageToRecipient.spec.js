import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../lib/server';
import { PostMessage } from '../../lib/DTO/PostMessage';

chai.use(chaiHttp);

describe('POST - message - one sender to one recipient', () => {
	const recipient_id = 12345;
	const sender_id = 54321;
	const message = 'heres a message';

	describe('POST - success /public/v1/message', () => {
		let response;
		let postMessage;

		before(async () => {
			postMessage = new PostMessage(message, sender_id, recipient_id);
			response = await request(server).post('/public/v1/message').send(postMessage);
		});

		it('Should have status of 200', () => {
			expect(response.status).to.equal(201);
		});

		it('Should contain the correct response body', () => {
			const { body } = response;
			expect(body).to.have.property('message');

			const { id, message, sender_id, recipient_id, created_at, updated_at } = body.message;
			expect(parseInt(id)).to.be.a('number');

			expect(message).to.equal(message);
			expect(message).to.be.a('string');

			expect(sender_id).to.equal(sender_id);
			expect(parseInt(sender_id)).to.be.a('number');

			expect(recipient_id).to.equal(recipient_id);
			expect(parseInt(recipient_id)).to.be.a('number');

			expect(new Date(created_at)).to.be.an.instanceOf(Date);
			expect(created_at).to.be.a('string');

			expect(new Date(updated_at)).to.be.an.instanceOf(Date);
			expect(updated_at).to.be.a('string');
		});
	});

	describe('POST - error /public/v1/message', () => {
		describe('Missing required body values', () => {
			let response;
			let invalidPostBody;

			before(async () => {
				invalidPostBody = { 'notTheRightKey': 1, 'anotherWrongKey': 2 };
				response = await request(server).post('/public/v1/message').send(invalidPostBody);
			});

			it('Should have status of 400', () => {
				expect(response.status).to.equal(400);
			});

			it('Should contain the correct error message', () => {
				expect(response.body.error).to.equal('Missing key: message');
			});

		});
	});
});
