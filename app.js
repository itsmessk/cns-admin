import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import {PORT, SERVER_URL} from "./config/env.js";
import connectDb from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import serviceRequest from "./routes/serviceRequest.routes.js";

const app = express();

app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000' , "http://localhost:5500", "http://localhost:5173", "https://cns-admin-frontend.vercel.app ", "http://127.0.0.1:5500",
"https://cns-site.vercel.app",
"https://cns-admin-frontend.vercel.app"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/serviceRequest", serviceRequest)

app.get("/", (req, res) =>{
    res.send("Welcome to the CNS Admin API");
});

app.use("/*splat", (req, res) =>{
    res.status(404).json({
        success: false,
        message: 'Route Not Found',
    })
})

app.use(errorMiddleware);

const startServer = async () =>{
    try{
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on ${SERVER_URL}`);
        });
    } catch(error){
        console.log('failed to start server', error.message);
        process.exit(1);
    }
}

startServer();

export default app;