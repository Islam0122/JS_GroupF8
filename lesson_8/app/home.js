const base_url = "https://www.themealdb.com/api/json/v1/1/"
const buttons =
    document.querySelectorAll('.journey-buttons button');
const api = {
    getMealsByCategory: "filter.php?c=",
    getListCategories: "categories.php",
    getByID : "lookup.php?i="
}
const cardContainer = document.querySelector(".j-cards")
const btnContainer = document.querySelector(".journey-buttons")
async function fetchAllCategory() {
    const response = await fetch(`${base_url}${api.getListCategories}`)
    const {categories} = await response.json()
    btnContainer.innerHTML = ""
    btnContainer.innerHTML = categories.map( btn => `
  <button>${btn.strCategory}</button> `).join("")
    btnContainer.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener("click", async () => {
            const url = base_url + api.getMealsByCategory + btn.innerText;
            const response = await fetch(url);
            const food = await response.json();
            console.log(food);
            cardContainer.innerHTML = food.meals.map(el => renderCard(el)).join('');
        })
    })
}
fetchAllCategory()
function renderCard(item) {
    return `
   <div class="j-card">
      <div class="j-card-img">
          <img src="${item.strMealThumb}" alt="">
      </div>
      <div class="j-card-content">
          <h3> ${item.strMeal} </h3>
          <p>Lorem ipsum dolor sit amet.</p>
          <div>
              <p> 1 hour - hard prep - 4 serves</p>
              <button onclick="openInfo(${item.idMeal})">view recipe</button>
          </div>
      </div>
  </div>`
}
function openInfo(id) {
    window.location.href = '/JS_GroupF8/lesson_8/login.html?id=' + id;
}