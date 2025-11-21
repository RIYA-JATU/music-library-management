// Music player logic
const songs = [
    {
        title: "Breathe Future Garage",
        artist: "Cascade",
        src: "assets/mp3/cascade-breathe-future-garage-412839.mp3",
        cover: "assets/breathe.jpg"
    },
    {
        title: "Ambient Snowcap",
        artist: "Grace Jordan",
        src: "assets/mp3/deep-abstract-ambient_snowcap-401656.mp3",
        cover: "assets/deep-abstract.jpg"
    },
    {
        title: "Groovy Vibe",
        artist: "George Benson",
        src: "assets/mp3/groovy-vibe-427121.mp3",
        cover: "assets/groovy_vibes.webp"
    },
    {
        title: "Hype Drill Music",
        artist: "King Louie",
        src: "assets/mp3/hype-drill-music-438398.mp3",
        cover: "assets/hype_drill.webp"
    },
    {
        title: "Sweet Life Luxury Chill",
        artist: "Frank Ocean",
        src: "assets/mp3/sweet-life-luxury-chill-438146.mp3",
        cover: "assets/SweetLifeLuxuryChill.jpg"
    },
    {
        title: "Jungle Waves",
        artist: "Spec (BR)",
        src: "assets/mp3/jungle-waves-drumampbass-electronic-inspiring-promo-345013.mp3",
        cover: "assets/jugle-waves.jpg"
    },
    {
        title: "Embrace",
        artist: "Danny McNamara",
        src: "assets/mp3/embrace-364091.mp3",
        cover: "assets/embrace.jpg"
    }
];

let currentSong = 0;
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songCover = document.getElementById('song-cover');

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songCover.src = song.cover;

    // Update footer album section
    const playerAlbumCover = document.getElementById('player-album-cover');
    const playerSongTitle = document.getElementById('player-song-title');
    const playerSongArtist = document.getElementById('player-song-artist');

    if (playerAlbumCover) playerAlbumCover.src = song.cover;
    if (playerSongTitle) playerSongTitle.textContent = song.title;
    if (playerSongArtist) playerSongArtist.textContent = song.artist;

    // Update static placeholder (visible before playback)
    const staticCover = document.getElementById('static-cover');
    const staticTitle = document.getElementById('static-title');
    const staticArtist = document.getElementById('static-artist');
    if (staticCover) staticCover.src = song.cover;
    if (staticTitle) staticTitle.textContent = song.title;
    if (staticArtist) staticArtist.textContent = song.artist;

    // If the player is currently playing, update the now-playing overlay thumbnail
    const nowThumb = document.querySelector('.now-playing-thumb');
    const mainContent = document.querySelector('.main-content');
    // Always update the overlay thumbnail source; visibility is controlled by `.playing` class
    if (nowThumb) nowThumb.src = song.cover;
    // If audio is playing, ensure overlay visible. Otherwise the static placeholder remains visible.
    if (mainContent && !audio.paused) {
        mainContent.classList.add('playing');
    }
}

playBtn.onclick = function () {
    const playIcon = document.getElementById('play-icon');
    if (audio.paused) {
        audio.play();
        if (playIcon) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }
    } else {
        audio.pause();
        if (playIcon) {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    }
};

nextBtn.onclick = function () {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    const playIcon = document.getElementById('play-icon');
    if (playIcon) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    }
};

prevBtn.onclick = function () {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    const playIcon = document.getElementById('play-icon');
    if (playIcon) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    }
};

window.onload = function () {
    loadSong(currentSong);
    // Set initial play icon
    const playIcon = document.getElementById('play-icon');
    if (playIcon) {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
};

// Render song list in sidebar
function renderSidebarSongList() {
    const sidebar = document.getElementById('sidebar-song-list');
    if (!sidebar) return;
    sidebar.innerHTML = '';
    songs.forEach((song, idx) => {
        const item = document.createElement('div');
        item.className = 'sidebar-song-item';
        item.innerHTML = `
            <img src="${song.cover}" alt="cover" style="width:30px;height:30px;margin-right:8px;vertical-align:middle;">
            <span style="vertical-align:middle;">${song.title} - ${song.artist}</span>
        `;
        item.style.cursor = 'pointer';
        item.onclick = function () {
            currentSong = idx;
            loadSong(currentSong);
            audio.play();
            const playIcon = document.getElementById('play-icon');
            if (playIcon) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            }
        };
        sidebar.appendChild(item);
    });
}

// Filter songs based on search term
function filterAndRenderSongs(searchTerm) {
    const sidebar = document.getElementById('sidebar-song-list');
    if (!sidebar) return;
    sidebar.innerHTML = '';

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm)
    );

    if (filteredSongs.length === 0) {
        const noResults = document.createElement('div');
        noResults.style.color = '#999';
        noResults.style.padding = '20px';
        noResults.style.textAlign = 'center';
        noResults.textContent = 'No songs found';
        sidebar.appendChild(noResults);
        return;
    }

    filteredSongs.forEach((song) => {
        const songIdx = songs.indexOf(song);
        const item = document.createElement('div');
        item.className = 'sidebar-song-item';
        item.innerHTML = `
            <img src="${song.cover}" alt="cover" style="width:30px;height:30px;margin-right:8px;vertical-align:middle;">
            <span style="vertical-align:middle;">${song.title} - ${song.artist}</span>
        `;
        item.style.cursor = 'pointer';
        item.onclick = function () {
            currentSong = songIdx;
            loadSong(currentSong);
            audio.play();
            const playIcon = document.getElementById('play-icon');
            if (playIcon) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            }
        };
        sidebar.appendChild(item);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    renderSidebarSongList();

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            filterAndRenderSongs(searchTerm);
        });
    }

    // Volume Control
    const volumeSlider = document.getElementById('volume');
    if (volumeSlider) {
        const updateVolumeUI = (val) => {
            const pct = val;
            // update slider background to show progress
            volumeSlider.style.background = `linear-gradient(to right, #1bd760 0%, #1bd760 ${pct}%, #333 ${pct}%, #333 100%)`;
        };

        volumeSlider.addEventListener('input', function () {
            const v = this.value;
            audio.volume = v / 100;
            updateVolumeUI(v);
        });
        // set initial volume and UI
        audio.volume = volumeSlider.value / 100;
        updateVolumeUI(volumeSlider.value);
    }
});

// Now-playing overlay control: show animated background + thumbnail while audio is playing
const mainContent = document.querySelector('.main-content');
const nowThumb = document.querySelector('.now-playing-thumb');

audio.addEventListener('play', () => {
    if (mainContent) mainContent.classList.add('playing');
    if (nowThumb) nowThumb.src = songs[currentSong].cover;
});

audio.addEventListener('pause', () => {
    if (mainContent) mainContent.classList.remove('playing');
});

audio.addEventListener('ended', () => {
    if (mainContent) mainContent.classList.remove('playing');
});

