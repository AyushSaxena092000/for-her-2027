const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

const reelDialog = document.querySelector("#reel-dialog");
const rokaVideo = document.querySelector("#roka-video");
const memoryImage = document.querySelector("#memory-image");
const closeMemory = () => {
  rokaVideo.pause();
  reelDialog.close();
};
document.querySelector("#open-reel").addEventListener("click", () => {
  memoryImage.hidden = true;
  rokaVideo.hidden = false;
  reelDialog.showModal();
});
document.querySelectorAll(".open-photo").forEach((photo) =>
  photo.addEventListener("click", () => {
    rokaVideo.pause();
    rokaVideo.hidden = true;
    memoryImage.src = photo.dataset.image;
    memoryImage.alt = photo.dataset.alt;
    memoryImage.hidden = false;
    reelDialog.showModal();
  }),
);
document.querySelector("#close-reel").addEventListener("click", closeMemory);
reelDialog.addEventListener("click", (event) => {
  if (event.target === reelDialog) {
    closeMemory();
  }
});

const surprises = [
  "Bulbul, you are my favourite notification, forever. ✦",

  "Official announcement: you are 26 now, but you’ll always be my cute little baby. No debate. 😂❤️",

  "Congratulations! You have successfully completed 26 years of being beautiful and stealing my peace. ❤️",

  "Main tujhe chidhau, pareshan karu, galtiyan karu ya kuch bhi karu… ek baat kabhi mat bhoolna — I am yours. Always have been, always will be. ❤️",

  "18 January 2027: the day I officially get to upgrade from Babu to husband. Best update ever. ✦❤️",
];
let surpriseIndex = 0;
const playBirthdayChime = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const audio = new AudioContextClass();
  [880, 1175].forEach((frequency, index) => {
    const tone = audio.createOscillator();
    const gain = audio.createGain();
    tone.type = "sine";
    tone.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, audio.currentTime + index * 0.13);
    gain.gain.exponentialRampToValueAtTime(
      0.12,
      audio.currentTime + index * 0.13 + 0.02,
    );
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audio.currentTime + index * 0.13 + 0.55,
    );
    tone.connect(gain).connect(audio.destination);
    tone.start(audio.currentTime + index * 0.13);
    tone.stop(audio.currentTime + index * 0.13 + 0.6);
  });
};
document.querySelector("#wish-button").addEventListener("click", () => {
  playBirthdayChime();
  document.querySelector("#wish-message").textContent =
    surprises[surpriseIndex++ % surprises.length];
});

const giftMessages = [
  "Tujhe yaad na karu toh aur kya karu... teri baat na karu toh aur kya karu.. Kya karu ki tu itna pyaara lagne laga hai, ab tujhe mohabbat na karu toh aur kya karu! 🌹",
  "Safar wahiin tak hai jahan tak tum ho, Nazar wahiin tak hai jahan tak tum ho, Hazaaron phool dekhe hain is gulshan mein magar, Khushboo wahiin tak hai jahan tak tum ho. 💞",
  "Wajah puchogi toh umar nikal jayegi, Achhi lagti ho bas itna hi kaafi hai..! 💘",
  "You are my chaand se bhi jyaada sona mukhada tera, Tujhe dekhte hi haaye dil ye slip ho gaya Person..! ❤️🧿",
];

const giftButton = document.querySelector("#gift-button");
const giftMessage = document.querySelector("#gift-message");

if (giftButton && giftMessage) {
  let giftIndex = 0;

  giftButton.addEventListener("click", () => {
    giftMessage.textContent = giftMessages[giftIndex % giftMessages.length];
    giftIndex += 1;
  });
}
