const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const reelDialog = document.querySelector('#reel-dialog');
const rokaVideo = document.querySelector('#roka-video');
const memoryImage = document.querySelector('#memory-image');
const closeMemory = () => {
  rokaVideo.pause();
  reelDialog.close();
};
document.querySelector('#open-reel').addEventListener('click', () => {
  memoryImage.hidden = true;
  rokaVideo.hidden = false;
  reelDialog.showModal();
});
document.querySelectorAll('.open-photo').forEach((photo) => photo.addEventListener('click', () => {
  rokaVideo.pause();
  rokaVideo.hidden = true;
  memoryImage.src = photo.dataset.image;
  memoryImage.alt = photo.dataset.alt;
  memoryImage.hidden = false;
  reelDialog.showModal();
}));
document.querySelector('#close-reel').addEventListener('click', closeMemory);
reelDialog.addEventListener('click', (event) => {
  if (event.target === reelDialog) {
    closeMemory();
  }
});


const surprises = [
  'Bulbul, you are my favourite notification, forever. ✦',
  'Wish granted: more Ayushita, more laughter, more late-night snacks.',
  'Official birthday rule: today you are extra loved. No arguments accepted.',
  '18 January 2027: the day I get to call you my wife. ✦'
];
let surpriseIndex = 0;
const playBirthdayChime = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const audio = new AudioContextClass();
  [880, 1175].forEach((frequency, index) => {
    const tone = audio.createOscillator();
    const gain = audio.createGain();
    tone.type = 'sine';
    tone.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, audio.currentTime + index * 0.13);
    gain.gain.exponentialRampToValueAtTime(0.12, audio.currentTime + index * 0.13 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + index * 0.13 + 0.55);
    tone.connect(gain).connect(audio.destination);
    tone.start(audio.currentTime + index * 0.13);
    tone.stop(audio.currentTime + index * 0.13 + 0.6);
  });
};
document.querySelector('#wish-button').addEventListener('click', () => {
  playBirthdayChime();
  document.querySelector('#wish-message').textContent = surprises[surpriseIndex++ % surprises.length];
});
