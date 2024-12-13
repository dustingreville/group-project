// Sample playlists data
const playlists = [
    { id: 1, name: "Playlist 1" },
    { id: 2, name: "Playlist 2" },
    { id: 3, name: "Playlist 3" }
];

// Function to render song results
function renderSongs() {
    const resultsContainer = document.getElementById("song-results");
    resultsContainer.innerHTML = "";

    // Get the uploaded songs from localStorage (retrieve or empty array if none)
    const uploadedSongs = JSON.parse(localStorage.getItem("uploadedSongs")) || [];

    // Render the uploaded songs
    uploadedSongs.forEach(song => {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");
        songItem.innerHTML = `
            <h5>${song.title} - ${song.artist}</h5>
            <i class="heart" data-id="${song.id}">&#9829;</i>
            <button class="add-playlist-btn" data-id="${song.id}">Add to Playlist</button>
        `;
        resultsContainer.appendChild(songItem);
    });

    // Event listeners for heart buttons
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach(heart => {
        heart.addEventListener("click", toggleLike);
    });

    // Event listeners for Add to Playlist buttons
    const addPlaylistBtns = document.querySelectorAll(".add-playlist-btn");
    addPlaylistBtns.forEach(button => {
        button.addEventListener("click", openPlaylistModal);
    });
}

// Function to toggle the like status
function toggleLike(event) {
    const heart = event.target;
    heart.classList.toggle("liked");
}

// Function to open the playlist modal and add playlists dynamically
function openPlaylistModal(event) {
    const songId = event.target.dataset.id;
    const modal = document.getElementById("playlist-modal");
    const playlistSelector = document.getElementById("playlist-selector");

    // Clear previous options and add playlists
    playlistSelector.innerHTML = "";
    playlists.forEach(playlist => {
        const option = document.createElement("option");
        option.value = playlist.id;
        option.textContent = playlist.name;
        playlistSelector.appendChild(option);
    });

    // Show the modal
    modal.style.display = "flex";

    // Handle adding song to playlist
    const addButton = document.getElementById("add-to-playlist");
    addButton.onclick = () => addToPlaylist(songId, playlistSelector.value);
}

// Function to add the song to a selected playlist
function addToPlaylist(songId, playlistId) {
    const song = JSON.parse(localStorage.getItem("uploadedSongs")).find(s => s.id == songId);
    const playlist = playlists.find(p => p.id == playlistId);
    alert(`Added "${song.title}" to "${playlist.name}" playlist!`);

    // Hide the modal after adding the song
    const modal = document.getElementById("playlist-modal");
    modal.style.display = "none";
}

// Close the modal when the close button is clicked
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("playlist-modal").style.display = "none";
});

// Handle search functionality
document.getElementById("search-button").addEventListener("click", renderSongs);

// Initialize song results on page load
window.onload = renderSongs;
