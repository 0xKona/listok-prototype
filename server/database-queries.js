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
    const pageNumber = Number(page); //Not converting to a number causes SQL Error ¯\_(ツ)_/¯
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const query = `
        SELECT * FROM recipes
        WHERE users_user_id = ?
        LIMIT ? OFFSET ?;
    `;
    const [recipes] = await pool.query(query, [userId, limitNumber, offset]);
    return recipes;
};

queries.getRecipeById = async (recipeId) => {
    const query = `
        SELECT * FROM recipes
        WHERE recipe_id = ?;
    `;
    try {
        const [recipes] = await pool.query(query, [recipeId]);
        return recipes[0];
    } catch (error) {
        console.error('Error fetching recipe by ID:', error);
        throw error;
    }
};

queries.fetchImageData = async (imageId) => {
    const query = `SELECT image_data FROM images WHERE image_id = ?`;
    try {
        const [rows] = await pool.execute(query, [imageId]);
        if (rows.length > 0) {
            return rows[0].image_data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching image data:', error);
    }
};

queries.fetchOrCreateWeekData = async (weekStart, userId) => {
    const selectQuery = `SELECT * FROM weeks WHERE week_start = ? AND users_user_id = ?`;

    try {
        const [rows] = await pool.execute(selectQuery, [weekStart, userId]);
        if (rows.length > 0) {
            return rows[0]; // Week data exists
        } else {
            // Insert new week data if not exists
            const insertQuery = `INSERT INTO weeks (week_start, users_user_id) VALUES (?, ?)`;
            await pool.execute(insertQuery, [weekStart, userId]);

            // Fetch and return the newly created week data
            const [newRows] = await pool.execute(selectQuery, [weekStart, userId]);
            return newRows[0];
        }
    } catch (error) {
        console.error('Error fetching or creating week data:', error);
        throw error; // Re-throw the error to be handled by the calling function
    }
};

queries.updateWeekData = async (weekId, weekData) => {
    const updateQuery = `UPDATE weeks SET mon = ?, tue = ?, wed = ?, thur = ?, fri = ?, sat = ?, sun = ? WHERE week_id = ?`;
    const values = [
        weekData.dayData.mon,
        weekData.dayData.tue,
        weekData.dayData.wed,
        weekData.dayData.thur,
        weekData.dayData.fri,
        weekData.dayData.sat,
        weekData.dayData.sun,
        weekId,
    ];

    try {
        await pool.execute(updateQuery, values);
    } catch (error) {
        console.error('Error updating week data:', error);
        throw error;
    }
};



export default queries;
