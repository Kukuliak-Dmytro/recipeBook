import { getIngredients, getAreas, getCategories } from "../controllers/filterController";
import express from "express";


const router = express.Router();


router.get("/categories", getCategories);

router.get("/areas", getAreas);

router.get("/ingredients", getIngredients);

export default router;