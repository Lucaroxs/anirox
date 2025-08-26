import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ApiEndpoint {
  name: string;
  path: string;
  method: string;
  params: Array<{
    name: string;
    required: boolean;
    description: string;
    defaultValue?: string;
  }>;
}

const endpoints: ApiEndpoint[] = [
  {
    name: "Anime Ara",
    path: "/api/search",
    method: "GET",
    params: [
      { name: "q", required: true, description: "The anime name to search for", defaultValue: "naruto" }
    ]
  },
  {
    name: "Bölüm Videolarını Al",
    path: "/api/episodes", 
    method: "GET",
    params: [
      { name: "titleId", required: true, description: "The anime ID from search results", defaultValue: "1735" },
      { name: "season", required: true, description: "Season number", defaultValue: "1" },
      { name: "episode", required: true, description: "Episode number", defaultValue: "1" }
    ]
  },
  {
    name: "Anime Bilgilerini Al",
    path: "/api/anime-info",
    method: "GET", 
    params: [
      { name: "titleId", required: true, description: "The anime ID from search results", defaultValue: "1735" }
    ]
  }
];

export default function ApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("0");
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [responseTime, setResponseTime] = useState<number>(0);
  const [statusCode, setStatusCode] = useState<number>(0);
  const { toast } = useToast();

  const currentEndpoint = endpoints[parseInt(selectedEndpoint)];

  // Initialize parameters when endpoint changes
  const handleEndpointChange = (value: string) => {
    setSelectedEndpoint(value);
    const endpoint = endpoints[parseInt(value)];
    const newParams: Record<string, string> = {};
    endpoint.params.forEach(param => {
      newParams[param.name] = param.defaultValue || '';
    });
    setParameters(newParams);
    setResponse(null);
  };

  // Update parameter value
  const handleParameterChange = (paramName: string, value: string) => {
    setParameters(prev => ({ ...prev, [paramName]: value }));
  };

  // Build URL with parameters
  const buildUrl = () => {
    if (!currentEndpoint) return '';
    const url = new URL(currentEndpoint.path, window.location.origin);
    Object.entries(parameters).forEach(([key, value]) => {
      if (value.trim()) {
        url.searchParams.append(key, value.trim());
      }
    });
    return url.toString();
  };

  // Make API request
  const handleSendRequest = async () => {
    if (!currentEndpoint) return;

    // Validate required parameters
    const missingParams = currentEndpoint.params.filter(param => 
      param.required && !parameters[param.name]?.trim()
    );
    
    if (missingParams.length > 0) {
      toast({
        title: "Missing Parameters",
        description: `Required parameters: ${missingParams.map(p => p.name).join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const startTime = Date.now();

    try {
      const url = buildUrl();
      const response = await fetch(url);
      const data = await response.json();
      
      setResponseTime(Date.now() - startTime);
      setStatusCode(response.status);
      setResponse(data);
      
      if (!response.ok) {
        toast({
          title: "API Error",
          description: data.error || `HTTP ${response.status}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      setResponse({ error: errorMsg });
      setStatusCode(500);
      setResponseTime(Date.now() - startTime);
      
      toast({
        title: "Request Failed",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize with first endpoint
  useState(() => {
    if (currentEndpoint && Object.keys(parameters).length === 0) {
      handleEndpointChange("0");
    }
  });

  return (
    <Card className="bg-github-card border-github-border overflow-hidden">
      <CardHeader className="bg-github-surface border-b border-github-border">
        <CardTitle className="text-github-text">API Uç Noktalarını Test Et</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Endpoint Selector */}
        <div className="mb-6">
          <Label className="text-github-text mb-2 block">Select Endpoint</Label>
          <Select value={selectedEndpoint} onValueChange={handleEndpointChange}>
            <SelectTrigger className="bg-github-dark border-github-border text-github-text" data-testid="select-endpoint">
              <SelectValue placeholder="Choose an endpoint" />
            </SelectTrigger>
            <SelectContent className="bg-github-dark border-github-border">
              {endpoints.map((endpoint, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {endpoint.method} {endpoint.path} - {endpoint.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Request Panel */}
          <div>
            <h4 className="text-lg font-semibold text-github-text mb-4">Request</h4>
            
            {/* URL */}
            <div className="mb-4">
              <Label className="text-github-text mb-2 block">URL</Label>
              <div className="flex">
                <Badge className="bg-github-green text-white rounded-r-none px-3 py-2 text-sm font-mono">
                  {currentEndpoint?.method || 'GET'}
                </Badge>
                <Input 
                  type="text" 
                  className="bg-github-dark border-github-border border-l-0 rounded-l-none text-github-text font-mono text-sm"
                  value={buildUrl()}
                  readOnly
                  data-testid="input-url"
                />
              </div>
            </div>

            {/* Parameters */}
            {currentEndpoint && (
              <div className="mb-4">
                <Label className="text-github-text mb-2 block">Parameters</Label>
                <div className="space-y-3">
                  {currentEndpoint.params.map((param) => (
                    <div key={param.name} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label className="text-github-text text-sm">{param.name}</Label>
                        {param.required && <Badge variant="destructive" className="text-xs">required</Badge>}
                      </div>
                      <Input
                        type="text"
                        placeholder={param.description}
                        className="bg-github-dark border-github-border text-github-text text-sm"
                        value={parameters[param.name] || ''}
                        onChange={(e) => handleParameterChange(param.name, e.target.value)}
                        data-testid={`input-param-${param.name}`}
                      />
                      <p className="text-xs text-github-text-secondary">{param.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              className="bg-github-green hover:bg-github-green/80 text-white"
              onClick={handleSendRequest}
              disabled={isLoading}
              data-testid="button-send-request"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Sending...' : 'Send Request'}
            </Button>
          </div>

          {/* Response Panel */}
          <div>
            <h4 className="text-lg font-semibold text-github-text mb-4">Response</h4>
            <div className="bg-github-dark border border-github-border rounded-lg p-4 min-h-[300px]">
              {response ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      className={`text-sm font-semibold ${
                        statusCode >= 200 && statusCode < 300 
                          ? 'bg-github-green text-white' 
                          : 'bg-github-red text-white'
                      }`}
                      data-testid="response-status"
                    >
                      {statusCode} {statusCode >= 200 && statusCode < 300 ? 'OK' : 'Error'}
                    </Badge>
                    <span className="text-github-text-secondary text-sm" data-testid="response-time">
                      Response time: {responseTime}ms
                    </span>
                  </div>
                  <pre className="text-sm text-github-text overflow-x-auto whitespace-pre-wrap" data-testid="response-body">
                    <code>{JSON.stringify(response, null, 2)}</code>
                  </pre>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-github-text-secondary">
                  <p>No response yet. Send a request to see the results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
