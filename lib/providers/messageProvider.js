const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

export const getMessagesForRecipient = (req, res) => {
	const { recipient_id, sender_id } = req.params;
  console.log('trying to get', recipient_id, sender_id)

	database('messages')
		.where({
			recipient_id,
			sender_id
		})
		.select()
		.then(messages => {
			messages.length
				? res.status(200).json({
					sender_id: 12345,
					recipient_id: 12345,
					messages: [
						{ 'message': 'Hey, how ya doing?', 'created_at': 'Thu Nov 14 2019 17:20:56 GMT-0700' }
					]
				})
				: res.status(404).json({
					error: `Could not find messages from sender: ${sender_id} to recipient: ${recipient_id}`
				});
		})
		.catch(error => res.status(500).json({ error }));
};
