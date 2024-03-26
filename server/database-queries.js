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

queries.getUserRecipes = async (userId, page, limit) => {
    // Convert page and limit to numbers to ensure proper query execution
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const query = `
        SELECT * FROM recipes
        WHERE users_user_id = ?
        LIMIT ? OFFSET ?;
    `;

    // Ensure that the variables passed to pool.execute are of the correct type
    const [recipes] = await pool.query(query, [userId, limitNumber, offset]);
    return recipes;
};

queries.fetchImageData = async (imageId) => {
    const query = `SELECT image_data FROM images WHERE image_id = ?`;
    try {
        const [rows] = await pool.execute(query, [imageId]);
        if (rows.length > 0) {
            // Assuming image_data is stored as a blob, which is returned as a Buffer
            return rows[0].image_data;
        }
        return null; // Return null if no image is found
    } catch (error) {
        console.error('Error fetching image data:', error);
        throw error; // Rethrow or handle as appropriate for your application
    }
};


export default queries;
