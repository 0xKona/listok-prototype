import express from 'express';
import queries from './database-queries.js';

//Maybe needed later
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.join(__dirname, './secrets/.env')});

const apiRouter = express.Router();

apiRouter.post('/login', async (req, res) => {
    const result = await login(req.body.id, req.body.email);
    res.status(200).send(result)
})

apiRouter.post('/insertUserTest', async (req, res) => {
    console.log('api-router triggered')
    const result = await queries.insertUserTest(
        req.body.userId,
        req.body.userEmail,
        req.body.userDisplayName
    )
    res.status(200).send(result)
})



export default apiRouter