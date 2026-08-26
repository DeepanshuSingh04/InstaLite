require('dotenv').config()      //rmember ye hmesha phli line likhi jati hain env ko require krne wali wrna ham variabel use hi ni kr paenge .env file ke 
const app = require("./src/app")
const connectToDatabase = require("./src/config/database")


connectToDatabase();



app.listen(3000,()=>{
    console.log("Server is runnign on port 3000")
})