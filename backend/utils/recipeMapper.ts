import { RawRecipe, CleanRecipe } from '../types/recipeTypes';

export const mapRecipe = (rawRecipe: RawRecipe): CleanRecipe => {
  // Extract ingredients and their measures
  const ingredients: { name: string; measure: string }[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = rawRecipe[`strIngredient${i}` as keyof RawRecipe] as string;
    const measure = rawRecipe[`strMeasure${i}` as keyof RawRecipe] as string;
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || ''
      });
    }
  }
  
  // Map tags to array if present
  const tags = rawRecipe.strTags?.split(',').map(tag => tag.trim()).filter(Boolean) || [];
  
  return {
    id: rawRecipe.idMeal,
    name: rawRecipe.strMeal,
    thumbnail: rawRecipe.strMealThumb,
    tags,
    youtubeUrl: rawRecipe.strYoutube,
    category: rawRecipe.strCategory,
    area: rawRecipe.strArea,
    instructions: rawRecipe.strInstructions,
    ingredients
  };
};

export const mapRecipes = (rawRecipes: RawRecipe[]): CleanRecipe[] => {
  if (!rawRecipes) return [];
  return rawRecipes.map(mapRecipe);
};