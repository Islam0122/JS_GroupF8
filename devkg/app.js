const api = "https://devkg.com/api/pages/jobs?page=1";

const jobs_cards = document.querySelector(".job-cards");


async function fetchInfo() {
    const response = await fetch(api)
    const {result} = await response.json()
    console.log(result.list)
    getlist(result.list);
}
fetchInfo()

function getlist(list) {
    jobs_cards.innerHTML = "";

    list.forEach((job) => {
        const salary = job.price_from && job.price_to
            ? `${job.price_from} - ${job.price_to} ${job.currency.toUpperCase()}`
            : "Зарплата не указана";
        const city = job.city || "Удалённая работа";
        const jobCard = `

       <div class="job-card">
          <div class ="logo"> 
              <img src="${job.organization_icon}" alt="${job.organization_name}" >
          </div>
         <div class="company-info">
            <p class="label">Компания</p>
            <p class="value">${job.organization_name}</p>
         </div>
         <div class="job-details">
             <div class="card">
                 <p class="label">Должность</p>
                 <p class="value">${job.position}</p>
             </div>
             <div class="card">
                <p class="label">Город</p>
                <p class="value">${city}</p>
             </div>
             <div class="card">
                <p class="label">Зарплата</p>
                <p class="value">${salary}</p>
             </div>
            <div class="card">
                <p class="label">Тип работы</p>
                <p class="value">${job.type === "office" ? "Офис" : "Удалённо"}</p>
            </div>
         </div>
      </div>
      
    `;

        // Добавляем карточку в контейнер
        jobs_cards.innerHTML += jobCard;
    });
}