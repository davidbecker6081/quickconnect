exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('messages').del()
		.then(function () {
			// Inserts seed entries
			return knex('messages').insert([
				{ message: 'ey there', sender_id: 12345, recipient_id: 54321 },
				{ message: 'how ya doing', sender_id: 54321, recipient_id: 12345 },
				{ message: 'I\'m doing great!', sender_id: 12345, recipient_id: 54321 }
			]);
		})
		.then(() => console.log('Seeding Complete'))
		.catch(e => console.log(e));
};
