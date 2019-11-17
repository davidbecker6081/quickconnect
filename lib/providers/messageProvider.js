const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
import { aggregateMessages } from '../utils/aggregateMessages';

export const getMessagesForRecipient = (req, res,) => {
	const { recipient_id, sender_id } = req.params;

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
