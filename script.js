const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume");
const durationDisplay = document.getElementById("duration");

let songs = [
    { title: "Song 1", artist: "Artist A", src: "song1.mp3" },
    { title: "Song 2", artist: "Artist B", src: "song2.mp3" }
];

let currentIndex = 0;

function loadSong(index) {
    audio.src = songs[index].src;
    document.getElementById("song-title").innerText = songs[index].title;
    document.getElementById("artist").innerText = songs[index].artist;
}

function playPauseToggle() {
    if (audio.paused) {
        audio.play();
        playPause.innerText = "⏸️";
    } else {
        audio.pause();
        playPause.innerText = "▶️";
    }
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
}

audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    durationDisplay.innerText = `${Math.floor(audio.currentTime)} / ${Math.floor(audio.duration)}`;
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

playPause.addEventListener("click", playPauseToggle);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

loadSong(currentIndex);
