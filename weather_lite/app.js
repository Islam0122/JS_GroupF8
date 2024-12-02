const apiKey = "6511e14723ad8cb6f243ece1366c5deb";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const weatherApp = document.querySelector(".weather-app");
const searchButton = document.querySelector("button");
const searchInput = document.querySelector("input");

// Асинхронная функция для получения данных о погоде
async function fetchWeather(city) {
    try {
        const response = await fetch(`${baseURL}?q=${city}&units=metric&lang=ru&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Город не найден!");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при запросе данных:", error.message);
        throw error;
    }
}

// Функция для выбора иконки на основе температуры
function getTemperatureIcon(temp) {
    if (temp <= 0) {
        return "icons/snow.svg"; // Снег для температур ниже 0°C
    } else if (temp > 0 && temp <= 15) {
        return "icons/cool.svg"; // Прохладно для температур от 1°C до 15°C
    } else if (temp > 15 && temp <= 30) {
        return "icons/sunny.svg"; // Тепло для температур от 16°C до 30°C
    } else {
        return "icons/rain100.svg"; // Очень жарко или дождливо (выше 30°C)
    }
}

// Функция для отображения данных о погоде
function renderWeatherCard(data) {
    // Очистка предыдущего контента
    weatherApp.innerHTML = '';

    // Карточка погоды
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    // Блок информации
    const info = document.createElement("div");
    info.classList.add("info");

    // Получение температуры и соответствующей иконки
    const temp = Math.round(data.main.temp);
    const tempIcon = getTemperatureIcon(temp);

    // Динамическое добавление данных
    const cityName = `<h2>${data.name} <span class="flag">🌍</span></h2>`;
    const temperature = `
        <p class="temperature">
            <img src="${tempIcon}" alt="Температура" width="50" height="50">
            ${temp}°C
        </p>`;
    const description = `<p class="description">${data.weather[0].description}</p>`;
    const wind = `<p>Ветер <span class="wind-speed">${data.wind.speed} км/ч</span></p>`;
    const humidity = `<p>Влажность <span class="humidity">${data.main.humidity}%</span></p>`;

    // Заполнение блока информации
    info.innerHTML = cityName + temperature + description + wind + humidity;

    // Иконка погоды
    const weatherIcon = document.createElement("div");
    weatherIcon.className = "weather-icon";

    // Динамическое добавление соответствующей иконки для типа погоды
    const iconSrc = getTemperatureIcon(temp);
    weatherIcon.innerHTML = `<img src="${iconSrc}" alt="Иконка погоды" width="100" height="100">`;

    // Добавление элементов в карточку
    weatherCard.append(info, weatherIcon);

    // Добавление карточки в приложение
    weatherApp.appendChild(weatherCard);
}

// Обработчик событий для кнопки "Показать"
searchButton.addEventListener("click", async () => {
    const city = searchInput.value.trim();
    if (!city) {
        alert("Введите название города!");
        return;
    }

    try {
        const weatherData = await fetchWeather(city);
        renderWeatherCard(weatherData);
    } catch (error) {
        alert("Не удалось загрузить данные. Проверьте название города.");
    }
});
