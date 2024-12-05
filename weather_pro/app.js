const apiKey = "6511e14723ad8cb6f243ece1366c5deb";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

// Получение элементов
const searchForm = document.querySelector(".search-bar"); // Форма поиска
const searchInput = document.querySelector(".searchInput");
const infoDiv = document.querySelector(".info");

// Добавление обработчика события на форму
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const location = searchInput.value.trim();
    if (!location) {
        alert("Please enter a location!");
        return;
    }

    try {
        // Запрос к API
        const response = await fetch(`${baseURL}?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("Location not found");

        const data = await response.json();
        displayWeather(data); // Отображение данных
        searchInput.value = ""; // Очистка строки после поиска
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
});

// Функция отображения данных о погоде
function displayWeather(data) {
    const { name, main, wind, clouds, dt } = data;
    const { temp } = main;
    const body = document.querySelector("body");

    // Удаляем предыдущие классы
    body.classList.remove("cold", "warm", "hot");

    // Устанавливаем класс в зависимости от температуры
    if (temp <= 10) {
        body.classList.add("cold");
    } else if (temp > 10 && temp <= 25) {
        body.classList.add("warm");
    } else {
        body.classList.add("hot");
    }


    // Добавление HTML в блок с информацией
    infoDiv.innerHTML = `
        <h1 class="country_degree">${Math.round(temp)}°</h1>
        <div>
            <p class="country">${name}</p>
            <p class="country_info">
                ${new Date(dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                ${new Date(dt * 1000).toLocaleDateString("en-GB", { weekday: 'long' })}
            </p>
        </div>
		    <p><img src="./media/icons/cloudy.svg" alt="Cloudy"></p>
    `;
    const { temp_max, temp_min, humidity } = main;

    // Обновление данных в блоках
    document.querySelector(".temp-max").textContent = `${Math.round(temp_max)}°`;
    document.querySelector(".temp-min").textContent = `${Math.round(temp_min)}°`;
    document.querySelector(".humidity").textContent = `${humidity}%`;
    document.querySelector(".cloudy").textContent = `${clouds.all}%`;
    document.querySelector(".wind-speed").textContent = `${Math.round(wind.speed)} km/h`;

}
