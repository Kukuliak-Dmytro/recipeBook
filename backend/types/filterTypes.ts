export interface Category {
    strCategory: string;
}

export interface Area {
    strArea: string;
}

export interface Ingredient {
    idIngredient: string;
    strIngredient: string;
    strDescription: string | null;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}