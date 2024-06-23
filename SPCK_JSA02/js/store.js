fetch('./db/games.json')
  .then(response => response.json())
  .then(data => {
    for (let i in data) {
        const game = data[i];
        console.log(game);

        const iconsImg = ''

        for (let i = 0; i < game.icons.length; i++) {
            iconsImg += `<li><img src="${game.icons[i]}"/></li>`
        }

        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.innerHTML = `
            <img src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <ul>${iconsImg}</ul>
        `;
        document.body.appendChild(gameElement);
    }
  })