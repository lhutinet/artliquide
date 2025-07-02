document.querySelectorAll(".youtube-thumbnail").forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const videoId = thumbnail.getAttribute("data-video-id");
    const player = document.getElementById("youtube-player");
    const modal = document.getElementById("video-modal");

    // Vérification que l'ID de la vidéo est valide
    if (videoId) {
      player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      modal.classList.add("active");
    } else {
      console.error("L'ID de la vidéo est manquant ou invalide.");
    }
  });
});

document.querySelector(".modal .close").addEventListener("click", () => {
  const player = document.getElementById("youtube-player");
  const modal = document.getElementById("video-modal");
  player.src = ""; // Stop la vidéo en supprimant l'URL
  modal.classList.remove("active");
});

document.getElementById("video-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("video-modal")) {
    const player = document.getElementById("youtube-player");
    const modal = document.getElementById("video-modal");
    player.src = ""; // Stop la vidéo en supprimant l'URL
    modal.classList.remove("active");
  }
});
