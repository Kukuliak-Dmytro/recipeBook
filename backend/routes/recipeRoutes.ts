import express from 'express';
import { masterEndpoint, getRecipeById } from '../controllers/recipeController';

const router = express.Router();

router.get('/recipes', masterEndpoint);

router.get('/recipes/:id', getRecipeById);

export default router;