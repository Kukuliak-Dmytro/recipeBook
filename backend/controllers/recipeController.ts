import { Request, Response, NextFunction } from 'express';
import {
    fetchAllRecipes,
    fetchRecipeById
} from '../services/recipeServices';
import { paginateResults, getPaginationFromQuery } from '../utils/pagination';


const validateStringParam = (param: any): string | undefined => {
    if (!param) return undefined;
    const trimmed = String(param).trim();
    return trimmed.length > 0 ? trimmed : undefined;
};

const masterEndpoint = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Validate and sanitize query parameters
        const search = validateStringParam(req.query.search);
        const ingredient = validateStringParam(req.query.ingredient);
        const area = validateStringParam(req.query.area);
        const category = validateStringParam(req.query.category);
        
        let recipes = await fetchAllRecipes(search);
        
        // Filter by ingredient if provided
        if (ingredient) {
            recipes = recipes.filter(recipe => 
                recipe.ingredients?.some(ing => 
                    ing.name.toLowerCase().includes(ingredient.toLowerCase())
                )
            );
        }
        
        // Filter by area if provided
        if (area) {
            recipes = recipes.filter(recipe => 
                recipe.area?.toLowerCase() === area.toLowerCase()
            );
        }
        
        // Filter by category if provided
        if (category) {
            recipes = recipes.filter(recipe => 
                recipe.category?.toLowerCase() === category.toLowerCase()
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
        const id = validateStringParam(req.params.id);
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Recipe ID is required'
            });
        }
        
        const recipe = await fetchRecipeById(id);
        
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
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