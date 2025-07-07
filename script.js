const registerBtn = document.querySelector(".register-button");
const popup = document.getElementById("contact-popup");

registerBtn.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent link default
  popup.style.display = "flex";
  document.body.style.overflow = "hidden"; // prevent background scroll
});

function closePopup() {
  popup.style.display = "none";
  document.body.style.overflow = ""; // re-enable scroll
}
document.addEventListener("DOMContentLoaded", function () {
  const playIcon = document.querySelector(".play-icon");
  const video = document.querySelector(".video-wrapper video");

  if (playIcon && video) {
   
    playIcon.addEventListener("click", () => {
      video.play();

      playIcon.style.opacity = "0";
      setTimeout(() => {
        playIcon.style.display = "none";
      }, 300);
    });

   
    video.addEventListener("pause", () => {
      playIcon.style.display = "block";
      setTimeout(() => {
        playIcon.style.opacity = "1";
      }, 10);
    });
  }
});
