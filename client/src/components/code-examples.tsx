import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const codeExamples = {
  javascript: {
    title: "JavaScript",
    code: `// Using fetch API
async function searchAnime(query) {
  try {
    const response = await fetch(
      \`/api/search?q=\${encodeURIComponent(query)}\`
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
}

// Usage
searchAnime('one piece')
  .then(data => {
    console.log('Found anime:', data.data);
  })
  .catch(error => {
    console.error('Search failed:', error);
  });

// Get episode videos
async function getEpisodeVideos(titleId, season, episode) {
  const response = await fetch(
    \`/api/episodes?titleId=\${titleId}&season=\${season}&episode=\${episode}\`
  );
  return response.json();
}`
  },
  python: {
    title: "Python",
    code: `import requests
import urllib.parse

class AnimeAPI:
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
    
    def search_anime(self, query):
        """Search for anime by name"""
        encoded_query = urllib.parse.quote(query)
        url = f"{self.base_url}/api/search?q={encoded_query}"
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error searching anime: {e}")
            raise
    
    def get_episode_videos(self, title_id, season, episode):
        """Get episode video links"""
        url = f"{self.base_url}/api/episodes"
        params = {
            'titleId': title_id,
            'season': season,
            'episode': episode
        }
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error getting episodes: {e}")
            raise

# Usage
api = AnimeAPI()

# Search for anime
result = api.search_anime("naruto")
if result['success']:
    print(f"Found {len(result['data'])} anime")
    for anime in result['data']:
        print(f"- {anime['name']} ({anime['year']})")

# Get episode videos
if result['data']:
    anime_id = result['data'][0]['id']
    episodes = api.get_episode_videos(anime_id, 1, 1)
    print(f"Episode sources: {list(episodes['data']['sources'].keys())}")`
  },
  curl: {
    title: "cURL",
    code: `# Search for anime
curl -X GET "http://localhost:5000/api/search?q=attack%20on%20titan" \\
     -H "Accept: application/json" \\
     -H "Content-Type: application/json"

# Get episode videos  
curl -X GET "http://localhost:5000/api/episodes?titleId=1735&season=1&episode=1" \\
     -H "Accept: application/json" \\
     -H "Content-Type: application/json"

# Get anime information
curl -X GET "http://localhost:5000/api/anime-info?titleId=1735" \\
     -H "Accept: application/json" \\
     -H "Content-Type: application/json"

# With error handling
curl -X GET "http://localhost:5000/api/search?q=nonexistent" \\
     -H "Accept: application/json" \\
     -w "HTTP Status: %{http_code}\\n" \\
     -s -S

# Using variables
ANIME_API="http://localhost:5000"
QUERY="one piece"
curl -X GET "$ANIME_API/api/search?q=$(echo $QUERY | sed 's/ /%20/g')" \\
     -H "Accept: application/json"`
  },
  php: {
    title: "PHP",
    code: `<?php
class AnimeAPIClient {
    private $baseUrl;
    
    public function __construct($baseUrl = 'http://localhost:5000') {
        $this->baseUrl = $baseUrl;
    }
    
    public function searchAnime($query) {
        $url = $this->baseUrl . '/api/search?' . http_build_query(['q' => $query]);
        return $this->makeRequest($url);
    }
    
    public function getEpisodeVideos($titleId, $season, $episode) {
        $params = [
            'titleId' => $titleId,
            'season' => $season,
            'episode' => $episode
        ];
        $url = $this->baseUrl . '/api/episodes?' . http_build_query($params);
        return $this->makeRequest($url);
    }
    
    public function getAnimeInfo($titleId) {
        $url = $this->baseUrl . '/api/anime-info?' . http_build_query(['titleId' => $titleId]);
        return $this->makeRequest($url);
    }
    
    private function makeRequest($url) {
        $context = stream_context_create([
            'http' => [
                'header' => [
                    'Accept: application/json',
                    'Content-Type: application/json'
                ],
                'timeout' => 30
            ]
        ]);
        
        $response = file_get_contents($url, false, $context);
        if ($response === false) {
            throw new Exception('Failed to make API request');
        }
        
        return json_decode($response, true);
    }
}

// Usage
try {
    $api = new AnimeAPIClient();
    
    // Search for anime
    $searchResult = $api->searchAnime('demon slayer');
    if ($searchResult['success']) {
        echo "Found " . count($searchResult['data']) . " anime\\n";
        foreach ($searchResult['data'] as $anime) {
            echo "- " . $anime['name'] . " (" . $anime['year'] . ")\\n";
        }
    }
    
    // Get episode videos
    if (!empty($searchResult['data'])) {
        $animeId = $searchResult['data'][0]['id'];
        $episodes = $api->getEpisodeVideos($animeId, 1, 1);
        
        if ($episodes['success']) {
            $sources = array_keys($episodes['data']['sources']);
            echo "Available sources: " . implode(', ', $sources) . "\\n";
        }
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}
?>`
  }
};

export default function CodeExamples() {
  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>("javascript");

  return (
    <Card className="bg-github-card border-github-border overflow-hidden">
      <div className="bg-github-surface border-b border-github-border">
        <div className="flex space-x-1 p-1">
          {Object.entries(codeExamples).map(([key, example]) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as keyof typeof codeExamples)}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                activeTab === key
                  ? 'bg-github-blue text-github-text' 
                  : 'bg-transparent text-github-text-secondary hover:text-github-text hover:bg-github-card'
              }`}
              data-testid={`tab-${key}`}
            >
              {example.title}
            </Button>
          ))}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="bg-github-dark rounded-lg p-4">
          <pre className="text-sm text-github-text overflow-x-auto">
            <code data-testid="code-content">{codeExamples[activeTab].code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
