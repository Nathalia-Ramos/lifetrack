import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import routes from "../src/routes/auth_route.js"

env.config();

const server = express();

server
.use(express.json())
.use(cors())
.use('/', routes)


server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port " + (process.env.PORT || 3000));
});