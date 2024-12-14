const displayLikedSongs = () => {
    const likedSongsContainer = document.getElementById("liked-songs");

    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

    likedSongsContainer.innerHTML = "";

    if (likedSongs.length === 0) {
        likedSongsContainer.innerHTML = "<p>You haven't liked any songs yet.</p>";
        return;
    }

    likedSongs.forEach((song) => {
        const songItem = document.createElement("div");
        songItem.classList.add("col-md-4", "mb-4");

        songItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${song.title}</h5>
                    <button class="btn btn-primary" onclick="playSong('${song.file}')">Play</button>
                </div>
            </div>
        `;

        likedSongsContainer.appendChild(songItem);
    });
};

const playSong = (songFile) => {
    const audio = new Audio(songFile);
    audio.play();
};

document.addEventListener("DOMContentLoaded", displayLikedSongs);