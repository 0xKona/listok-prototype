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
    
      } catch (error) {
        console.error("Error verifying Google token:", error);
        res.status(401).json({ message: "Unauthorized" });
      }
});

apiRouter.post('/uploadRecipe', upload.single('recipe_image'), async (req, res) => {
    try {
        const imageId = await queries.insertImage(req.file.buffer);
        const recipeData = {
            recipe_name: req.body.recipe_name,
            recipe_desc: req.body.recipe_desc,
            recipe_method: req.body.recipe_method,
            recipe_ingredients: req.body.recipe_ingredients,
            users_user_id: req.body.users_user_id,
            recipe_image_id: imageId,
        };
        await queries.insertRecipe(recipeData);
        res.status(200).json({ message: "Recipe uploaded successfully" });
    } catch (error) {
        console.error('Error uploading recipe:', error);
        res.status(500).json({ message: "Error uploading recipe" });
    }
});

apiRouter.post('/editRecipe', upload.single('recipe_image'), async (req, res) => {
    try {
        let imageId = req.body.image_id;
        if (req.file) {
            imageId = await queries.updateImage(req.file.buffer, imageId);
        }
        const recipeData = {
            recipe_id: req.body.recipe_id,
            recipe_name: req.body.recipe_name,
            recipe_desc: req.body.recipe_desc,
            recipe_method: req.body.recipe_method,
            recipe_ingredients: req.body.recipe_ingredients,
            users_user_id: req.body.users_user_id,
            recipe_image_id: imageId,
        };
        await queries.updateRecipe(recipeData);
        res.status(200).json({ message: "Recipe updated successfully" });
    } catch (error) {
        console.error('Error editing recipe:', error);
        res.status(500).json({ message: "Error editing recipe" });
    }
});

apiRouter.get('/recipes/:userId', async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default: page 1, limit 10 items
    try {
        const recipes = await queries.getUserRecipes(userId, page, limit);
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: "Error fetching recipes" });
    }
});

apiRouter.get('/recipe/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    try {
        const recipe = await queries.getRecipeById(recipeId);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: "Recipe not found" });
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: "Error fetching recipe" });
    }
});

apiRouter.get('/image/:imageId', async (req, res) => {
    const { imageId } = req.params;
    try {
        const imageData = await queries.fetchImageData(imageId);
        if (imageData) {
            const base64Image = Buffer.from(imageData, 'binary').toString('base64');
            res.send(base64Image);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ message: "Error fetching image" });
    }
});

apiRouter.get('/weeks/:weekStart/:userId', async (req, res) => {
    const { weekStart, userId } = req.params;
    try {
        const weekData = await queries.fetchOrCreateWeekData(weekStart, userId);
        res.json(weekData);
    } catch (error) {
        console.error('Error handling week data:', error);
        res.status(500).json({ message: "Error processing week data" });
    }
});

apiRouter.post('/updateWeek/', async (req, res) => {
    console.log('triggered')
    const weekData = req.body; // Assuming the updated week data is in the request body

    try {
        await queries.updateWeekData(weekData.week_id, weekData);
        res.json({ message: "Week updated successfully" });
    } catch (error) {
        console.error('Error updating week:', error);
        res.status(500).json({ message: "Error updating week" });
    }
});




export default apiRouter