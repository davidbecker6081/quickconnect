const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
import { PostMessageResponse } from '../../DTO/PostMessageResponse';

export const postMessageToRecipient = async (req, res,) => {
	try {
		const requiredKeys = ['message', 'sender_id', 'recipient_id'];
		for (let key of requiredKeys) {
			if (!req.body[key]) {
				return res.status(400).json({ error: `Missing key: ${key}`});
			}
		}

		const posted = await database('messages').insert(req.body, '*');
		const { id, message, sender_id, recipient_id, created_at, updated_at } = posted[0];
		const postMessageResponse = new PostMessageResponse(id, message, sender_id, recipient_id, created_at, updated_at);

		return res.status(201).json({ message: postMessageResponse });
	} catch (error) {
		return res.status(500).json({ error });
	}
};
