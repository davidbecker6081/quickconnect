const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
import { PostMessageResponse } from '../../DTO/PostMessageResponse';
import { PostMessage } from '../../DTO/PostMessage';

export const postMessageToRecipient = async (req, res,) => {
	try {
		const requiredKeys = ['message', 'sender_id', 'recipient_id'];
		for (let key of requiredKeys) {
			if (!req.body[key]) {
				return res.status(400).json({ error: `Missing key: ${key}`});
			}
		}

		const { message, sender_id, recipient_id } = req.body;
		const postMessage = new PostMessage(message, sender_id, recipient_id);
		const posted = await database('messages').insert(postMessage, '*');

		const { id, message: postedMessage, sender_id: sender, recipient_id: recipient, created_at, updated_at } = posted[0];
		const postMessageResponse = new PostMessageResponse(id, postedMessage, sender, recipient, created_at, updated_at);

		return res.status(201).json({ message: postMessageResponse });
	} catch (error) {
		return res.status(500).json({ error });
	}
};
