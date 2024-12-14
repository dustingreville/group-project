// Function to display the songs from localStorage
const displaySongs = () => {
    const songListContainer = document.getElementById("songList");

    // Fetch the list of songs from localStorage
    const songs = JSON.parse(localStorage.getItem("songs")) || [];

    // Clear any existing content
    songListContainer.innerHTML = "";

    // If no songs are found, show a message
    if (songs.length === 0) {
        songListContainer.innerHTML = "<p>No songs uploaded yet.</p>";
        return;
    }

    // Loop through the songs and create a song item for each
    songs.forEach(song => {
        const songItem = document.createElement("div");
        songItem.classList.add("col-md-4", "mb-4");

        // Structure for each song in the feed
        songItem.innerHTML = `
            <div class="card">
                
                <div class="card-body">
                    <h5 class="card-title">${song.title}</h5>
                    <p class="card-text">Artist: ${song.artist}</p>
                    <p class="card-text">Genre: ${song.genre}</p>
                    <button class="btn btn-primary" onclick="playSong('${song.file}')">Play</button>
                </div>
            </div>
        `;

        // Append the song item to the song list container
        songListContainer.appendChild(songItem);
    });
};

// Function to play the song when the Play button is clicked
const playSong = (songFile) => {
    const audio = new Audio(songFile);
    audio.play();
};

// Call displaySongs when the page loads
document.addEventListener("DOMContentLoaded", displaySongs);