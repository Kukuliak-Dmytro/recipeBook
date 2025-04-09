import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Badge } from '../components/ui/badge';
import { Button } from "../components/ui/button";
import { ExternalLink, Globe, Tag, Youtube } from "lucide-react";

interface Ingredient {
  name: string;
  measure: string;
}

interface RecipeCardProps {
  id: string;
  name: string;
  thumbnail: string;
  tags: string[];
  youtubeUrl: string;
  category: string;
  area: string;
  instructions: string;
  ingredients: Ingredient[];
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  name,
  thumbnail,
  tags,
  youtubeUrl,
  category,
  area,
  instructions,
  ingredients,
  onClick,
}) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative w-full h-48">
        <img
          src={thumbnail}
          alt={name}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-2">
          {category && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {category}
            </Badge>
          )}
          {area && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {area}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="default" className="bg-muted text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
        <CardDescription className="line-clamp-3">
          {instructions}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        {youtubeUrl && (
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-500 border-red-500 hover:bg-red-50"
            asChild
          >
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
              <Youtube className="h-4 w-4 mr-1" />
              Watch
            </a>
          </Button>
        )}
        <Button size="sm" onClick={onClick}>
          <ExternalLink className="h-4 w-4 mr-1" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;