import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Rocket, Key, Gauge, Github, Twitter, MessageCircle } from "lucide-react";
import SidebarNavigation from "@/components/sidebar-navigation";
import ApiPlayground from "@/components/api-playground";
import CodeExamples from "@/components/code-examples";

export default function DeveloperPortal() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      {/* Header */}
      <header className="bg-github-surface border-b border-github-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Play className="text-github-green text-2xl" />
                <span className="text-xl font-bold">Anirox</span>
              </div>
              <nav className="hidden md:flex space-x-6 ml-8">
                <button 
                  onClick={() => scrollToSection("overview")}
                  className="text-github-text hover:text-github-blue transition-colors"
                  data-testid="nav-overview"
                >
                  Genel Bakış
                </button>
                <button 
                  onClick={() => scrollToSection("docs")}
                  className="text-github-text hover:text-github-blue transition-colors"
                  data-testid="nav-docs"
                >
                  Dokümantasyon
                </button>
                <button 
                  onClick={() => scrollToSection("playground")}
                  className="text-github-text hover:text-github-blue transition-colors"
                  data-testid="nav-playground"
                >
                  API Test Alanı
                </button>
                <button 
                  onClick={() => scrollToSection("examples")}
                  className="text-github-text hover:text-github-blue transition-colors"
                  data-testid="nav-examples"
                >
                  Örnekler
                </button>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-github-green hover:bg-github-green/80 text-white"
                data-testid="button-get-api-key"
              >
                API Anahtarı Al
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <SidebarNavigation activeSection={activeSection} onSectionClick={scrollToSection} />

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Hero Section */}
          <section id="overview" className="bg-gradient-to-r from-github-surface to-github-card border-b border-github-border">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-github-text mb-6">
                  Güçlü Anime API
                  <span className="block text-github-green">Geliştiriciler İçin</span>
                </h1>
                <p className="text-xl text-github-text-secondary max-w-2xl mx-auto mb-8">
                  Ücretsiz, hızlı ve güvenilir API'miz aracılığıyla binlerce anime başlığına, bölümüne ve meta verilerine erişin. Anime uygulamaları ve servisleri oluşturmak için mükemmel.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-github-green hover:bg-github-green/80 text-white px-8 py-3"
                    onClick={() => scrollToSection("quick-start")}
                    data-testid="button-get-started"
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    Ücretsiz Başla
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-github-border hover:bg-github-card text-github-text px-8 py-3"
                    onClick={() => scrollToSection("docs")}
                    data-testid="button-view-docs"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Dokümantasyonu Görüntüle
                  </Button>
                </div>
              </div>
            </div>
          </section>


          <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Quick Start */}
            <section id="quick-start" className="mb-16">
              <h2 className="text-3xl font-bold text-github-text mb-6">Hızlı Başlangıç</h2>
              <Card className="bg-github-card border-github-border mb-8">
                <CardHeader>
                  <CardTitle className="text-github-text">İlk API çağrınızı yapın</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-github-dark rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-github-text">
                      <code>
{`// Anime ara
fetch('/api/search?q=naruto')
  .then(response => response.json())
  .then(data => console.log(data));`}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-github-card border-github-border">
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold text-github-text mb-3 flex items-center">
                      <Key className="text-github-green mr-2" />
                      API Anahtarı Gerekmez
                    </h4>
                    <p className="text-github-text-secondary">Kayıt olmadan hemen başlayın. API'miz cömert hız sınırlarıyla tamamen ücretsizdir.</p>
                  </CardContent>
                </Card>
                <Card className="bg-github-card border-github-border">
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold text-github-text mb-3 flex items-center">
                      <Gauge className="text-github-blue mr-2" />
                      Hızlı ve Güvenilir
                    </h4>
                    <p className="text-github-text-secondary">Modern altyapı ve global CDN ile oluşturuldu. Dünya genelinde ortalama yanıt süresi 100ms altında.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* API Playground */}
            <section id="playground" className="mb-16">
              <h2 className="text-3xl font-bold text-github-text mb-6">API Test Alanı</h2>
              <ApiPlayground />
            </section>

            {/* API Documentation */}
            <section id="docs" className="mb-16">
              <h2 className="text-3xl font-bold text-github-text mb-6">API Dokümantasyonu</h2>
              
              {/* Search Endpoint */}
              <div id="search-anime" className="mb-12">
                <Card className="bg-github-card border-github-border overflow-hidden">
                  <CardHeader className="bg-github-surface border-b border-github-border">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-github-green text-white">GET</Badge>
                      <CardTitle className="text-github-text">/api/search</CardTitle>
                    </div>
                    <p className="text-github-text-secondary mt-2">İsme göre anime ara</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-github-text mb-4">Parameters</h4>
                        <Card className="border-github-border mb-6">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <code className="text-sm text-github-green">q</code>
                              <Badge variant="destructive" className="text-xs">required</Badge>
                            </div>
                            <p className="text-sm text-github-text-secondary">The anime name to search for</p>
                          </CardContent>
                        </Card>

                        <h4 className="text-lg font-semibold text-github-text mb-4">Example Request</h4>
                        <div className="bg-github-dark rounded-lg p-4">
                          <pre className="text-sm text-github-text"><code>GET /api/search?q=attack%20on%20titan</code></pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-github-text mb-4">Response Schema</h4>
                        <div className="bg-github-dark rounded-lg p-4">
                          <pre className="text-sm text-github-text overflow-x-auto">
{`{
  "success": boolean,
  "data": [
    {
      "id": integer,
      "name": string,
      "name_english": string,
      "description": string,
      "poster": string,
      "backdrop": string,
      "year": integer,
      "episode_count": integer,
      "genres": [string],
      "rating": number
    }
  ]
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Episodes Endpoint */}
              <div id="get-episodes" className="mb-12">
                <Card className="bg-github-card border-github-border overflow-hidden">
                  <CardHeader className="bg-github-surface border-b border-github-border">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-github-green text-white">GET</Badge>
                      <CardTitle className="text-github-text">/api/episodes</CardTitle>
                    </div>
                    <p className="text-github-text-secondary mt-2">Get episode video links and information</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-github-text mb-4">Parameters</h4>
                        <div className="space-y-4">
                          {[
                            { name: "titleId", desc: "The anime ID from search results" },
                            { name: "season", desc: "Season number (default: 1)" },
                            { name: "episode", desc: "Episode number" }
                          ].map((param) => (
                            <Card key={param.name} className="border-github-border">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <code className="text-sm text-github-green">{param.name}</code>
                                  <Badge variant="destructive" className="text-xs">required</Badge>
                                </div>
                                <p className="text-sm text-github-text-secondary">{param.desc}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-github-text mb-4">Response Schema</h4>
                        <div className="bg-github-dark rounded-lg p-4">
                          <pre className="text-sm text-github-text overflow-x-auto">
{`{
  "success": boolean,
  "data": {
    "episode_info": {
      "name": string,
      "description": string,
      "poster": string
    },
    "sources": {
      "provider_name": [
        {
          "id": string,
          "url": string,
          "quality": string,
          "language": string
        }
      ]
    }
  }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Anime Info Endpoint */}
              <div id="anime-info" className="mb-12">
                <Card className="bg-github-card border-github-border overflow-hidden">
                  <CardHeader className="bg-github-surface border-b border-github-border">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-github-green text-white">GET</Badge>
                      <CardTitle className="text-github-text">/api/anime-info</CardTitle>
                    </div>
                    <p className="text-github-text-secondary mt-2">Get detailed information about a specific anime</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-github-text mb-4">Parameters</h4>
                        <Card className="border-github-border mb-6">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <code className="text-sm text-github-green">titleId</code>
                              <Badge variant="destructive" className="text-xs">required</Badge>
                            </div>
                            <p className="text-sm text-github-text-secondary">The anime ID from search results</p>
                          </CardContent>
                        </Card>

                        <h4 className="text-lg font-semibold text-github-text mb-4">Example Request</h4>
                        <div className="bg-github-dark rounded-lg p-4">
                          <pre className="text-sm text-github-text"><code>GET /api/anime-info?titleId=1735</code></pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-github-text mb-4">Response Schema</h4>
                        <div className="bg-github-dark rounded-lg p-4">
                          <pre className="text-sm text-github-text overflow-x-auto">
{`{
  "success": boolean,
  "data": {
    "message": string,
    "url": string,
    "note": string
  }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Code Examples */}
            <section id="examples" className="mb-16">
              <h2 className="text-3xl font-bold text-github-text mb-6">Kod Örnekleri</h2>
              <CodeExamples />
            </section>

            {/* Rate Limiting */}
            <section id="rate-limits" className="mb-16">
              <h2 className="text-3xl font-bold text-github-text mb-6">Hız Sınırları</h2>
              <Card className="bg-github-card border-github-border">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-github-green mb-2" data-testid="rate-limit-hourly">1000</div>
                      <div className="text-github-text-secondary">Saatlik İstek</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-github-blue mb-2" data-testid="rate-limit-minute">50</div>
                      <div className="text-github-text-secondary">Dakikalık İstek</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-github-yellow mb-2" data-testid="rate-limit-concurrent">5</div>
                      <div className="text-github-text-secondary">Eş Zamanlı Bağlantı</div>
                    </div>
                  </div>
                  <div className="bg-github-dark rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-github-text mb-2">Hız Sınırı Başlıkları</h4>
                    <pre className="text-sm text-github-text-secondary">
{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-github-surface border-t border-github-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Play className="text-github-green text-2xl" />
                <span className="text-xl font-bold text-github-text">Anirox</span>
              </div>
              <p className="text-github-text-secondary mb-4">
                Geliştiriciler için ücretsiz ve güçlü anime API'si. Anime topluluğu için ❤️ ile yapıldı.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-github-text-secondary hover:text-github-text p-0"
                  data-testid="footer-github"
                >
                  <Github className="text-xl" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-github-text-secondary hover:text-github-text p-0"
                  data-testid="footer-twitter"
                >
                  <Twitter className="text-xl" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-github-text-secondary hover:text-github-text p-0"
                  data-testid="footer-discord"
                >
                  <MessageCircle className="text-xl" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-github-text font-semibold mb-4">Resources</h4>
              <nav className="space-y-2">
                <button 
                  onClick={() => scrollToSection("docs")}
                  className="block text-github-text-secondary hover:text-github-text transition-colors"
                  data-testid="footer-documentation"
                >
                  Documentation
                </button>
                <button 
                  onClick={() => scrollToSection("docs")}
                  className="block text-github-text-secondary hover:text-github-text transition-colors"
                  data-testid="footer-api-reference"
                >
                  API Reference
                </button>
                <button 
                  className="block text-github-text-secondary hover:text-github-text transition-colors"
                  data-testid="footer-status"
                >
                  Status Page
                </button>
                <button 
                  className="block text-github-text-secondary hover:text-github-text transition-colors"
                  data-testid="footer-changelog"
                >
                  Changelog
                </button>
              </nav>
            </div>
            <div>
              <h4 className="text-github-text font-semibold mb-4">Support</h4>
              <nav className="space-y-2">
                <button className="block text-github-text-secondary hover:text-github-text transition-colors" data-testid="footer-help">Help Center</button>
                <button className="block text-github-text-secondary hover:text-github-text transition-colors" data-testid="footer-contact">Contact Us</button>
                <button className="block text-github-text-secondary hover:text-github-text transition-colors" data-testid="footer-issues">Report Issues</button>
                <button className="block text-github-text-secondary hover:text-github-text transition-colors" data-testid="footer-terms">Terms of Service</button>
              </nav>
            </div>
          </div>
          <div className="border-t border-github-border pt-8 mt-8">
            <p className="text-github-text-secondary text-center">
              © 2024 AnimeAPI. All rights reserved. Made with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
