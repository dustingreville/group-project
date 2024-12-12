// Function to load and display the latest track from localStorage
const loadLatestTrack = () => {
    const trackList = JSON.parse(localStorage.getItem("songs")) || [];
    
    // Get the latest song (the last item in the array)
    const latestSong = trackList[trackList.length - 1];

    // If there are no songs, return early
    if (!latestSong) {
        document.getElementById("trackList").innerHTML = "<p>No songs uploaded yet.</p>";
        return;
    }

    const trackContainer = document.getElementById("trackList");
    trackContainer.innerHTML = ""; // Clear any existing content

    // Create a track item for the latest song
    const trackItem = document.createElement("div");
    trackItem.classList.add("track-item", "border", "p-3", "mb-3");

    trackItem.innerHTML = `
        <h3>${latestSong.title}</h3>
        <p>Artist: ${latestSong.artist}</p>
        <p>Genre: ${latestSong.genre}</p>
        <p>Duration: ${latestSong.duration}</p>
        <button class="btn btn-primary" onclick="playSong('${latestSong.file}')">Play</button>
    `;

    trackContainer.appendChild(trackItem);
};

// Function to play the selected song (audio player functionality)
const playSong = (songFile) => {
    const audio = new Audio(songFile);
    audio.play();
};

// Call loadLatestTrack on page load to display the latest track
loadLatestTrack();
