import mysql from 'mysql2/promise';
import path from 'path';
import dotenv from 'dotenv';
import * as url from 'url';
import { promises as fs } from 'fs'; // Node.js File System module with Promises

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

queries.insertImage = async (imageData) => {
    const query = `INSERT INTO images (image_data) VALUES (?);`;
    const [result] = await pool.execute(query, [imageData]);
    return result.insertId;
};

queries.updateImage = async (imageData, imageId) => {
    const updateQuery = `UPDATE images SET image_data = ? WHERE image_id = ?;`;
    await pool.execute(updateQuery, [imageData, imageId]);
    return imageId;
};

queries.insertRecipe = async (recipeData) => {
    const { recipe_name, recipe_desc, recipe_method, recipe_ingredients, users_user_id, recipe_image_id } = recipeData;

    const query = `
        INSERT INTO recipes (
            recipe_name, recipe_desc, recipe_method, recipe_image_id, 
            recipe_ingredients, users_user_id
        ) VALUES (?, ?, ?, ?, ?, ?);
    `;

    await pool.execute(query, [
        recipe_name,
        recipe_desc,
        recipe_method,
        recipe_image_id,
        recipe_ingredients,
        users_user_id,
    ]);
};

queries.updateRecipe = async (recipeData) => {
    const { recipe_id, recipe_name, recipe_desc, recipe_method, recipe_ingredients, users_user_id, recipe_image_id } = recipeData;

    const updateQuery = `
        UPDATE recipes
        SET recipe_name = ?, recipe_desc = ?, recipe_method = ?, recipe_image_id = ?, recipe_ingredients = ?, users_user_id = ?
        WHERE recipe_id = ?;
    `;
    await pool.execute(updateQuery, [
        recipe_name,
        recipe_desc,
        recipe_method,
        recipe_image_id,
        recipe_ingredients,
        users_user_id,
        recipe_id,
    ]);
};


export default queries;
