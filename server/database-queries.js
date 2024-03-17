import mysql from 'mysql2/promise';
import path from 'path';
import dotenv from 'dotenv';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

dotenv.config({ path: path.join(__dirname, './secrets/.env')});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'listok_db',
});

pool.getConnection((error, connection) => {
    if (connection) {
        console.log('Database connected succesfully')
    } else {
        console.log('Error connecting to database, the following error occured: ', error)
    }
});

const queries = {};

queries.createNewUser = async (user_id, user_email, user_display_name) => {
    const query = 'INSERT INTO users (google_id, user_email, user_display_name) VALUES(?,?,?)';
    return pool.query(query, [ user_id, user_email, user_display_name ], (error, result) => {
        return {error, result};
    });
};

queries.checkIfUserExists = async (google_id) => {
    const query = 'SELECT * from `users` WHERE `google_id` = ?';
    return pool.query(query, [ google_id ], (error, result) => {
        return {error, result};
    });
};


export default queries;
