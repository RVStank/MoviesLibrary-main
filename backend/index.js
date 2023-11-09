import express, { response } from "express";
import { PORT, mongoDBURL, SECRET_KEY } from "./config.js";
import mongoose from "mongoose";
import { Movie } from "./models/movieModel.js";
import moviesRoute from "./routes/moviesRoute.js"
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';

dotenv.config();
console.log(SECRET_KEY);

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the Movies Library');
});

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use('/movies', moviesRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
