const clickPopUp = document.querySelector("#click-popup");

clickPopUp.addEventListener("click", () => {
  const popup = document.querySelector(".popup");
  const clickDeletePopup = document.querySelector("#click-delete-popup");
  popup.style.display = "flex"
  clickDeletePopup.style.display = "block"
  clickPopUp.style.display = "none"
});

const clickDeletePopup = document.querySelector("#click-delete-popup");

clickDeletePopup.addEventListener("click", () => {
    const popup = document.querySelector(".popup");
    const clickDeletePopup = document.querySelector("#click-delete-popup");
    popup.style.display = "none"
    clickDeletePopup.style.display = "none"
    clickPopUp.style.display = "block"
  });

document.getElementById('logoutButton').addEventListener('click', function() {
  // Clear login status
  localStorage.removeItem('isLoggedIn');

  window.location.href = 'logre.html';  
});

window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') === null) {
        // If logged in, redirect to main page
        window.location.href = 'logre.html';
    }
});