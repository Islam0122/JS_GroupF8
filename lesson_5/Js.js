// Base API URL
const API_URL = "https://www.freetogame.com/api/games?platform=pc";



async function fetchGames() {
    try {
        const response = await fetch(API_URL); // Fetch data
        const games = await response.json();  // Parse JSON
        displayGames(games);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}


function displayGames(games) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    games.forEach(game => {
        const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card bg-secondary text-light game-card">
                            <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                            <div class="card-body">
                                <h5 class="card-title">${game.title}</h5>                                 <span class="badge bg-primary">FREE</span>

                                <p class="card-text">${game.short_description}</p>
                                <p class="mt-2"><strong>Genre:</strong> ${game.genre}</p>
                            </div>
                        </div>
                    </div>
                `;
        container.innerHTML += card;
    });
}

fetchGames();