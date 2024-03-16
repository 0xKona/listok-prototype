import express from 'express';
import queries from './database-queries.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, './secrets/.env')});

const apiRouter = express.Router();

apiRouter.post('/login', async (req, res) => {
    const checkExistingUser = async() => {
        const response = await queries.checkIfUserExists(req.body.userId);
        console.log('TESTING:: ', response[0]);
        if (response && response[0].length > 0) {
            console.log(true);
            console.log(response[0])
            return response[0]
        } else {
            console.log(false);
            const addNewUserResult = await queries.createNewUser(
                req.body.userId,
                req.body.userEmail,
                req.body.userDisplayName
            )
            console.log(addNewUserResult)
            return addNewUserResult
        }
        return response;
    }
    // console.log('apiRouter checkExistingUser Result :: ', await checkExistingUser())

    const result = await checkExistingUser()

    res.status(200).send(result)
})



export default apiRouter