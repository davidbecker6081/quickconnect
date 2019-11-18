import chai from 'chai';
import moment from 'moment';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../../lib/server';

chai.use(chaiHttp);

describe('GET - messages', () => {
	const recipient_id = 12345;
	const sender_id = 54321;

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
			expect(messages[0]).to.have.property('message');
			expect(messages[0].message).to.be.a('string');
			expect(messages[0]).to.have.property('created_at');
			expect(messages[0].created_at).to.be.a('string');
		});

		it('Should have a thirty day limit if no limit is specified', () => {
			let thirtyDaysPast = new Date(Date.now());
			thirtyDaysPast.setDate(thirtyDaysPast.getDate() - 30);
			const { messages } = response.body;

			for (let i = 0; i < messages.length; i++) {
				let dateIsLessThanThirty = moment(messages[i].created_at) >= moment(thirtyDaysPast);
				expect(dateIsLessThanThirty).to.be.true;
			}
		});

		it('Should limit response results to 100 if specified', async () => {
			response = await request(server).get(`/public/v1/messages/${recipient_id}/${sender_id}/?limit=true`);
			const { messages } = response.body;
			expect(messages.length).to.equal(100);
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
