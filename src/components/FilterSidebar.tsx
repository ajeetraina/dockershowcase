import { TechnologyFilter, TECHNOLOGY_FILTERS } from "@/types/github";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  selectedFilters: TechnologyFilter[];
  onFilterChange: (filter: TechnologyFilter) => void;
  onClearFilters: () => void;
  filterCounts: Record<TechnologyFilter, number>;
}

export const FilterSidebar = ({
  selectedFilters,
  onFilterChange,
  onClearFilters,
  filterCounts,
}: FilterSidebarProps) => {
  return (
    <aside className="w-full lg:w-64 bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filter by Products</h2>
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
    </aside>
  );
};
