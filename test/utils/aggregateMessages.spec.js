import { expect } from 'chai';
import { aggregateMessages } from '../../lib/utils/aggregateMessages';
import { Message } from '../../lib/DTO/Message';

describe('aggregateMessages', () => {
	const messages = [
		{ id: 1, sender_id: 1, recipient_id: 2, message: 'message 1', created_at: '01 December 2019' },
		{ id: 2, sender_id: 1, recipient_id: 2, message: 'message 2', created_at: '02 December 2019' },
		{ id: 3, sender_id: 1, recipient_id: 2, message: 'message 3', created_at: '03 December 2019' },
	];

	it('Should aggregate the messages in a format readable for the client', () => {
		const aggregatedMessages = aggregateMessages(messages);
		expect(aggregatedMessages.length).to.equal(3);
		expect(aggregatedMessages[0]).to.be.an.instanceOf(Message);
		expect(aggregatedMessages[0]).to.have.property('message');
		expect(aggregatedMessages[0]).to.have.property('created_at');
	});
});
