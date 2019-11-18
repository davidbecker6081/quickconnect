const enterBtn = document.querySelector('.enter-btn');

enterBtn.addEventListener('click', () => {
	const enterScreen = document.querySelector('.enter-screen');
	const audio = document.querySelector('audio');
	const title = document.querySelector('.title');
	const subText = document.querySelector('.sub-text');
	const endpoints = document.querySelector('.endpoints');
	const endpointTitle = document.querySelector('h3');

	audio.muted = false;
	audio.play();
	audio.currentTime = 3;

  document.body.removeChild(enterScreen);
	title.style.animation = 'type 3s steps(40,end) forwards';
	endpointTitle.style.animation = 'type 3s steps(40,end) forwards';
	subText.style.animation = 'fade-in 4s';
	endpoints.style.animation = 'fade-in 4s';
});

const healthCheck = document.querySelector('.health-check');

const getAllMessages = document.querySelector('.get-all-messages');
const getAllMessagesLimit = document.querySelector('.get-all-messages-limit');

const getMessages = document.querySelector('.get-messages');
const getMessagesLimit = document.querySelector('.get-messages-limit');

const postMessage = document.querySelector('.post-message');

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
		const textNode = document.createTextNode(`${JSON.stringify(res, null, 4)}`);
		jsonResponse.className = 'post-response';
		jsonResponse.appendChild(textNode);
		jsonResponse.readonly = true;
		document.body.appendChild(jsonResponse);

		const closeBtn = document.createElement('button');
		const btnText = document.createTextNode('X');
		closeBtn.className = 'close';
		closeBtn.appendChild(btnText);
		document.body.appendChild(closeBtn);


		const close = document.querySelector('.close');
		const postResponse = document.querySelector('.post-response');
		close.addEventListener('click', () => {
			document.body.removeChild(postResponse);
			document.body.removeChild(close);
		});
	});
});
