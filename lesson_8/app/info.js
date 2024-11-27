

const content = document.querySelector('.content');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
    console.log(id);
    fetchInfo()
}

async function fetchInfo() {
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
    const response = await fetch(url)
    const {meals} = await response.json()
    console.log(meals)
    if (meals === null) {
        content.innerHTML = 'Food Not Found'
    }
    renderContent(meals[0])
}

function renderContent(food) {
    content.innerHTML = ''
    content.innerHTML = `
      <h2>${food.strMeal}</h2>
    <img src="${food.strMealThumb}" alt="">`
}

