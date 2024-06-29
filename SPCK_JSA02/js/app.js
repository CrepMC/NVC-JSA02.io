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

inviteButton.addEventListener("mouseover", () => {
  inviteButton.style.transform = "translateY(-3px)";
});

inviteButton.addEventListener("mouseout", () => {
  inviteButton.style.transform = "translateY(3px)";
});

document.addEventListener('DOMContentLoaded', () => {
  const postContainer = document.getElementById('postContainer');
  const forYouTab = document.querySelector('.for-you');
  const followedTab = document.querySelector('.followed-span');
  let allPosts = [];
  let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

  fetch('./db/posts.json')
      .then(response => response.json())
      .then(data => {
          allPosts = data;

          // Load followed status from loggedInUser
          allPosts.forEach(post => {
              post.followed = loggedInUser.followedPosts && loggedInUser.followedPosts.includes(post.username);
          });

          renderPosts(allPosts);

          forYouTab.addEventListener('click', () => {
              forYouTab.classList.add('active');
              followedTab.classList.remove('active');
              removeNoFollowMessage();
              renderPosts(allPosts);
          });

          followedTab.addEventListener('click', () => {
              forYouTab.classList.remove('active');
              followedTab.classList.add('active');
              const followedPosts = allPosts.filter(post => post.followed);
              if (followedPosts.length === 0) {
                  displayNoFollowMessage();
                  renderPosts([]);  // Render empty array to clear posts
              } else {
                  removeNoFollowMessage();
                  renderPosts(followedPosts);
              }
          });
      })
      .catch(error => console.error('Error fetching the post data:', error));

  function renderPosts(posts) {
      // Remove existing posts
      const existingPosts = postContainer.querySelectorAll('.post');
      existingPosts.forEach(post => post.remove());

      posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post', 'post-container');
          const supportersHTML = post.supporters.map(supporter => `<img src="${supporter}" alt="Supporter">`).join('');
          const stickersHTML = Object.values(post.stickers).map(sticker => `<span><img src="${sticker}" alt="Sticker"/> 1</span>`).join('');
          const tagsHTML = post.tags.map(tag => `<span>${tag.replace('#', '')}</span>`).join('');
          let backgroundHTML = '';
          if (Array.isArray(post.background)) {
              backgroundHTML = post.background.map(background => `<div class="post-header" style="background-image: url(${background})">`).join('');
          } else if (typeof post.background === 'string') {
              backgroundHTML = `<div class="post-header" style="background-image: url(${post.background})">`;
          }
          postElement.innerHTML = `
              ${backgroundHTML}
                  <div class="post-user-info">
                      <img src="https://via.placeholder.com/50" alt="User Image">
                      <div class="user-details">
                          <span class="nickname"><a href="#">${post.nickname}</a></span>
                          <span class="username"><a href="#">${post.username}</a></span>
                      </div>
                  </div>
                  <div class="post-time-follow">
                      <div class="post-time">${post.timePosted}</div>
                      <button class="follow-button ${post.followed ? 'followed' : ''}">${post.followed ? 'Followed' : 'Follow'}</button>
                  </div>
              </div>
              <img class="post-img" src="${post.postImg}" alt="Post Image">
              <div class="post-content">${post.content}</div>
              <button class="read-more-button">Read Article</button>
              <div class="supporters">
                  ${supportersHTML}
              </div>
              <div class="stickers">
                  ${stickersHTML}
              </div>
              <div class="tags">
                  ${tagsHTML}
              </div>
              <div class="likes">
                  <span class="icon heart-icon"><i class="fas fa-heart"></i> ${post.likes}</span>
                  <span class="icon chat-icon"><i class="fas fa-comments"></i> ${post.comments}</span>
                  <span class="icon sticker-icon"><i class="fas fa-sticky-note"></i></span>
              </div>
          `;

          postContainer.appendChild(postElement);

          const followButton = postElement.querySelector('.follow-button');
          followButton.addEventListener('click', () => {
              const username = post.username;
              const isFollowed = followButton.classList.contains('followed');

              allPosts.forEach(p => {
                  if (p.username === username) {
                      p.followed = !isFollowed;
                  }
              });

              // Update followedPosts in loggedInUser
              if (!isFollowed) {
                  loggedInUser.followedPosts = loggedInUser.followedPosts || [];
                  loggedInUser.followedPosts.push(username);
              } else {
                  loggedInUser.followedPosts = loggedInUser.followedPosts.filter(user => user !== username);
              }

              // Save updated loggedInUser to localStorage
              localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

              renderPosts(allPosts);
          });
      });
  }

  function displayNoFollowMessage() {
      if (!postContainer.querySelector('.no-follow')) {
          const noFollowMessage = document.createElement('div');
          noFollowMessage.classList.add('no-follow');
          noFollowMessage.textContent = "You haven't been followed by anyone yet.";
          postContainer.appendChild(noFollowMessage);
      }
  }

  function removeNoFollowMessage() {
      const noFollowMessage = postContainer.querySelector('.no-follow');
      if (noFollowMessage) {
          noFollowMessage.remove();
      }
  }
});

const storePage = document.querySelector('.store-page')

storePage.addEventListener('click', () => {
  const store = document.querySelector('.store')
  store.style.display = 'block';
  document.querySelector('.main').style.display = 'none';
})

const logo = document.querySelector(".logo")

logo.addEventListener('click', () => {
  const store = document.querySelector('.store')
  store.style.display = 'none';
  document.querySelector('.main').style.display = 'block';
  
})