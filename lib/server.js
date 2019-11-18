import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { ignoreFavicon } from './utils/ignoreFavicon';
import { getMessagesForRecipient, getAllMessagesForRecipient } from './providers/messageProviders/getMessageProvider';
import { postMessageToRecipient } from './providers/messageProviders/postMessageProvider';

const app = express();

app.use(cors());
app.use(ignoreFavicon);

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.title = 'Quick Connect';

app.get(`/public/${process.env.API_VERSION}/health-check`, (req, res) => res.status(200).json({ status: 'OK', version: process.env.API_VERSION }));
app.get(`/public/${process.env.API_VERSION}/messages/:recipient_id`, getAllMessagesForRecipient);
app.get(`/public/${process.env.API_VERSION}/messages/:recipient_id/:sender_id`, getMessagesForRecipient);
app.post(`/public/${process.env.API_VERSION}/message`, postMessageToRecipient);

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

export default app;
