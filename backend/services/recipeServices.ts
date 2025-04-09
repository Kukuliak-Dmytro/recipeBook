import axiosClient from '../utils/http';
import { RecipesResponse, CleanRecipe } from '../types/recipeTypes';
import { mapRecipe, mapRecipes } from '../utils/recipeMapper';

export const fetchAllRecipes = async (searchTerm: string = ''): Promise<CleanRecipe[]> => {
    const response = await axiosClient.get<RecipesResponse>(`/search.php?s=${searchTerm}`);
    if (!response.data.meals) {
        return [];
    }
    
    // Transform the raw recipes into clean format
    return mapRecipes(response.data.meals);
};


export const fetchRecipeById = async (id: string): Promise<CleanRecipe | null> => {
    if (!id) throw new Error('Recipe ID is required');
    
    const response = await axiosClient.get<RecipesResponse>(`/lookup.php?i=${id}`);
    if (!response.data.meals || response.data.meals.length === 0) {
        return null;
    }
    
    // Transform the raw recipe into clean format
    return mapRecipe(response.data.meals[0]);
};
