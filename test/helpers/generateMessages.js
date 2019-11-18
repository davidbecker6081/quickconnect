const randomDate = (start, end) => {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateMessages = (amount, userA, userB) => {
	const messages = [];
	let created_at = new Date(Date.now());

	for (let i = 1; i <= amount; i++) {
		created_at = randomDate(new Date(2019, 8, 1), new Date(Date.now()));
		if (i % 2 === 0) {
			messages.push({ message: i, sender_id: userA, recipient_id: userB, created_at });
		} else {
			messages.push({ message: i, sender_id: userB, recipient_id: userA, created_at });
		}
	}

	return messages;
};

module.exports = generateMessages;
