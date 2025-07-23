import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface FilterOptions {
  platform: string;
  type: string;
}

interface GameFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  gameCount: number;
}

export const GameFilter = ({ filters, onFilterChange, gameCount }: GameFilterProps) => {
  const platforms = ['All', 'PS5', 'Xbox', 'PC', 'Nintendo Switch'];
  const types = ['All', 'Physical', 'Digital'];

  const handlePlatformChange = (platform: string) => {
    onFilterChange({ ...filters, platform });
  };

  const handleTypeChange = (type: string) => {
    onFilterChange({ ...filters, type });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filter Games</h2>
            <Badge variant="secondary" className="text-sm">
              {gameCount} games found
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Platform</h3>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform}
                    variant={filters.platform === platform ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePlatformChange(platform)}
                    className={filters.platform === platform ? "btn-gaming" : ""}
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Type</h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <Button
                    key={type}
                    variant={filters.type === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeChange(type)}
                    className={filters.type === type ? "btn-gaming" : ""}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};