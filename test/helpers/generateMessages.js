import { Message } from '../../lib/DTO/Message';

const randomDate = (start, end) => {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateMessages = (amount) => {
	const messages = [];
	let created_at = new Date(Date.now());

	for (let i = i; i <= amount; i++) {
		created_at = randomDate(new Date(2019, 8, 1), new Date(Date.now()));
		messages.push(new Message(i, created_at));
	}

	return messages;
};
