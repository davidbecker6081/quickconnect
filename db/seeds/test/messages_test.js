var generateMessages = require('../../../test/helpers/generateMessages');

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('messages').del()
		.then(function () {
			// Inserts seed entries
			return knex('messages').insert(generateMessages(1000, 12345, 54321));
		})
		.then(() => console.log('Seeding Complete'))
		.catch(e => console.log(e));
};
