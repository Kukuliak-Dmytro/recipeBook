import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Badge } from '../components/ui/badge';
import { Button } from "../components/ui/button";
import { ExternalLink, Globe, Tag, Youtube } from "lucide-react";
import { Recipe } from "../utils/types/types";
import { Link } from 'react-router-dom';
const RecipeCard: React.FC<Recipe> = ({
  id,
  name,
  thumbnail,
  tags,
  youtubeUrl,
  category,
  area,
  instructions,
}) => {
  return (
    <Card className="h-full flex flex-col ">
      <div className="w-full h-48">
        <img
        className='object-cover w-full h-full rounded-t-md px-4'
          src={thumbnail}
          alt={name}
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
        <Link to={`/recipes/${id}`}>
            <Button size="sm" >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Details
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;