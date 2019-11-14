const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pet Box';

app.get('/title', (request, response) => {
	const { title } = app.locals.title;
	return response.json({ title });
});

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

export default app;
