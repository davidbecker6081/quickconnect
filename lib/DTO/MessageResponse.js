export class MessageResponse {
	constructor(recipient_id, messages) {
		this.recipient_id = recipient_id;
		this.messages = messages;
	}
}
