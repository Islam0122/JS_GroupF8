// DOM
const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = {
        email : form.email.value,
        password: form.password.value,
    }
    console.log(newUser)
    login_user(newUser)
})


async function login_user(user){
    const url ="https://api.escuelajs.co/api/v1/auth/login"
    const response = await fetch(url,{
        method: "POST",
        body: JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const res = await response.json()
    const data = await fetch('https://api.escuelajs.co/api/v1/auth/profile',{
        headers: {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + res.access_token        }
    })
    console.log(res)
    const userI = await data.json()
    console.log(res,'---------token----------------')
    console.log(userI,'------------userprofile------------')

}
