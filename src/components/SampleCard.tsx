import { GitHubRepo, TechnologyFilter, TOPIC_MAPPING } from "@/types/github";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Calendar, Copy, Terminal, Puzzle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

interface SampleCardProps {
  repo: GitHubRepo;
}

export const SampleCard = ({ repo }: SampleCardProps) => {
  const [copied, setCopied] = useState(false);

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
  
  // Check if this is a labspace repository
  const isLabspace = repo.name.startsWith('labspace-') || repo.topics.includes('labspace');
  const dockerComposeCommand = isLabspace 
    ? `docker compose -f oci://dockersamples/${repo.name} up -d`
    : null;
  
  const dockerExtensionUrl = isLabspace
    ? `https://open.docker.com/extensions/marketplace?extensionId=dockersamples/${repo.name}`
    : null;

  const handleCopyCommand = async () => {
    if (dockerComposeCommand) {
      await navigator.clipboard.writeText(dockerComposeCommand);
      setCopied(true);
      toast.success("Command copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          {isLabspace && (
            <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
              <Puzzle className="h-3 w-3 mr-1" />
              Labspace
            </Badge>
          )}
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
        
        {isLabspace && dockerComposeCommand && (
          <div className="mb-4 p-3 bg-muted rounded-md">
            <div className="flex items-start gap-2 mb-2">
              <Terminal className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground mb-1">Quick Start:</p>
                <code className="text-xs break-all block font-mono">
                  {dockerComposeCommand}
                </code>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={handleCopyCommand}
              >
                <Copy className={`h-3 w-3 ${copied ? 'text-green-500' : ''}`} />
              </Button>
            </div>
          </div>
        )}
        
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
      
      <CardFooter className="gap-2 flex-col sm:flex-row">
        {isLabspace && dockerExtensionUrl && (
          <Button asChild variant="default" className="w-full sm:flex-1">
            <a href={dockerExtensionUrl} target="_blank" rel="noopener noreferrer">
              <Puzzle className="mr-2 h-4 w-4" />
              Open in Docker
            </a>
          </Button>
        )}
        <Button asChild variant="outline" className="w-full sm:flex-1">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
