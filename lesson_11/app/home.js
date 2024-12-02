// DOM
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = {
        name : form.name.value,
        email : form.email.value,
        password: form.password.value,
        avatar: form.avatar.value,
    }
    console.log(newUser)
    create_user(newUser)
})


async function create_user(user){
    const url ="https://api.escuelajs.co/api/v1/users/"
    const response = await fetch(url,{
        method: "POST",
        body: JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.ok === true ){
        window.location.href="login.html"
    }
    const res = await response.json()
    console.log(res)
}
