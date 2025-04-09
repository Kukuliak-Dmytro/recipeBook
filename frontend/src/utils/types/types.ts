
export interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe {
  id: string;
  name: string;
  thumbnail: string;
  tags: string[];
  youtubeUrl: string;
  category: string;
  area: string;
  instructions: string;
  ingredients: Ingredient[];
}