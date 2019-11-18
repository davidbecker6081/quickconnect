const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
import { aggregateMessages } from '../../utils/aggregateMessages';
import { MessageResponse } from '../../DTO/MessageResponse';

export const getMessagesForRecipient = async (req, res,) => {
	try {
		const { recipient_id, sender_id } = req.params;

		let retrieved;
		if (req.query.limit) {
			retrieved = await database('messages')
				.where({
					recipient_id,
					sender_id
				})
				.limit(100)
				.select();
		} else {
			let thirtyDaysPast = new Date(Date.now());
			thirtyDaysPast.setDate(thirtyDaysPast.getDate() - 30);
			const today = new Date(Date.now());

			retrieved = await database('messages')
				.where({
					recipient_id,
					sender_id
				})
				.whereBetween('created_at', [thirtyDaysPast, today])
				.select();
		}

		if (!retrieved.length) {
			return res.status(404).json({
				error: `Could not find messages from sender: ${sender_id} to recipient: ${recipient_id}`
			});
		}

		const aggregatedMessages = aggregateMessages(retrieved);
		const messageResponse = new MessageResponse(recipient_id, aggregatedMessages);
		return res.status(200).json(messageResponse);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

export const getAllMessagesForRecipient = async (req, res,) => {
	try {
		const { recipient_id } = req.params;

		let retrieved;
		if (req.query.limit) {
			retrieved = await database('messages')
				.where({
					recipient_id
				})
				.limit(100)
				.select();
		} else {
			let thirtyDaysPast = new Date(Date.now());
			thirtyDaysPast.setDate(thirtyDaysPast.getDate() - 30);
			const today = new Date(Date.now());

			retrieved = await database('messages')
				.where({
					recipient_id
				})
				.whereBetween('created_at', [thirtyDaysPast, today])
				.select();
		}

		if (!retrieved.length) {
			return res.status(404).json({
				error: `Could not find messages for recipient: ${recipient_id}`
			});
		}

		const aggregatedMessages = aggregateMessages(retrieved);
		const messageResponse = new MessageResponse(recipient_id, aggregatedMessages);
		return res.status(200).json(messageResponse);
	} catch (error) {
		return res.status(500).json({ error });
	}
};
