const end_point = {
    getMealsByCategory: "",
}

class Service {
    #base_url =  "https://duishobaevislam01.up.railway.app/api/v1/"

    async get (url ,id){
        if(id) {
            const response = await fetch(this.#base_url +`${url}/{id}/`)
            const data = await response.json()
            console.log(data)
            return data;}
        else {
            const response = await fetch(this.#base_url +`${url}/`)
            const data = await response.json()
            console.log(data)
            return data;}
        }
    post(){}
    delete(){}
    update(){}
}
class StudentService extends Service{

}
const student = new StudentService();


//