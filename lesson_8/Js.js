const base_url = "https://www.themealdb.com/api/json/v1/1/";
const end_point = {
    getMealsByCategory: "filter.php?c=",
    getListCategories: "categories.php",
};

class Service {
    #base_url = "https://www.themealdb.com/api/json/v1/1/";

    async get(url, id) {
        const fullUrl = id ? `${this.#base_url}${url}/${id}/` : `${this.#base_url}${url}/`;
        const response = await fetch(fullUrl);
        const data = await response.json();
        console.log(data);
        return data;
    }
}

// Fetch categories and display them
async function fetchCategories() {
    try {
        const response = await fetch(base_url + end_point.getListCategories);
        const { categories } = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function displayCategories(categories) {
    const container = document.getElementById("categories_buttons");
    container.innerHTML = "";

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category.strCategory;
        button.addEventListener("click", () => getMealsByCategory(category.strCategory));
        container.appendChild(button);
    });
}

async function getMealsByCategory(category) {
    try {
        const url = base_url + end_point.getMealsByCategory + category;
        const response = await fetch(url);
        const { meals } = await response.json();
        displayMeals(meals);
    } catch (error) {
        console.error("Error fetching meals:", error);
    }
}

function displayMeals(meals) {
    const container = document.getElementById("meals_container");
    container.innerHTML = "";

    meals.forEach((meal) => {
        const card = document.createElement("div");
        card.classList.add("j-card");

        card.innerHTML = `
            <div class="j-card-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="j-card-content">
                <h3>${meal.strMeal}</h3>
                <button>View Recipe</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Fetch and display categories on page load
fetchCategories();