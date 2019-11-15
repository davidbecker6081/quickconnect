const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

export const getMessagesForRecipient = (req, res) => {
	const { recipient_id, sender_id } = req.params;

	if (!recipient_id || !sender_id) {
		return res.status(400).json({
			error: 'Please provide both a recipient_id and sender_id'
		});
	}

	const formatMessage = (message) => ({ message: message.message, created_at: message.created_at });
	const aggregateMessages = (messages) => messages.map(formatMessage);

	database('messages')
		.where({
			recipient_id,
			sender_id
		})
		.select()
		.then(messages => {
			messages.length
				? res.status(200).json({
					sender_id,
					recipient_id,
					messages: aggregateMessages(messages)
				})
				: res.status(404).json({
					error: `Could not find messages from sender: ${sender_id} to recipient: ${recipient_id}`
				});
		})
		.catch(error => res.status(500).json({ error }));
};
