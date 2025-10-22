import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GitHubRepo, TechnologyFilter, TOPIC_MAPPING, KEYWORD_MAPPING, TECHNOLOGY_FILTERS } from "@/types/github";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SampleCard } from "@/components/SampleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const fetchDockerSamples = async (): Promise<GitHubRepo[]> => {
  const response = await fetch("https://api.github.com/orgs/dockersamples/repos?per_page=100");
  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }
  return response.json();
};

// Helper function to check if a repo matches a filter
const repoMatchesFilter = (repo: GitHubRepo, filter: TechnologyFilter): boolean => {
  const topics = TOPIC_MAPPING[filter];
  const keywords = KEYWORD_MAPPING[filter];
  
  // Check if any topics match
  const hasMatchingTopic = topics.some((topic) => 
    repo.topics.some((repoTopic) => 
      repoTopic.toLowerCase().includes(topic.toLowerCase())
    )
  );
  
  if (hasMatchingTopic) return true;
  
  // Check if any keywords match in name or description
  const repoText = `${repo.name} ${repo.description || ""}`.toLowerCase();
  const hasMatchingKeyword = keywords.some((keyword) => 
    repoText.includes(keyword.toLowerCase())
  );
  
  return hasMatchingKeyword;
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<TechnologyFilter[]>([]);

  const { data: repos, isLoading, error } = useQuery({
    queryKey: ["dockersamples"],
    queryFn: fetchDockerSamples,
  });

  const handleFilterChange = (filter: TechnologyFilter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const filteredRepos = useMemo(() => {
    if (!repos) return [];

    let filtered = repos;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply technology filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((repo) => {
        return selectedFilters.some((filter) => repoMatchesFilter(repo, filter));
      });
    }

    return filtered;
  }, [repos, searchQuery, selectedFilters]);

  const filterCounts = useMemo(() => {
    const counts: Record<TechnologyFilter, number> = {} as Record<TechnologyFilter, number>;
    
    TECHNOLOGY_FILTERS.forEach((filter) => {
      counts[filter] = repos?.filter((repo) => repoMatchesFilter(repo, filter)).length || 0;
    });
    
    return counts;
  }, [repos]);

  const FilterSidebarContent = () => (
    <FilterSidebar
      selectedFilters={selectedFilters}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
      filterCounts={filterCounts}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Docker Samples</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A collection of sample applications demonstrating Docker features and best practices. 
            Browse samples to learn how to build containerized applications.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Menu className="mr-2 h-4 w-4" />
                  Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <FilterSidebarContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebarContent />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {isLoading ? (
                  "Loading samples..."
                ) : (
                  `${filteredRepos.length} sample${filteredRepos.length !== 1 ? "s" : ""} found`
                )}
              </p>
            </div>

            {/* Error State */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Failed to load samples. Please try again later.
                </AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredRepos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No samples found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {/* Sample Cards Grid */}
            {!isLoading && filteredRepos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRepos.map((repo) => (
                  <SampleCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
