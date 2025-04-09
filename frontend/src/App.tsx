"use client";

import React, { useEffect, useState } from 'react';
import RecipeCard from './layouts/RecipeCard';
import Pagination from './layouts/Pagination';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Search } from "lucide-react";

interface Ingredient {
  name: string;
  measure: string;
}

interface Recipe {
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

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: Recipe[];
  pagination: PaginationData;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (page: number = 1, limit: number = 10, search: string = '') => {
    setLoading(true);
    try {
      // Adjust this URL to match your API endpoint
      const url = new URL('/api/recipes', window.location.origin);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', limit.toString());
      if (search) url.searchParams.append('search', search);
      
      const response = await fetch(url.toString());
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setRecipes(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(pagination.page, pagination.limit);
  }, []);

  const handlePageChange = (page: number) => {
    fetchRecipes(page, pagination.limit, searchTerm);
  };

  const handleLimitChange = (limit: number) => {
    fetchRecipes(1, limit, searchTerm);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes(1, pagination.limit, searchTerm);
  };

  const handleRecipeClick = (id: string) => {
    // Navigate to recipe details page
    window.location.href = `/recipes/${id}`;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recipe Book</h1>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <Input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
      
      {loading ? (
        <div className="grid place-items-center h-64">
          <p>Loading recipes...</p>
        </div>
      ) : recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                onClick={() => handleRecipeClick(recipe.id)}
              />
            ))}
          </div>
          
          <Pagination
            {...pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No recipes found.</p>
        </div>
      )}
    </main>
  );
}
