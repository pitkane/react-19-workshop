"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  characterId: number;
}

export function FavoriteButton({ characterId }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  // Load favorite state from localStorage on mount
  useEffect(() => {
    const favorites = localStorage.getItem("favoriteCharacters");
    if (favorites) {
      const favoritesArray = JSON.parse(favorites);
      setIsFavorited(favoritesArray.includes(characterId));
    }
  }, [characterId]);

  const toggleFavorite = () => {
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);

    // Persist to localStorage
    const favorites = localStorage.getItem("favoriteCharacters");
    let favoritesArray = favorites ? JSON.parse(favorites) : [];

    if (newFavoriteState) {
      // Add to favorites
      favoritesArray.push(characterId);
    } else {
      // Remove from favorites
      favoritesArray = favoritesArray.filter((id: number) => id !== characterId);
    }

    localStorage.setItem("favoriteCharacters", JSON.stringify(favoritesArray));
  };

  return (
    <Button variant={isFavorited ? "default" : "outline"} size="sm" onClick={toggleFavorite} className="mt-3 w-full">
      <Heart className={`mr-2 h-4 w-4 ${isFavorited ? "fill-current text-red-100" : ""}`} />
      {isFavorited ? "Favorited" : "Add to Favorites"}
    </Button>
  );
}
