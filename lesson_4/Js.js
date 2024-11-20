const ul = document.querySelector('list-group ul');

const base_url = "https://duishobaevislam01.up.railway.app/api/v1/"
const end_point = {
    get_group : "group/",
    get_student : "students/"
}
const select = document.getElementById("st-group");
const create_student_form = document.getElementById("create_student");

fetch(base_url+end_point.get_group)
     .then(res => res.json())
     .then(data => {console.log(data)
     select.innerHTML = data.map(option => `
     <option value="${option.id}" selected>${option.group_name}</option>`)})

create_student_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newGroup = {
        first_name: create_student_form.first_name.value,
        last_name: create_student_form.last_name.value,
        age: create_student_form.age.value,
        phone_number: create_student_form.phone_number.value,
        telegram: create_student_form.telegram.value,
        group: create_student_form.group.value,
        photo: null,
    }

    fetch(base_url+end_point.get_student,{
        method: "POST",
        body: JSON.stringify(newGroup),
        headers:{
            "Content-Type":"application/json"
        }
    })
        .then(res => res.json())
        .then(data => {console.log(data)})
})


// fetch(base_url+end_point.get_student)
//     .then(res => res.json())
//     .then(data => {console.log(data)})



const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault()

    const  newGroup = {
        group_name :  form.group_name.value,
        group_description : form.group_description.value,
        direction : form.direction.value,
    }
    console.log(newGroup)
    fetch(base_url+end_point.get_group,{
        method: "POST",
        body: JSON.stringify(newGroup),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res => res.json())
    .then(data => {console.log(data)})
})





const student_list = document.getElementById("student_list");


fetch(base_url + end_point.get_student)
    .then(res => res.json())
    .then(data => {
        student_list.innerHTML = data.map(option => `
            <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                <span>${option.last_name}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${option.id})">
                    Удалить
                </button>
            </div>
        `).join("");
    });

function deleteStudent(studentId) {
    if (confirm("Вы уверены, что хотите удалить этого студента?")) {
        fetch(base_url + end_point.get_student + `${studentId}/`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    alert('Студент успешно удален!');
                    // Удаляем студента из списка без перезагрузки страницы
                    document.querySelector(`button[onclick="deleteStudent(${studentId})"]`).parentElement.remove();
                } else {
                    alert('Ошибка при удалении студента!');
                }
            });
    }
}











// {
//     "id": 2,
//     "group_name": "py-756",
//     "group_description": "master group",
//     "direction": "BACKEND"
// }

// function fetch(api_url) {
//
// }