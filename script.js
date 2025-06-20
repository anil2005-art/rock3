console.log("Welcome to AJ Songs");

// === Initialization ===
let songIndex = 0;
const audioElement = new Audio('1.mp3');
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItems = Array.from(document.getElementsByClassName('songItem'));

const songs = [
   { songName: " Amme Ente Amme Ente Ishoyude Amme  ", filePath: "1.mp3", coverPath: "1.jpg"},
    {songName: "Anthyakala Abhishekam  Theepole Iranganame", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "Kanunnu Njan Viswasathal  Sunil Pathanapuram ", filePath: "3.mp3", coverPath: "3.jpg"},
    {songName: "Karthavu Ninne  Peter Cheranalloor ", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "Nandiyode Njan  Elizabeth Raju", filePath: "5.mp3", coverPath: "5.jpg"},
    {songName: "Vyakulamaathave Christian Devotional Song  Mohanlal", filePath: "6.mp3", coverPath: "6.jpg"},
    {songName: " അതരവല കൾകകൻ പററയ മനഹര ഗനങങൾ ", filePath: "7.mp3", coverPath: "7.jpeg"},
    {songName: "കനയക മര അമമ ", filePath: "8.mp3", coverPath: "8.jpg"},
    {songName: "നനദNANNICHRISTIAN DEVOTIONAL ", filePath: "9.mp3", coverPath: "9.jpg"},
    {songName: "മഘനകകടട തകർതത പടയ സപപർ ഗന  അകകരയകക യതരചയയ   ", filePath: "10.mp3", coverPath: "10.jpg"},
    {songName: "Israyelin Nadhanai  ഇസരയലൻ നഥനയ  ", filePath: "11.mp3", coverPath: "11.jpeg"},
    {songName: "K.S. CHITHRA CHRISTIAN DEOVOTIONAL  ", filePath: "12.mp3", coverPath: "11.jpeg"},
    {songName: "MINNAMINNIPOLE  CHRISTMAS CAROL SONG   ", filePath: "13.mp3", coverPath: "11.jpeg"},
    {songName: " Nandi Nandi En Daivame  Kedarnath  Kathukutty ", filePath: "14.mp3", coverPath: "11.jpeg"},
    {songName: "Nazarethin Video Song  ", filePath: "15.mp3", coverPath: "11.jpeg"},
    {songName: "Ninte Hitham Pole  നനറ ഹത പല  Christian   ", filePath: "16.mp3", coverPath: "11.jpeg"},
    {songName: "Njan Ninne Kaividumo ", filePath: "17.mp3", coverPath: "11.jpeg"},
    {songName: "Songs Of The Week  Christian Devotional Songs ", filePath: "18.mp3", coverPath: "11.jpeg"},
    {songName: "Uruki Uruki Theernnidam Lyrics  Anna Baby  ", filePath: "19.mp3", coverPath: "11.jpeg"},
    {songName: "Uyirin Naadhane Video Song  Joseph Movie", filePath: "20.mp3", coverPath: "11.jpeg"},
];

// === Populate Song List ===
songItems.forEach((item, index) => {
    item.querySelector("img").src = songs[index].coverPath;
    item.querySelector(".songName").innerText = songs[index].songName;
});

// === Play/Pause Toggle ===
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        togglePlayPause(true);
    } else {
        audioElement.pause();
        togglePlayPause(false);
    }
});

const togglePlayPause = (isPlaying) => {
    masterPlay.classList.toggle("fa-play-circle", !isPlaying);
    masterPlay.classList.toggle("fa-pause-circle", isPlaying);
    gif.style.opacity = isPlaying ? 1 : 0;
};

// === Seekbar Updates ===
audioElement.addEventListener("timeupdate", () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    const minutes = Math.floor(audioElement.currentTime / 60);
    const seconds = ("0" + Math.floor(audioElement.currentTime % 60)).slice(-2);
    document.getElementById("currentTime").innerText = `${minutes}:${seconds}`;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// === Update Duration on Load ===
audioElement.addEventListener("loadedmetadata", () => {
    const mins = Math.floor(audioElement.duration / 60);
    const secs = ("0" + Math.floor(audioElement.duration % 60)).slice(-2);
    document.getElementById("totalDuration").innerText = `${mins}:${secs}`;
});

// === Song Item Click Events ===
const playButtons = document.querySelectorAll(".songItemPlay");

const makeAllPlays = () => {
    playButtons.forEach((btn) => {
        btn.classList.remove("fa-pause-circle");
        btn.classList.add("fa-play-circle");
    });
};

songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        makeAllPlays();
        playSong(index);
        updateSelected(index);
    });
});

const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    togglePlayPause(true);
    updateMediaSession(songs[songIndex]);
};

const updateSelected = (index) => {
    document.querySelectorAll(".songItem").forEach((el) => el.classList.remove("selected"));
    songItems[index].classList.add("selected");
    makeAllPlays();
    const btn = songItems[index].querySelector(".songItemPlay");
    btn.classList.remove("fa-play-circle");
    btn.classList.add("fa-pause-circle");
};

// === Next / Previous ===
document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
    updateSelected(songIndex);
});
let sleepTimerId = null;
let countdownInterval = null;

function handleSleepSelection() {
    const selected = document.getElementById("timerSelect").value;
    const countdownEl = document.getElementById("countdownDisplay");

    // Clear previous timers
    if (sleepTimerId) clearTimeout(sleepTimerId);
    if (countdownInterval) clearInterval(countdownInterval);
    countdownEl.textContent = "";

    if (!selected) return;

    const seconds = parseInt(selected.replace('s', ''));
    if (isNaN(seconds)) return;

    let remaining = seconds;

    // Start countdown display
    countdownInterval = setInterval(() => {
        remaining--;
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        countdownEl.textContent = ` | Stops in ${m}m ${s < 20 ? '0' : ''}${s}s`;
        if (remaining <= 0) clearInterval(countdownInterval);
    }, 1000);

    // Set sleep timer
    sleepTimerId = setTimeout(() => {
        audioElement.pause();
        audioElement.currentTime = 0;
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        countdownEl.textContent = " | Music stopped";
    }, seconds * 1000);
}


document.getElementById("previous").addEventListener("click", () => {
    songIndex = songIndex > 0 ? songIndex - 1 : 0;
    playSong(songIndex);
    updateSelected(songIndex);
});

// === Auto Play Next ===
audioElement.addEventListener("ended", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
    updateSelected(songIndex);
});

// === Media Session ===
function updateMediaSession(song) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.songName,
            artist: "Your Artist Name",
            album: "Your Album Name",
            artwork: [
                { src: song.coverPath, sizes: '512x512', type: 'image/jpeg' }
            ]
        });

        navigator.mediaSession.setActionHandler('play', () => audioElement.play());
        navigator.mediaSession.setActionHandler('pause', () => audioElement.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => document.getElementById('previous').click());
        navigator.mediaSession.setActionHandler('nexttrack', () => document.getElementById('next').click());
    }
}

// === Initial Load ===
audioElement.src = songs[songIndex].filePath;
masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime = 0;
updateMediaSession(songs[songIndex]);
// === Initial Load ===
audioElement.addEventListener("play", () => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: document.getElementById("masterSongName").innerText,
      artist: "AJ Songs",
      album: "NCS Playlist",
      artwork: [
        { src: "logo.png", sizes: "96x96", type: "image/png" },
        { src: "logo.png", sizes: "128x128", type: "image/png" },
        { src: "logo.png", sizes: "192x192", type: "image/png" },
        { src: "logo.png", sizes: "256x256", type: "image/png" },
        { src: "logo.png", sizes: "384x384", type: "image/png" },
        { src: "logo.png", sizes: "512x512", type: "image/png" }
      ]
    });

    navigator.mediaSession.setActionHandler("play", () => {
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      audioElement.pause();
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      document.getElementById("next").click(); // simulate next button click
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      document.getElementById("previous").click(); // simulate previous button click
    });
  }
});

audioElement.src = songs[songIndex].filePath;
masterSongName.innerText = songs[songIndex].songName;
audioElement.currentTime = 0;
updateMediaSession(songs[songIndex]);
