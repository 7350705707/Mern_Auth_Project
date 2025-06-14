import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/user.Routes.js';



const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(cors({
    credentials: true,
}));

app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('API Working fine!');
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);



// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});