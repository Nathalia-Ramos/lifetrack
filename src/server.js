import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import auth from "../src/routes/auth_route.js"
import userouter from './routes/user.route.js';

env.config();

const server = express();

server
.use(express.json())
.use(cors())
.use('/', auth)
.use('/user', userouter)


server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port " + (process.env.PORT || 3000));
});