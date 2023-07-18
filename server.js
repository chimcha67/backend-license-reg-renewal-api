const express = require("express");

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const useRouter = require('../backend-tutorial/Router/users');
const connectDb = require("./confi/db");
// app.use(cors())

connectDb()

const PORT = 5000
const helloworld =(req, res)=>{
    res.send('hello word, welcome back')
}
app.get("/", helloworld)
app.use("/users", useRouter )

const server = app.listen(
    PORT,
    console.log(
        `Server is runing on port ${PORT}`
    )
)

