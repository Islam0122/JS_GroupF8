// const promise = new Promise((resolve, reject) => {
//
//     setTimeout(() => {
//         resolve('text');
//         reject('error');
//     }, 2000);
//
// });
// promise
//     .then( data => {
//     console.log(data);
//      })
//     .catch((err)=>{console.log(err)})
//
// promise
//         .then(
//             result=>console.log("Fulfilled: " + result),
//             error=>console.log("Rejected: " + error.message)
//         )



const img_url = './img.png'
// const imgEl = document.createElement('img')
const h1El = document.createElement('h1')
const imgEl = document.querySelector('img')

let code = 201
const p = new Promise((success,error)=>{
    setTimeout(()=> {
        if (code===200){
            success(img_url)
        }
        else{
            error('404 no found img url  ')
        }
    },2000)
})

p
    .then(
    url => imgEl.src = url,
)
// .catch(error => console.log(error))
    .catch(error => document.body.append(h1El.innerText=error))
    .finally(()=> document.body.append(document.createElement('h2').innerText="hello my boss"))
