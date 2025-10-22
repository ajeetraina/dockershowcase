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
  | 'Labspace'
  | 'Docker Scout'
  | 'DHI'
  | 'Testcontainers'
  | 'Compose Watch'
  | 'Docker Build Cloud'
  | 'Docker Cagent'
  | 'Docker MCP Toolkit'
  | 'Docker Model Runner';

export const TECHNOLOGY_FILTERS: TechnologyFilter[] = [
  'Labspace',
  'Docker Scout',
  'DHI',
  'Testcontainers',
  'Compose Watch',
  'Docker Build Cloud',
  'Docker Cagent',
  'Docker MCP Toolkit',
  'Docker Model Runner',
];

// Topic mapping for GitHub topics
export const TOPIC_MAPPING: Record<TechnologyFilter, string[]> = {
  'Labspace': ['labspace', 'workshop', 'learning'],
  'Docker Scout': ['docker-scout', 'scout', 'security', 'vulnerability'],
  'DHI': ['dhi', 'docker-hub', 'hub-tool'],
  'Testcontainers': ['testcontainers', 'testing'],
  'Compose Watch': ['compose-watch', 'docker-compose', 'compose', 'watch'],
  'Docker Build Cloud': ['docker-build-cloud', 'build-cloud', 'buildx'],
  'Docker Cagent': ['cagent', 'docker-cagent', 'agent'],
  'Docker MCP Toolkit': ['mcp', 'mcp-toolkit', 'model-context-protocol'],
  'Docker Model Runner': ['model-runner', 'ai', 'llm', 'genai'],
};

// Keyword mapping for searching in repo names and descriptions
export const KEYWORD_MAPPING: Record<TechnologyFilter, string[]> = {
  'Labspace': ['labspace', 'workshop', 'learning', 'tutorial', 'lab'],
  'Docker Scout': ['scout', 'security', 'vulnerability', 'cve', 'scanning'],
  'DHI': ['dhi', 'hub-tool', 'registry'],
  'Testcontainers': ['testcontainer', 'testing', 'test'],
  'Compose Watch': ['compose', 'watch', 'hot-reload', 'live-reload'],
  'Docker Build Cloud': ['build', 'buildx', 'buildkit', 'cloud'],
  'Docker Cagent': ['cagent', 'agent', 'coding-agent'],
  'Docker MCP Toolkit': ['mcp', 'model-context-protocol', 'claude'],
  'Docker Model Runner': ['model-runner', 'ai', 'llm', 'genai', 'chatbot', 'machine-learning', 'ml'],
};
