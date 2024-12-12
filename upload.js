document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the values from the input fields
    var title = document.getElementById('title').value;
    var artist = document.getElementById('artist').value;
    var genre = document.getElementById('genre').value;
    var fileInput = document.getElementById('audioFile');
    var file = fileInput.files[0];

    // Check if a file is selected
    if (file) {
        // Create a URL for the file
        var audioURL = URL.createObjectURL(file);

        // Update the source of the audio element to the file URL
        var audioElement = document.getElementById('audioElement');
        var audioSource = document.getElementById('audioSource');
        audioSource.src = audioURL;

        // Show the audio player and play the audio
        document.getElementById('audioPlayer').style.display = 'block';
        audioElement.load(); // Load the audio
        audioElement.play(); // Play the audio

        // Optionally display the track details (e.g., title, artist, genre)
        alert('Track Details:\nTitle: ' + title + '\nArtist: ' + artist + '\nGenre: ' + genre);
    } else {
        alert('Please select an audio file to upload.');
    }
});
