import { GitHubRepo, TechnologyFilter, TOPIC_MAPPING } from "@/types/github";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SampleCardProps {
  repo: GitHubRepo;
}

export const SampleCard = ({ repo }: SampleCardProps) => {
  const getTechnologies = (): TechnologyFilter[] => {
    const technologies: TechnologyFilter[] = [];
    
    Object.entries(TOPIC_MAPPING).forEach(([tech, topics]) => {
      if (topics.some(topic => repo.topics.includes(topic))) {
        technologies.push(tech as TechnologyFilter);
      }
    });
    
    return technologies;
  };

  const technologies = getTechnologies();

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="line-clamp-1">
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {repo.name}
          </a>
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-[40px]">
          {repo.description || "No description available"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.length > 0 ? (
            technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))
          ) : (
            <Badge variant="outline">General</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          
          {repo.language && (
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>{repo.language}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
