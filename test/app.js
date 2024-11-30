//DOM
const content = document.getElementById('content');
const ulTag = document.querySelector(".ul")

// REST API - Representation state
const base_url = 'https://baiastan-linguist2024.up.railway.app/api/v1'

//  api - application programming interface
const api = {
    test_list: '/test_list/'
}

async function fetchTestList() {
    const response = await fetch(base_url + api.test_list);
    const testList = await response.json();

    const h1El = document.createElement('h1');
    h1El.textContent = testList[0].title;
    content.appendChild(h1El);

    const ulTag = document.createElement('div');
    content.appendChild(ulTag);

    const {questions} = testList[0];

    questions.forEach((question, index) => {
        ulTag.innerHTML += `
      <div>
        ${question.title}
        <br>
        <select data-index="${index}"></select>
      </div>`;
    });

    renderOption(questions);
}

function renderOption(questions) {
    const variants = ['a', 'b', 'c', 'd'];
    const selects = document.querySelectorAll('select');

    selects.forEach((select, index) => {
        variants.forEach(variant => {
            select.innerHTML += `<option value="${variant}">${questions[index]['option_' + variant]}</option>`;
        });
        select.addEventListener('change', () => {
            const {correct_option} = questions[index]
            const {value} = select;

            if (value.toUpperCase() === correct_option) {
                alert("Success!");
            } else {
                alert("Error!");
            }

        })
    });
}

fetchTestList()
