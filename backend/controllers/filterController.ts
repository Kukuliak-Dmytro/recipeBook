import { Request, Response } from 'express';
import { getAllCategories, getAllAreas, getAllIngredients } from '../services/filterServices';
import { Area, Category, Ingredient, ApiResponse } from '../types/filterTypes';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();
        const response: ApiResponse<Category[]> = { 
            success: true, 
            data: categories 
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching categories:', error);
        const errorResponse: ApiResponse<null> = {
            success: false, 
            message: 'Failed to fetch categories'
        };
        res.status(500).json(errorResponse);
    }
};

export const getAreas = async (req: Request, res: Response) => {
    try {
        const areas = await getAllAreas();
        const response: ApiResponse<Area[]> = { 
            success: true, 
            data: areas 
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching areas:', error);
        const errorResponse: ApiResponse<null> = {
            success: false, 
            message: 'Failed to fetch areas'
        };
        res.status(500).json(errorResponse);
    }
};

export const getIngredients = async (req: Request, res: Response) => {
    try {
        const ingredients = await getAllIngredients();
        const response: ApiResponse<Ingredient[]> = { 
            success: true, 
            data: ingredients 
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        const errorResponse: ApiResponse<null> = {
            success: false, 
            message: 'Failed to fetch ingredients'
        };
        res.status(500).json(errorResponse);
    }
};