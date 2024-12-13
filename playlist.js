const loadSongs = () => {
    const songList = JSON.parse(localStorage.getItem("songs")) || [];
    const songContainer = document.getElementById("songList");
    songContainer.innerHTML = "";

    songList.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.classList.add("col-md-4", "song-item");
        songItem.innerHTML = `
            <h3>${song.title}</h3>
            <p>Artist: ${song.artist}</p>
            <p>Genre: ${song.genre}</p>
            <button onclick="playSong('${song.file}')">Play</button>
            <button class="btn btn-sm btn-success" onclick="addToPlaylist(${index})">Add to Playlist</button>
            <button class="btn btn-sm btn-danger" onclick="toggleLike(this, ${index})">❤️</button>
        `;
        songContainer.appendChild(songItem);
    });
};

const createPlaylist = () => {
    const playlistName = document.getElementById("newPlaylistName").value.trim();
    if (!playlistName) return alert("Please enter a playlist name!");

    const playlists = JSON.parse(localStorage.getItem("playlists")) || {};
    if (playlists[playlistName]) return alert("Playlist already exists!");

    playlists[playlistName] = [];
    localStorage.setItem("playlists", JSON.stringify(playlists));
    loadPlaylists();
    document.getElementById("newPlaylistName").value = "";
};

const loadPlaylists = () => {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || {};
    const playlistSelector = document.getElementById("playlistSelector");
    playlistSelector.innerHTML = `<option value="" disabled selected>Select a Playlist</option>`;

    Object.keys(playlists).forEach(playlist => {
        const option = document.createElement("option");
        option.value = playlist;
        option.textContent = playlist;
        playlistSelector.appendChild(option);
    });
    
    const playlistSongs = document.getElementById("playlistSongs");
    playlistSongs.innerHTML = "";  // Clear current songs

    // Load songs from selected playlist
    playlistSelector.addEventListener('change', () => {
        const selectedPlaylist = playlistSelector.value;
        if (selectedPlaylist) {
            const playlist = playlists[selectedPlaylist];
            playlistSongs.innerHTML = "";  // Clear previous songs
            playlist.forEach(song => {
                const songItem = document.createElement("div");
                songItem.classList.add("col-md-4", "song-item");
                songItem.innerHTML = `
                    <h3>${song.title}</h3>
                    <p>Artist: ${song.artist}</p>
                    <p>Genre: ${song.genre}</p>
                    <button onclick="playSong('${song.file}')">Play</button>
                `;
                playlistSongs.appendChild(songItem);
            });
        }
    });
};

const addToPlaylist = (songIndex) => {
    const playlistName = document.getElementById("playlistSelector").value;
    if (!playlistName) return alert("Please select a playlist!");

    const playlists = JSON.parse(localStorage.getItem("playlists")) || {};
    const songs = JSON.parse(localStorage.getItem("songs")) || [];
    playlists[playlistName].push(songs[songIndex]);
    localStorage.setItem("playlists", JSON.stringify(playlists));
    alert("Song added to playlist!");
};

const toggleLike = (btn, songIndex) => {
    const songs = JSON.parse(localStorage.getItem("songs")) || [];
    songs[songIndex].liked = !songs[songIndex].liked;
    btn.textContent = songs[songIndex].liked ? "❤️ Liked" : "❤️";
    localStorage.setItem("songs", JSON.stringify(songs));
};

const playSong = (songFile) => {
    const audioPlayer = document.getElementById("audioPlayer");
    const audioElement = document.getElementById("audioElement");
    audioPlayer.style.display = "block";
    audioElement.src = songFile;
    audioElement.play();
};

const searchSongs = () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const songList = JSON.parse(localStorage.getItem("songs")) || [];
    const filteredSongs = songList.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query)
    );
    const songContainer = document.getElementById("songList");
    songContainer.innerHTML = "";
    filteredSongs.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.classList.add("col-md-4", "song-item");
        songItem.innerHTML = `
            <h3>${song.title}</h3>
            <p>Artist: ${song.artist}</p>
            <p>Genre: ${song.genre}</p>
            <button onclick="playSong('${song.file}')">Play</button>
            <button class="btn btn-sm btn-success" onclick="addToPlaylist(${index})">Add to Playlist</button>
            <button class="btn btn-sm btn-danger" onclick="toggleLike(this, ${index})">❤️</button>
        `;
        songContainer.appendChild(songItem);
    });
};

document.getElementById("createPlaylist").addEventListener("click", createPlaylist);
document.getElementById("searchInput").addEventListener("input", searchSongs);

loadSongs();
loadPlaylists();

