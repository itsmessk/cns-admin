import express from 'express';
import cookieParser from 'cookie-parser';

import {PORT, SERVER_URL} from "./config/env.js";
import connectDb from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import serviceRequest from "./routes/serviceRequest.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/serviceRequest", serviceRequest)

app.use("/", (req, res) =>{
    res.send("Welcome to the CNS Admin API");
});

app.use(errorMiddleware);

app.listen(PORT, async() =>{
    console.log(`Server is running on port ${PORT}, use ${SERVER_URL} to access the API`);
    connectDb();
})

export default app;