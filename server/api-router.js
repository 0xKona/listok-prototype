import express from 'express';
import queries from './database-queries.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { OAuth2Client } from 'google-auth-library';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, './secrets/.env')});

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID)

const apiRouter = express.Router();

apiRouter.post('/login', async (req, res) => {
    
    const { token } = req.body;

    try {
        // Verify the ID token asynchronously
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_OAUTH_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        
        const payload = ticket.getPayload();
        const googleId = payload.sub

        const checkExistingUser = async() => {
            const response = await queries.checkIfUserExists(googleId);
    
            if (response && response[0].length > 0) {
                return response[0]
            } else {
                await queries.createNewUser(
                    payload.sub,
                    payload.email,
                    payload.name
                )
                const user = await queries.checkIfUserExists(googleId)
                return user[0]
            }
        }
    
        const result = await checkExistingUser()
    
        res.status(200).send({listokId: result[0].user_id});
    
        // res.status(200).json({ message: "Successfully authenticated", user: payload });
      } catch (error) {
        console.error("Error verifying Google token:", error);
        res.status(401).json({ message: "Unauthorized" });
      }
    
})

apiRouter.post('/uploadRecipe', upload.single('recipe_image'), async (req, res) => {
    try {
        // Insert image into 'images' table and get back the inserted image ID
        const imageId = await queries.insertImage(req.file.buffer);
        // Combine form fields and the image ID
        const recipeData = {
            recipe_name: req.body.recipe_name,
            recipe_desc: req.body.recipe_desc,
            recipe_method: req.body.recipe_method,
            recipe_ingredients: req.body.recipe_ingredients, // Assuming JSON string
            users_user_id: req.body.users_user_id,
            recipe_image_id: imageId, // Use the returned image ID
        };

        // Insert recipe data into database
        await queries.insertRecipe(recipeData);

        res.status(200).json({ message: "Recipe uploaded successfully" });
    } catch (error) {
        console.error('Error uploading recipe:', error);
        res.status(500).json({ message: "Error uploading recipe" });
    }
});




export default apiRouter