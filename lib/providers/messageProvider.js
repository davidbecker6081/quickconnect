const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
import { aggregateMessages } from '../utils/aggregateMessages';
import { MessageResponse } from '../DTO/MessageResponse';

export const getMessagesForRecipient = (req, res,) => {
	const { recipient_id, sender_id } = req.params;

	database('messages')
		.where({
			recipient_id,
			sender_id
		})
		.select()
		.then(messages => {
			if (!messages.length) {
				return res.status(404).json({
					error: `Could not find messages from sender: ${sender_id} to recipient: ${recipient_id}`
				});
			}

			const aggregatedMessages = aggregateMessages(messages);
			const messageResponse = new MessageResponse(sender_id, recipient_id, aggregatedMessages);
			return res.status(200).json(messageResponse);
		})
		.catch(error => res.status(500).json({ error }));
};
