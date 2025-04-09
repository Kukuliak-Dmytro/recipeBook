import axiosClient from "../utils/http";
import { Area, Category, Ingredient } from "../types/filterTypes";

const getAllCategories = async (): Promise<Category[]> => {
    const response = await axiosClient.get("/list.php?c=list");
    if (!response.data.meals) {
        return [];
    }
    console.log(response.data.meals);
    return response.data.meals;
}

const getAllAreas = async (): Promise<Area[]> => {
    const response = await axiosClient.get("/list.php?a=list");
    if (!response.data.meals) {
        return [];
    }
    return response.data.meals;
}

const getAllIngredients = async (): Promise<Ingredient[]> => {
    const response = await axiosClient.get("/list.php?i=list");
    if (!response.data.meals) {
        return [];
    }

    return response.data.meals;
}

export {
    getAllCategories,
    getAllAreas,
    getAllIngredients
}