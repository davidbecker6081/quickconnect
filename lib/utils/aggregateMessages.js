import moment from 'moment';
import { Message } from '../DTO/Message';

const formatMessage = (message) => new Message(message.message, message.created_at);

export const aggregateMessages = (messages) => messages.map(formatMessage);

// import moment from 'moment';
// import { Message } from '../DTO/Message';
//
// const formatMessage = (message) => new Message(message.message, message.created_at);
// export const getFirstHundred = (messages) => messages.slice(0, 100);
// export const getMessagesFromThirtyDays = (messages) => messages.filter(m => moment(m.created_at) > moment().subtract(30, 'days'));
//
// export const aggregateMessages = (messages) => {
// 	const mapped = messages.map(formatMessage);
// 	if (mapped.length > 100) {
// 		return getFirstHundred(mapped);
// 	}
// 	return getMessagesFromThirtyDays(messages);
// };
