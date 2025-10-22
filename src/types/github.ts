export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  language: string | null;
  topics: string[];
}

export type TechnologyFilter = 
  | 'Docker Scout'
  | 'DHI'
  | 'Testcontainers'
  | 'Compose Watch'
  | 'Docker Build Cloud'
  | 'Docker Cagent'
  | 'Docker MCP Toolkit'
  | 'Docker Model Runner';

export const TECHNOLOGY_FILTERS: TechnologyFilter[] = [
  'Docker Scout',
  'DHI',
  'Testcontainers',
  'Compose Watch',
  'Docker Build Cloud',
  'Docker Cagent',
  'Docker MCP Toolkit',
  'Docker Model Runner',
];

export const TOPIC_MAPPING: Record<TechnologyFilter, string[]> = {
  'Docker Scout': ['docker-scout', 'scout'],
  'DHI': ['dhi', 'docker-hub'],
  'Testcontainers': ['testcontainers'],
  'Compose Watch': ['compose-watch', 'docker-compose'],
  'Docker Build Cloud': ['docker-build-cloud', 'build-cloud'],
  'Docker Cagent': ['cagent', 'docker-cagent'],
  'Docker MCP Toolkit': ['mcp', 'mcp-toolkit'],
  'Docker Model Runner': ['model-runner'],
};
