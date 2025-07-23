import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, CreditCard } from 'lucide-react';
import { Game } from './GameCard';

interface CartProps {
  cartItems: Game[];
  onRemoveFromCart: (gameId: string) => void;
  onClearCart: () => void;
}

export const Cart = ({ cartItems, onRemoveFromCart, onClearCart }: CartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = cartItems.reduce((sum, game) => sum + game.price, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`Checkout successful! Total: $${totalPrice.toFixed(2)}`);
    onClearCart();
    setIsCheckingOut(false);
  };

  if (cartItems.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-6 text-center">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Your cart is empty</p>
          <p className="text-sm text-muted-foreground mt-1">Add some games to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
          </span>
          <Badge variant="secondary">{cartItems.length} items</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {cartItems.map((game) => (
            <div key={game.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <img 
                src={game.image} 
                alt={game.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{game.title}</h4>
                <p className="text-xs text-muted-foreground">{game.platform} • {game.type}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">${game.price}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFromCart(game.id)}
                  className="h-6 w-6 p-0 hover:bg-destructive/20"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-xl text-primary">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full btn-gaming"
            >
              {isCheckingOut ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
              ) : (
                <CreditCard className="w-4 h-4 mr-2" />
              )}
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClearCart}
              className="w-full"
              disabled={isCheckingOut}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};