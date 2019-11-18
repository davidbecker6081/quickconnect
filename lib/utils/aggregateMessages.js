import { Message } from '../DTO/Message';

const formatMessage = (message) => new Message(message.message, message.created_at, message.sender_id);

export const aggregateMessages = (messages) => messages.map(formatMessage);
