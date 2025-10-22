import { TechnologyFilter, TECHNOLOGY_FILTERS } from "@/types/github";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  selectedFilters: TechnologyFilter[];
  onFilterChange: (filter: TechnologyFilter) => void;
  onClearFilters: () => void;
  filterCounts: Record<TechnologyFilter, number>;
  showLabspaceOnly: boolean;
  onLabspaceFilterChange: (checked: boolean) => void;
  labspaceCount: number;
}

export const FilterSidebar = ({
  selectedFilters,
  onFilterChange,
  onClearFilters,
  filterCounts,
  showLabspaceOnly,
  onLabspaceFilterChange,
  labspaceCount,
}: FilterSidebarProps) => {
  const hasActiveFilters = selectedFilters.length > 0 || showLabspaceOnly;
  
  return (
    <aside className="w-full lg:w-64 bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              onClearFilters();
              onLabspaceFilterChange(false);
            }}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Labspaces Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-3">Filter by Labspaces</h3>
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2 flex-1">
            <Checkbox
              id="labspace"
              checked={showLabspaceOnly}
              onCheckedChange={onLabspaceFilterChange}
            />
            <label
              htmlFor="labspace"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Labspaces
            </label>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {labspaceCount}
          </Badge>
        </div>
      </div>

      <Separator className="my-4" />
      
      {/* Product Filters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Filter by Products</h3>
          {selectedFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          {TECHNOLOGY_FILTERS.map((filter) => (
            <div key={filter} className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2 flex-1">
                <Checkbox
                  id={filter}
                  checked={selectedFilters.includes(filter)}
                  onCheckedChange={() => onFilterChange(filter)}
                />
                <label
                  htmlFor={filter}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {filter}
                </label>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {filterCounts[filter] || 0}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
