import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api/auth",
    withCredentials: true       //cookies me token set krne ke iiye
})


//for registeration   (ye function 3 value lega username, email, password)
export async function register(username, email, password) {
    try{
        const response = await api.post("/register", {
            username,
            email,
            password,
        })

        return response.data

    }
    catch(err) {
        throw err
    }

}

//for login  (we use async because backend se response ane me time lagta hain )
export async function login(username, password) { 
    try {

        const response = await api.post("/login", {
            username,
            password,
        })

        return response.data

    }
    catch(err){
        throw err
    }
}

//for get-me
export async function getMe(){
    try{
        const response = await api.get("/get-me")
        return response.data
    }
    catch(err) {
        throw err
    }
}



// is file mein tumne frontend se backend API ko call karne ke liye functions banaye hain. 
// Axios ka use karke registration aur login request bhej rahe ho.