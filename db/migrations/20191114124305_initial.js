
exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('messages', table => {
			table.increments('id').primary();
			table.string('message');
			table.integer('sender_id');
			table.integer('recipient_id');
			table.timestamps(true, true);
		})
	]);
};

exports.down = function(knex) {
	return Promise.all([
		knex.schema.dropTable('messages')
	]);
};
