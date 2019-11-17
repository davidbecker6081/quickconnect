export class MessageResponse {
	constructor(sender_id, recipient_id, messages) {
		this.sender_id = sender_id;
		this.recipient_id = recipient_id;
		this.messages = messages;
	}
}
