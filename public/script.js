const audio = document.querySelector('audio');

audio.addEventListener('ended', () => {
  console.log('src:', audio.src)
	if (audio.src === '/assets/Watermelon Man-[AudioTrimmer.com].mp3') {
    console.log('watermelon to james brown')
		audio.src = '/assets/james-brown-instrumental.mp3';
	} else {
    console.log('switch')
		audio.src = '/assets/Watermelon Man-[AudioTrimmer.com].mp3';
	}
	audio.play();
});
