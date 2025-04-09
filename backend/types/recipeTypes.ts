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
    strIngredient3?: string;
    strIngredient4?: string;
    strIngredient5?: string;
    strIngredient6?: string;
    strIngredient7?: string;
    strIngredient8?: string;
    strIngredient9?: string;
    strIngredient10?: string;
    strIngredient11?: string;
    strIngredient12?: string;
    strIngredient13?: string;
    strIngredient14?: string;
    strIngredient15?: string;
    strIngredient16?: string;
    strIngredient17?: string;
    strIngredient18?: string;
    strIngredient19?: string;
    strIngredient20?: string;
    strMeasure1?: string;
    strMeasure2?: string;
    strMeasure3?: string;
    strMeasure4?: string;
    strMeasure5?: string;
    strMeasure6?: string;
    strMeasure7?: string;
    strMeasure8?: string;
    strMeasure9?: string;
    strMeasure10?: string;
    strMeasure11?: string;
    strMeasure12?: string;
    strMeasure13?: string;
    strMeasure14?: string;
    strMeasure15?: string;
    strMeasure16?: string;
    strMeasure17?: string;
    strMeasure18?: string;
    strMeasure19?: string;
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