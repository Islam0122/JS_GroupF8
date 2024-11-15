const ul = document.querySelector('list-group ul');

const base_url = "https://duishobaevislam01.up.railway.app/api/v1/"
const end_point = {
    get_group : "group/",
    get_student : "students/"
}

fetch(base_url+end_point.get_group)
     .then(res => res.json())
     .then(data => {console.log(data)})

fetch(base_url+end_point.get_student)
    .then(res => res.json())
    .then(data => {console.log(data)})


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
            "Content-Type":"application/json"}
    })
    .then(res => res.json())
    .then(data => {console.log(data)})
})













// {
//     "id": 2,
//     "group_name": "py-756",
//     "group_description": "master group",
//     "direction": "BACKEND"
// }

// function fetch(api_url) {
//
// }