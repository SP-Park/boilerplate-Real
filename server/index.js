import express from 'express';
import mongoose from 'mongoose';
const path = require("path");
const cors = require('cors');
const cookieParser = require("cookie-parser");

//Router imports
import userApis from './routes/users.js';

mongoose.connect('mongodb://localhost:27017/KB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userApis);


const port = 5000

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
  });