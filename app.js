import express from 'express';
import {NODE_ENV, PORT} from "./config/env.js";
import connnectDb from "./database/mongodb.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", (req, res) =>{
    res.send("Welcome to the CNS Admin API");
})

app.listen(PORT, async() =>{
    console.log(`Server is running on port ${PORT}, use http://localhost:${PORT}/ to access the API`);
    connnectDb();
})








export default app;