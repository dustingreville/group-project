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
        <button class="btn btn-primary" onclick="playTrack('${latestSong.file}')">Play</button>
    `;

    trackContainer.appendChild(trackItem);

    // If the latest song is a video, show it in the video player
    if (latestSong.file.endsWith('.mp4')) {
        const videoPlayer = document.getElementById("latestVideo");
        const videoSource = document.getElementById("videoSource");
        videoSource.src = latestSong.file; // Update source of the video player
        videoPlayer.load(); // Reload the video player to reflect the new source
        videoPlayer.play(); // Auto-play the latest video
    }
};

// Function to play the selected track (audio or video)
const playTrack = (trackFile) => {
    if (trackFile.endsWith('.mp4')) {
        // Play the video if it's a video file
        const videoPlayer = document.getElementById("latestVideo");
        const videoSource = document.getElementById("videoSource");
        videoSource.src = trackFile;
        videoPlayer.load();
        videoPlayer.play();
    } else {
        // Play the audio if it's an audio file
        const audio = new Audio(trackFile);
        audio.play();
    }
};

// Call loadLatestTrack on page load to display the latest track
window.onload = loadLatestTrack;

