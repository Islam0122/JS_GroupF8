const base_url = "https://duishobaevislam01.up.railway.app/api/v1/";
const end_point = {
    tales: "tales/"
};

const form = document.querySelector('#storyForm');
const text = document.querySelector('#topic');
const container = document.getElementById("games-container");
const buttonEl = document.getElementById("button");
const chats = document.getElementById("chats");


async function create_tales(new_tales) {
    try {
        const response = await fetch(base_url + end_point.tales, {
            method: "POST",
            body: JSON.stringify(new_tales),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            alert('Ошибка при создании сказки');
            return;
        }

        const data = await response.json();
        console.log(data);

        // Добавляем новое сообщение в chats
        chats.innerHTML += ` 
            <div class="alert alert-info " role="alert">
                <div class="alert alert-info d-flex align-items-center" role="alert">
                    <i class="bi bi-robot" style="font-size: 1.5rem;"></i>
                          <div class="ms-3">  <!-- Отступ между иконкой и текстом -->
                             <h4>${data.topic}</h4>  <!-- Используем <h4> для заголовка, чтобы он был выделен -->
                          </div>
                </div>
                <div class="alert alert-secondary">
                      <p class="mb-0">${data.text}</p>  <!-- Отображаем текст сказки -->
                       <p class="mb-0"><small>Создано: ${new Date(data.created_at).toLocaleString()}</small></p>  <!-- Форматируем дату -->
                </div>


            </div>
        `;
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при запросе');
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const new_tales = {
        topic: text.value,
        user:5,
    };
    console.log(new_tales);

    chats.innerHTML += ` <div class="alert alert-info d-flex align-items-center" role="alert">
              <i class="bi bi-person-circle me-2" style="font-size: 1.5rem;"></i>
              <p class="mb-0">${text.value}</p>
          </div>`;
    create_tales(new_tales);
});



