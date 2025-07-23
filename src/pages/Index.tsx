import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GameCard, Game } from '@/components/GameCard';
import { GameFilter, FilterOptions } from '@/components/GameFilter';
import { Cart } from '@/components/Cart';
import { ShoppingCart, Star, Users, Download } from 'lucide-react';

// Import all unique game images
import heroImage from '@/assets/hero-gaming.jpg';
import game1 from '@/assets/game-1.jpg';
import game2 from '@/assets/game-2.jpg';
import game3 from '@/assets/game-3.jpg';
import game4 from '@/assets/game-4.jpg';
import game5 from '@/assets/game-5.jpg';
import game6 from '@/assets/game-6.jpg';
import game7 from '@/assets/game-7.jpg';
import game8 from '@/assets/game-8.jpg';
import game9 from '@/assets/game-9.jpg';
import game10 from '@/assets/game-10.jpg';
import game11 from '@/assets/game-11.jpg';
import game12 from '@/assets/game-12.jpg';
import game13 from '@/assets/game-13.jpg';
import game14 from '@/assets/game-14.jpg';
import game15 from '@/assets/game-15.jpg';
import game16 from '@/assets/game-16.jpg';
import game17 from '@/assets/game-17.jpg';
import game18 from '@/assets/game-18.jpg';
import game19 from '@/assets/game-19.jpg';
import game20 from '@/assets/game-20.jpg';
import game21 from '@/assets/game-21.jpg';
import game22 from '@/assets/game-22.jpg';
import game23 from '@/assets/game-23.jpg';
import game24 from '@/assets/game-24.jpg';
import game25 from '@/assets/game-25.jpg';

// Game database with unique images for each game
const GAMES: Game[] = [
  { id: '1', title: 'Cyber Nexus', platform: 'PS5', type: 'Physical', price: 59.99, image: game1, genre: 'Action' },
  { id: '2', title: 'Mystic Realms', platform: 'Xbox', type: 'Digital', price: 49.99, image: game2, genre: 'RPG' },
  { id: '3', title: 'Neon Racers', platform: 'PC', type: 'Digital', price: 39.99, image: game3, genre: 'Racing' },
  { id: '4', title: 'Dead Zone', platform: 'PS5', type: 'Physical', price: 54.99, image: game4, genre: 'Horror' },
  { id: '5', title: 'Cosmic Explorer', platform: 'PC', type: 'Digital', price: 44.99, image: game5, genre: 'Space' },
  { id: '6', title: 'Stadium Champions', platform: 'Nintendo Switch', type: 'Physical', price: 49.99, image: game6, genre: 'Sports' },
  { id: '7', title: 'Shadow Wars', platform: 'Xbox', type: 'Digital', price: 59.99, image: game7, genre: 'Action' },
  { id: '8', title: 'Magic Kingdom', platform: 'Nintendo Switch', type: 'Physical', price: 39.99, image: game8, genre: 'Adventure' },
  { id: '9', title: 'Speed Demons', platform: 'PS5', type: 'Digital', price: 34.99, image: game9, genre: 'Racing' },
  { id: '10', title: 'Nightmare Manor', platform: 'PC', type: 'Digital', price: 29.99, image: game10, genre: 'Horror' },
  { id: '11', title: 'Galaxy Quest', platform: 'Xbox', type: 'Physical', price: 64.99, image: game11, genre: 'Space' },
  { id: '12', title: 'World Cup 2024', platform: 'PS5', type: 'Physical', price: 59.99, image: game12, genre: 'Sports' },
  { id: '13', title: 'Urban Combat', platform: 'PC', type: 'Digital', price: 45.99, image: game13, genre: 'Action' },
  { id: '14', title: 'Fantasy Legends', platform: 'Nintendo Switch', type: 'Digital', price: 42.99, image: game14, genre: 'RPG' },
  { id: '15', title: 'Turbo Highway', platform: 'Xbox', type: 'Physical', price: 37.99, image: game15, genre: 'Racing' },
  { id: '16', title: 'Terror House', platform: 'PS5', type: 'Digital', price: 32.99, image: game16, genre: 'Horror' },
  { id: '17', title: 'Star Voyager', platform: 'PC', type: 'Physical', price: 67.99, image: game17, genre: 'Space' },
  { id: '18', title: 'Tennis Masters', platform: 'Nintendo Switch', type: 'Digital', price: 24.99, image: game18, genre: 'Sports' },
  { id: '19', title: 'Battle Royale X', platform: 'Xbox', type: 'Digital', price: 19.99, image: game19, genre: 'Action' },
  { id: '20', title: 'Dragon Quest', platform: 'PS5', type: 'Physical', price: 69.99, image: game20, genre: 'RPG' },
  { id: '21', title: 'Drift Masters', platform: 'PC', type: 'Digital', price: 41.99, image: game21, genre: 'Racing' },
  { id: '22', title: 'Haunted Woods', platform: 'Nintendo Switch', type: 'Physical', price: 36.99, image: game22, genre: 'Horror' },
  { id: '23', title: 'Alien Worlds', platform: 'Xbox', type: 'Digital', price: 52.99, image: game23, genre: 'Space' },
  { id: '24', title: 'Basketball Pro', platform: 'PS5', type: 'Physical', price: 55.99, image: game24, genre: 'Sports' },
  { id: '25', title: 'Elite Forces', platform: 'PC', type: 'Digital', price: 48.99, image: game25, genre: 'Action' },
];

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({ platform: 'All', type: 'All' });
  const [cartItems, setCartItems] = useState<Game[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const platformMatch = filters.platform === 'All' || game.platform === filters.platform;
      const typeMatch = filters.type === 'All' || game.type === filters.type;
      return platformMatch && typeMatch;
    });
  }, [filters]);

  const handleAddToCart = (game: Game) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === game.id);
      if (existingItem) {
        return prev; // Don't add duplicates
      }
      return [...prev, game];
    });
  };

  const handleRemoveFromCart = (gameId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== gameId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Improved gradient overlay that matches the gaming theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Multiversus Game Store
            </h1>
            <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
              Discover the ultimate gaming universe with thousands of games across all platforms. 
              Get instant digital downloads or premium physical copies delivered to your door.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-accent" />
                <span>25+ Premium Games</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Download className="w-5 h-5 text-accent" />
                <span>Instant Downloads</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 text-accent" />
                <span>All Platforms</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="btn-gaming text-lg px-8 py-3"
                onClick={() => document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Games
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowCart(!showCart)}
                className="text-lg px-8 py-3 border-primary/30 hover:bg-primary/10"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart ({cartItems.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <GameFilter 
              filters={filters} 
              onFilterChange={setFilters}
              gameCount={filteredGames.length}
            />
            
            {showCart && (
              <Cart 
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={handleClearCart}
              />
            )}
          </div>

          {/* Games Grid */}
          <div className="lg:col-span-3">
            <div id="games-section" className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Game Library</h2>
              <p className="text-muted-foreground">
                Choose from our extensive collection of games across all major platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredGames.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">No games found</p>
                    <p>Try adjusting your filters to see more games</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Multiversus Game Store. All rights reserved.</p>
            <p className="text-sm mt-2">Your ultimate destination for gaming experiences</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
