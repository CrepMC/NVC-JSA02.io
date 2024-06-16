const clickPopUp = document.querySelector("#click-popup");
const clickDeletePopup = document.querySelector("#click-delete-popup");
const popup = document.querySelector(".popup");
const fileInput = document.querySelector("#fileInput");
const changeAccImgButton = document.querySelector(".change-acc-img img");
const inviteButton = document.querySelector(".invite-link-button-copy");

clickPopUp.addEventListener("click", () => {
  popup.style.display = "flex";
  clickDeletePopup.style.display = "block";
  clickPopUp.style.display = "none";
});

clickDeletePopup.addEventListener("click", () => {
  popup.style.display = "none";
  clickDeletePopup.style.display = "none";
  clickPopUp.style.display = "block";
});

document.getElementById('logoutButton').addEventListener('click', function() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'logre.html';  
});

window.addEventListener('load', () => {
  if (localStorage.getItem('isLoggedIn') === null) {
    window.location.href = 'logre.html';
  }
});

changeAccImgButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgSrc = e.target.result;
      changeAccImgButton.src = imgSrc;
      document.querySelector("#click-popup img").src = imgSrc;
      document.querySelector("#click-delete-popup img").src = imgSrc;
    }
    reader.readAsDataURL(file);
  }
});

inviteButton.addEventListener("mousedown", () => {
  inviteButton.style.transform = "translateY(3px)";
});

inviteButton.addEventListener("mouseup", () => {
  inviteButton.style.transform = "translateY(-3px)";
});