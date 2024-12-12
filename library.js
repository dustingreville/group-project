// Load songs from local storage
const loadSongs = () => {
    const songList = JSON.parse(localStorage.getItem("songs")) || []; // Handle case where no songs are saved
    const songContainer = document.getElementById("songList");
    songContainer.innerHTML = ""; // Clear any previous content

    songList.forEach(song => {
        const songItem = document.createElement("div");
        songItem.classList.add("col-md-4", "song-item");
        songItem.innerHTML = `
            <h3>${song.title}</h3>
            <p>Artist: ${song.artist}</p>
            <p>Genre: ${song.genre}</p>
            <p>Duration: ${song.duration}</p>
            <button onclick="playSong('${song.file}')">Play</button>
        `;
        songContainer.appendChild(songItem);
    });
};

// Filter songs based on search query
const searchSongs = () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const songList = JSON.parse(localStorage.getItem("songs")) || [];
    const filteredSongs = songList.filter(song => {
        return song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.genre.toLowerCase().includes(query);
    });

    const songContainer = document.getElementById("songList");
    songContainer.innerHTML = ""; // Clear previous search results

    filteredSongs.forEach(song => {
        const songItem = document.createElement("div");
        songItem.classList.add("col-md-4", "song-item");
        songItem.innerHTML = `
            <h3>${song.title}</h3>
            <p>Artist: ${song.artist}</p>
            <p>Genre: ${song.genre}</p>
            <p>Duration: ${song.duration}</p>
            <button onclick="playSong('${song.file}')">Play</button>
        `;
        songContainer.appendChild(songItem);
    });
};

// Play the selected song (audio player functionality)
const playSong = (songFile) => {
    const audio = new Audio(songFile);
    audio.play();
};

// Event listener for search input
document.getElementById("searchInput").addEventListener("input", searchSongs);

// Initial load of songs
loadSongs();
