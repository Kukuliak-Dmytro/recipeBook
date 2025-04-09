import { Request, Response, NextFunction } from 'express';
import {
    fetchAllRecipes,
    fetchRecipeById
} from '../services/recipeServices';
import { paginateResults, getPaginationFromQuery } from '../utils/pagination';
import { AppError } from '../middlewares/errorHandler';

const masterEndpoint = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { search, ingredient, area, category } = req.query;
        

        let recipes = await fetchAllRecipes(search as string);
        
        // Filter by ingredient if provided
        if (ingredient) {
            recipes = recipes.filter(recipe => 
                recipe.ingredients?.some(ing => 
                    ing.name.toLowerCase().includes((ingredient as string).toLowerCase())
                )
            );
        }
        
        // Filter by area if provided
        if (area) {
            recipes = recipes.filter(recipe => 
                recipe.area?.toLowerCase() === (area as string).toLowerCase()
            );
        }
        
        // Filter by category if provided
        if (category) {
            recipes = recipes.filter(recipe => 
                recipe.category?.toLowerCase() === (category as string).toLowerCase()
            );
        }
        
        const paginationOptions = getPaginationFromQuery(req.query);
        const paginatedResult = paginateResults(recipes, paginationOptions);
        
        return res.status(200).json({
            success: true,
            count: recipes.length,
            ...paginatedResult
        });
    } catch (error) {
        next(error);
    }
};

const getRecipeById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return next(new AppError('Recipe ID is required', 400));
        }
        
        const recipe = await fetchRecipeById(id);
        
        if (!recipe) {
            return next(new AppError('Recipe not found', 404));
        }
        
        return res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        next(error);
    }
};

export {
    masterEndpoint,
    getRecipeById
};