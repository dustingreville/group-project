// Handle form submission
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get song details
    const title = document.getElementById("title").value;
    const artist = document.getElementById("artist").value;
    const genre = document.getElementById("genre").value;
    const audioFile = document.getElementById("audioFile").files[0];

    // Create an object to hold the song details
    const song = {
        title: title,
        artist: artist,
        genre: genre,
        duration: "", // We can add duration later if needed
        file: URL.createObjectURL(audioFile), // Create a URL to access the audio file
    };

    // Get existing songs from localStorage or initialize an empty array
    let songs = JSON.parse(localStorage.getItem("songs")) || [];

    // Add the new song to the array
    songs.push(song);

    // Save the updated song list to localStorage
    localStorage.setItem("songs", JSON.stringify(songs));

    // Clear the form
    document.getElementById("uploadForm").reset();

    // Optionally show an audio player to preview the song
    const audioPlayer = document.getElementById("audioPlayer");
    const audioElement = document.getElementById("audioElement");
    audioElement.src = song.file;
    audioPlayer.style.display = "block";
});

