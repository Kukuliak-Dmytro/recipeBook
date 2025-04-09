export interface RecipeShort {
  idMeal: string;
  strMeal: string;
  strMealThumb?: string;
}

export interface RawRecipe extends RecipeShort {
  strTags?: string;
  strYoutube?: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  // ...other ingredients
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  // ...other measures
  strMeasure20?: string;
}

export interface CleanRecipe {
  id: string;
  name: string;
  thumbnail?: string;
  tags?: string[];
  youtubeUrl?: string;
  category?: string;
  area?: string;
  instructions?: string;
  ingredients: {
    name: string;
    measure: string;
  }[];
}

export interface RecipesResponse {
  meals: RawRecipe[] | null;
}