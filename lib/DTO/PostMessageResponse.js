import { Message } from './Message';

export class PostMessageResponse extends Message {
	constructor(id, message, sender_id, recipient_id, created_at, updated_at) {
		super(message, created_at, sender_id);
		this.id = id;
		this.recipient_id = recipient_id;
		this.updated_at = updated_at;
	}
}
