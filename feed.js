const displaySongs = () => {
    const songListContainer = document.getElementById("songList");

    const songs = JSON.parse(localStorage.getItem("songs")) || [];

    songListContainer.innerHTML = "";

    if (songs.length === 0) {
        songListContainer.innerHTML = "<p>No songs uploaded yet.</p>";
        return;
    }

    songs.forEach((song) => {
        const songItem = document.createElement("div");
        songItem.classList.add("col-md-4", "mb-4");

        const songLikes = JSON.parse(localStorage.getItem("songLikes")) || {};
        const likes = songLikes[song.file] || 0; 

        songItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${song.title}</h5>
                    <p class="card-text">Artist: ${song.artist}</p>
                    <p class="card-text">Genre: ${song.genre}</p>
                    <button class="btn btn-primary" onclick="playSong('${song.file}')">Play</button>
                    <button class="btn btn-outline-success mt-2" onclick="likeSong('${song.file}', '${song.title}')">Like (${likes})</button>
                </div>
            </div>
        `;

        songListContainer.appendChild(songItem);
    });
};

const playSong = (songFile) => {
    const audio = new Audio(songFile);
    audio.play();
};

const likeSong = (songFile, songTitle) => {

    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

    if (!likedSongs.includes(songFile)) {
        likedSongs.push({ file: songFile, title: songTitle });
        localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
    }

    const songLikes = JSON.parse(localStorage.getItem("songLikes")) || {};

    if (songLikes[songFile]) {
        songLikes[songFile]++;
    } else {
        songLikes[songFile] = 1; 
    }

    localStorage.setItem("songLikes", JSON.stringify(songLikes));

    displaySongs();
};

document.addEventListener("DOMContentLoaded", displaySongs);