const audio = document.querySelector('audio');
audio.play();
const healthCheck = document.querySelector('.health-check');

const getAllMessages = document.querySelector('.get-all-messages');
const getAllMessagesLimit = document.querySelector('.get-all-messages-limit');

const getMessages = document.querySelector('.get-messages');
const getMessagesLimit = document.querySelector('.get-messages-limit');

const postMessage = document.querySelector('.post-message');

audio.currentTime = 3;
audio.addEventListener('ended', () => {
	if (audio.src === '/assets/Watermelon Man-[AudioTrimmer.com].mp3') {
		audio.src = '/assets/james-brown-instrumental.mp3';
	} else {
		audio.src = '/assets/Watermelon Man-[AudioTrimmer.com].mp3';
	}
	audio.play();
});

healthCheck.addEventListener('click', () => {
	const win = window.open('/public/v1/health-check');
	win.focus();
});

getAllMessages.addEventListener('click', () => {
	const win = window.open('/public/v1/messages/12345/54321');
	win.focus();
});

getAllMessagesLimit.addEventListener('click', () => {
	const win = window.open('/public/v1/messages/12345/54321/?limit=true');
	win.focus();
});

getMessages.addEventListener('click', () => {
	const win = window.open('/public/v1/messages/12345');
	win.focus();
});

getMessagesLimit.addEventListener('click', () => {
	const win = window.open('/public/v1/messages/12345/?limit=true');
	win.focus();
});

postMessage.addEventListener('click', () => {
	const message = {
		message: 'This is a message!',
		sender_id: '12345',
		recipient_id: '54321'
	};
	fetch('/public/v1/message', {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(message)
	}).then(res => {
		return res.json();
	}).then(res => {

		const jsonResponse = document.createElement('textarea');

		jsonResponse.className = 'post-response';
		const textNode = document.createTextNode(`${JSON.stringify(res, null, 4)}`);
		jsonResponse.appendChild(textNode);

		const closeBtn = document.createElement('button');
		closeBtn.className = 'close';
		const btnText = document.createTextNode('X');
		closeBtn.appendChild(btnText);
		document.body.appendChild(closeBtn);
		jsonResponse.readonly = true;

		document.body.appendChild(jsonResponse);

		const close = document.querySelector('.close');
		const postResponse = document.querySelector('.post-response');
		close.addEventListener('click', () => {
			document.body.removeChild(postResponse);
			document.body.removeChild(close);
		});

	});
});
