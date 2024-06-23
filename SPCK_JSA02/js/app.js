const clickPopUp = document.querySelector("#click-popup");
const clickDeletePopup = document.querySelector("#click-delete-popup");
const popup = document.querySelector(".popup");
const fileInput = document.querySelector("#fileInput");
const changeAccImgButton = document.querySelector(".change-acc-img");
const inviteButton = document.querySelector(".invite-link-button-copy");
const imgChangePopup = document.querySelector("#img-popup");
const imgDeleteChangePopup = document.querySelector("#close-icon");
const imgChangePopupBtn = document.querySelector("#img-popup button");

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

changeAccImgButton.addEventListener("click", () => {
  imgChangePopup.style.display = "flex";
});

imgDeleteChangePopup.addEventListener("click", () => {
  imgChangePopup.style.display = "none";
});

document.getElementById('logoutButton').addEventListener('click', function() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    loggedInUser.isLoggedIn = false;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }
  window.location.href = 'logre.html';  
});

window.addEventListener('load', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser || !loggedInUser.isLoggedIn) {
    window.location.href = 'logre.html';
  } else {
    const userName = loggedInUser.name;
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = userName;
    if (loggedInUser.image) {
      document.querySelector(".change-acc-img img").src = loggedInUser.image;
      document.querySelector("#click-popup img").src = loggedInUser.image;
      document.querySelector("#click-delete-popup img").src = loggedInUser.image;
    }
  }
});

imgChangePopupBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgSrc = e.target.result;

      // Retrieve user object from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Find the logged in user (assuming email is unique)
      const loggedInUser = storedUsers.find(user => user.email === JSON.parse(localStorage.getItem('loggedInUser')).email);

      if (loggedInUser) {
        // Update user's image property
        loggedInUser.image = imgSrc;

        // Update user in the storedUsers array
        const updatedUsers = storedUsers.map(user => {
          if (user.email === loggedInUser.email) {
            return loggedInUser;
          } else {
            return user;
          }
        });

        // Store updated user array back into localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Optionally update the loggedInUser in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        // Update UI with the new image
        document.querySelector(".change-acc-img img").src = imgSrc;
        document.querySelector("#click-popup img").src = imgSrc;
        document.querySelector("#click-delete-popup img").src = imgSrc;
      }
    };
    reader.readAsDataURL(file);
  }
});

inviteButton.addEventListener("mousedown", () => {
  inviteButton.style.transform = "translateY(3px)";
});

inviteButton.addEventListener("mouseup", () => {
  inviteButton.style.transform = "translateY(-3px)";
});
