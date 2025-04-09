import React, { useEffect, useState } from 'react';
import RecipeCard from './layouts/RecipeCard';
import Pagination from './layouts/Pagination';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Search, FilterX, SlidersHorizontal } from "lucide-react";
import { MultiSelect } from './components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Label } from './components/ui/label';
import axiosCLient from './utils/http';
import { cn } from './lib/utils';

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

interface FilterOption {
  label: string;
  value: string;
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
  
  // Filters state
  const [areas, setAreas] = useState<FilterOption[]>([]);
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [ingredients, setIngredients] = useState<FilterOption[]>([]);
  
  // Selected filters
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  // Sidebar visibility for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      // Fetch areas
      const areasResponse = await axiosCLient.get('/filters/areas');
      if (areasResponse.data.success) {
        const areaOptions = areasResponse.data.data.map((area: { strArea: string }) => ({
          label: area.strArea,
          value: area.strArea
        }));
        setAreas(areaOptions);
      }
      
      // Fetch categories
      const categoriesResponse = await axiosCLient.get('/filters/categories');
      if (categoriesResponse.data.success) {
        const categoryOptions = categoriesResponse.data.data.map((category: { strCategory: string }) => ({
          label: category.strCategory,
          value: category.strCategory
        }));
        setCategories(categoryOptions);
      }
      
      // Fetch ingredients
      const ingredientsResponse = await axiosCLient.get('/filters/ingredients');
      if (ingredientsResponse.data.success) {
        const ingredientOptions = ingredientsResponse.data.data.map((ingredient: { 
          idIngredient: string;
          strIngredient: string;
        }) => ({
          label: ingredient.strIngredient,
          value: ingredient.strIngredient
        }));
        setIngredients(ingredientOptions);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchRecipes = async (
    page: number = 1, 
    limit: number = 10, 
    search: string = '',
    area: string | null = null,
    category: string | null = null,
    ingredients: string[] = []
  ) => {
    setLoading(true);
    try {
      // Construct URL with all filter parameters
      let url = `/recipes?limit=${limit}&page=${page}`;
      
      if (search) url += `&search=${search}`;
      if (area) url += `&area=${area}`;
      if (category) url += `&category=${category}`;
      if (ingredients.length > 0) {
        // Join multiple ingredients with comma
        // url += `&i=${ingredients.join(',')}`;
        //as it turns out, the free API does not support multiple ingredients in a single query
        //so we'll send only the first one
        url += `&ingredient=${ingredients[0]}`;
      }
      
      const response = await axiosCLient.get(url);
      const data: ApiResponse = response.data;
      
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
    // Fetch filter options when component mounts
    fetchFilterOptions();
    
    // Fetch initial recipes
    fetchRecipes(pagination.page, pagination.limit);
  }, []);

  const handlePageChange = (page: number) => {
    fetchRecipes(
      page, 
      pagination.limit, 
      searchTerm, 
      selectedArea, 
      selectedCategory, 
      selectedIngredients
    );
  };

  const handleLimitChange = (limit: number) => {
    fetchRecipes(
      1, 
      limit, 
      searchTerm, 
      selectedArea, 
      selectedCategory, 
      selectedIngredients
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes(
      1, 
      pagination.limit, 
      searchTerm, 
      selectedArea, 
      selectedCategory, 
      selectedIngredients
    );
  };

  const applyFilters = () => {
    fetchRecipes(
      1, 
      pagination.limit, 
      searchTerm, 
      selectedArea, 
      selectedCategory, 
      selectedIngredients
    );
    // Close sidebar on mobile after applying filters
    setSidebarOpen(false);
  };

  const resetFilters = () => {
    setSelectedArea(null);
    setSelectedCategory(null);
    setSelectedIngredients([]);
    fetchRecipes(1, pagination.limit, searchTerm);
  };

  const handleRecipeClick = (id: string) => {
    // Navigate to recipe details page
    window.location.href = `/recipes/${id}`;
  };

  const FiltersSidebar = () => (
    <div className="bg-card rounded-lg p-4 space-y-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="area-filter">Filter by Area</Label>
          <Select 
            value={selectedArea || undefined} 
            onValueChange={setSelectedArea}
          >
            <SelectTrigger id="area-filter">
              <SelectValue placeholder="All Areas" />
            </SelectTrigger>
            <SelectContent>
              {areas.map(area => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category-filter">Filter by Category</Label>
          <Select 
            value={selectedCategory || undefined}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ingredients-filter">Filter by Ingredients</Label>
          <MultiSelect
            options={ingredients}
            onValueChange={setSelectedIngredients}
            defaultValue={selectedIngredients}
            placeholder="Select ingredients"
            maxCount={3}
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2 pt-4 border-t">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="gap-2"
        >
          <FilterX className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium mb-2">Active Filters</h3>
        <div className="text-sm text-muted-foreground">
          {selectedArea && <p>Area: {selectedArea}</p>}
          {selectedCategory && <p>Category: {selectedCategory}</p>}
          {selectedIngredients.length > 0 && (
            <p>Ingredients: {selectedIngredients.join(', ')}</p>
          )}
          {!selectedArea && !selectedCategory && selectedIngredients.length === 0 && (
            <p>No active filters</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile filter toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-10">
        <Button 
          size="icon"
          className="rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </div>
    
      {/* Mobile filter sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-xl transform transition-transform duration-200 ease-in-out md:hidden",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full overflow-y-auto p-4">
          <FiltersSidebar />
        </div>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Recipe Book</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FiltersSidebar />
          </aside>
          
          {/* Main content */}
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {(selectedArea || selectedCategory || selectedIngredients.length > 0) && (
                  <p className="mt-2">Try adjusting your filters or search criteria.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
