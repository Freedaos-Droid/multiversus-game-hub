import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Download, Disc } from 'lucide-react';

export interface Game {
  id: string;
  title: string;
  platform: 'PS5' | 'Xbox' | 'PC' | 'Nintendo Switch';
  type: 'Physical' | 'Digital';
  price: number;
  image: string;
  genre: string;
}

interface GameCardProps {
  game: Game;
  onAddToCart: (game: Game) => void;
}

export const GameCard = ({ game, onAddToCart }: GameCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
    onAddToCart(game);
    setIsLoading(false);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Xbox': return 'platform-xbox';
      case 'PS5': return 'platform-playstation';
      case 'Nintendo Switch': return 'platform-nintendo';
      case 'PC': return 'platform-pc';
      default: return '';
    }
  };

  return (
    <Card className="game-card overflow-hidden border-border/50 group">
      <div className="relative overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-secondary/90 backdrop-blur-sm">
            {game.type === 'Digital' ? <Download className="w-3 h-3 mr-1" /> : <Disc className="w-3 h-3 mr-1" />}
            {game.type}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className={`${getPlatformColor(game.platform)} bg-background/90 backdrop-blur-sm`}>
            {game.platform}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg leading-tight text-foreground">{game.title}</h3>
            <p className="text-sm text-muted-foreground">{game.genre}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${game.price}</span>
            <Button 
              onClick={handleAddToCart}
              disabled={isLoading}
              className="btn-gaming px-4 py-2 text-sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};