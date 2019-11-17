const formatMessage = (message) => ({ message: message.message, created_at: message.created_at });

export const aggregateMessages = (messages) => messages.map(formatMessage);
