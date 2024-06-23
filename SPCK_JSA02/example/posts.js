document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('postContainer');

    fetch('./db/posts.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                const supportersHTML = post.supporters.map(supporter => `<img src="${supporter}" alt="Supporter">`).join('');
                const stickersHTML = post.stickers.map(sticker => `<span>${sticker}</span>`).join(' ');
                const tagsHTML = post.tags.map(tag => `<span>${tag.replace('#', '')}</span>`).join(' ');

                postElement.innerHTML = `
                    <div class="post-header">
                        <div class="post-user-info">
                            <img src="https://via.placeholder.com/50" alt="User Image">
                            <div class="user-details">
                                <span class="nickname"><a href="#">${post.nickname}</a></span>
                                <span class="username"><a href="#">${post.username}</a></span>
                            </div>
                        </div>
                        <div class="post-time-follow">
                            <div class="post-time">${post.timePosted}</div>
                            <button class="follow-button">Follow</button>
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
                    if (followButton.classList.contains('followed')) {
                        followButton.classList.remove('followed');
                        followButton.textContent = 'Follow';
                        postElement.style.backgroundColor = '#1f1f1f';
                    } else {
                        followButton.classList.add('followed');
                        followButton.textContent = 'Followed';
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching the post data:', error));
});
