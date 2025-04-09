import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../utils/http';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Globe, Tag, Youtube, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '../utils/types/types';

const RecipePage: React.FC = () => {
  const {id} = useParams<{id:string}>();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError('No recipe ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axiosClient.get(`/recipes/${id}`);
        
        if (response.data.success) {
          setRecipe(response.data.data);
        } else {
          setError('Failed to load recipe details');
        }
      } catch (err) {
        setError('An error occurred while fetching the recipe');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-card rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Error</h1>
          <p className="text-center text-muted-foreground">{error || 'Recipe not found'}</p>
          <div className="flex justify-center mt-6">
            <Button asChild>
              <Link to="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Recipes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Split instructions by line breaks for better readability
  const instructionSteps = recipe.instructions.split(/\r?\n/).filter(step => step.trim() !== '');

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" className="mb-6" asChild>
        <Link to="/">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Recipes
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          {/* Recipe Header */}
          <div className="relative h-80 w-full">
            <img 
              src={recipe.thumbnail} 
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{recipe.name}</h1>
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.category && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {recipe.category}
                  </Badge>
                )}
                {recipe.area && (
                  <Badge className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {recipe.area}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="p-6">
            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-medium text-muted-foreground mb-2">Tags</h2>
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="text-muted-foreground ml-auto">{ingredient.measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {instructionSteps.map((step, index) => (
                  <li key={index} className="pl-4 border-l-2 border-primary">
                    <p className="text-sm sm:text-base">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* YouTube Link */}
            {recipe.youtubeUrl && (
              <div className="mt-6 flex justify-center">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white" 
                  size="lg"
                  asChild
                >
                  <a href={recipe.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-5 w-5 mr-2" />
                    Watch Video Tutorial
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;