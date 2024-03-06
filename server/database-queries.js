import mysql from 'mysql2';
import path from 'path';
import dotenv from 'dotenv';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

dotenv.config({ path: path.join(__dirname, './secrets/.env')});

// const config = loader();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'listok_db',
});

pool.getConnection((error, connection) => {
    if (connection) {
        console.log('Database connected succesfully')
    } else {
        console.log('Error connecting to database, the following error occured:', error)
    }
});

const queries = {}


export default queries;
