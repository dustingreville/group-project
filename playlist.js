function renderSongs() {
    const resultsContainer = document.getElementById("song-results");
    resultsContainer.innerHTML = "";

    // Fetch songs using the correct key
    const uploadedSongs = JSON.parse(localStorage.getItem("songs")) || [];

    // Render the uploaded songs
    uploadedSongs.forEach(song => {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");
        songItem.innerHTML = `
            <h5>${song.title} - ${song.artist}</h5>
            <i class="heart" data-id="${song.title}">&#9829;</i>
            <button class="add-playlist-btn" data-id="${song.title}">Add to Playlist</button>
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
