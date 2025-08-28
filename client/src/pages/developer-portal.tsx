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
      <header className="bg-github-surface/95 backdrop-blur-sm border-b border-github-border sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 group">
                <Play className="text-github-green text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="text-xl font-bold bg-gradient-to-r from-white to-github-green bg-clip-text text-transparent">
                  Anirox
                </span>
              </div>
              <nav className="hidden md:flex space-x-6 ml-8">
                <button 
                  onClick={() => scrollToSection("overview")}
                  className={`text-github-text hover:text-github-blue transition-all duration-200 px-3 py-1 rounded-md relative ${
                    activeSection === "overview" ? "text-github-blue bg-github-blue/10" : ""
                  }`}
                  data-testid="nav-overview"
                >
                  Genel Bakış
                </button>
                <button 
                  onClick={() => scrollToSection("docs")}
                  className={`text-github-text hover:text-github-blue transition-all duration-200 px-3 py-1 rounded-md relative ${
                    activeSection === "docs" ? "text-github-blue bg-github-blue/10" : ""
                  }`}
                  data-testid="nav-docs"
                >
                  Dokümantasyon
                </button>
                <button 
                  onClick={() => scrollToSection("playground")}
                  className={`text-github-text hover:text-github-blue transition-all duration-200 px-3 py-1 rounded-md relative ${
                    activeSection === "playground" ? "text-github-blue bg-github-blue/10" : ""
                  }`}
                  data-testid="nav-playground"
                >
                  API Test Alanı
                </button>
                <button 
                  onClick={() => scrollToSection("examples")}
                  className={`text-github-text hover:text-github-blue transition-all duration-200 px-3 py-1 rounded-md relative ${
                    activeSection === "examples" ? "text-github-blue bg-github-blue/10" : ""
                  }`}
                  data-testid="nav-examples"
                >
                  Örnekler
                </button>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <a 
                  href="https://github.com/anirox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-github-text hover:text-github-green transition-colors p-2 rounded-md hover:bg-github-card"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/anirox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-github-text hover:text-github-blue transition-colors p-2 rounded-md hover:bg-github-card"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <Button 
                className="bg-gradient-to-r from-github-green to-github-green/80 hover:from-github-green/80 hover:to-github-green text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-github-green/20"
                data-testid="button-get-api-key"
              >
                <Key className="mr-2 h-4 w-4" />
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
          <section id="overview" className="relative bg-gradient-to-br from-github-surface via-github-card to-github-surface border-b border-github-border overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-github-green/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-github-blue/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-2/3 left-1/2 w-24 h-24 bg-github-green/10 rounded-full blur-lg animate-pulse delay-500"></div>
            </div>
            
            <div className="relative max-w-6xl mx-auto px-6 py-20">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-github-green/10 border border-github-green/20 mb-6">
                  <Badge className="bg-github-green text-white text-xs mr-2">YENİ</Badge>
                  <span className="text-sm text-github-green">v2.0 API Artık Kullanılabilir</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-github-text to-github-green bg-clip-text text-transparent leading-tight">
                  Güçlü Anime API
                  <span className="block bg-gradient-to-r from-github-green to-github-blue bg-clip-text text-transparent">
                    Geliştiriciler İçin
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-github-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
                  Ücretsiz, hızlı ve güvenilir API'miz aracılığıyla binlerce anime başlığına, bölümüne ve meta verilerine erişin. 
                  <span className="text-github-green font-semibold"> Anime uygulamaları ve servisleri oluşturmak için mükemmel.</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button 
                    className="bg-gradient-to-r from-github-green to-green-500 hover:from-github-green/80 hover:to-green-500/80 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-github-green/30 hover:scale-105"
                    onClick={() => scrollToSection("quick-start")}
                    data-testid="button-get-started"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Ücretsiz Başla
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-github-border hover:bg-github-card/50 text-github-text px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    onClick={() => scrollToSection("docs")}
                    data-testid="button-view-docs"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Dokümantasyonu Görüntüle
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-github-green mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
                    <div className="text-sm text-github-text-secondary">Anime Başlığı</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-github-blue mb-2 group-hover:scale-110 transition-transform duration-300">100ms</div>
                    <div className="text-sm text-github-text-secondary">Ortalama Yanıt Süresi</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold text-github-yellow mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                    <div className="text-sm text-github-text-secondary">Çalışma Süresi</div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Quick Start */}
            <section id="quick-start" className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-github-text mb-4">Hızlı Başlangıç</h2>
                <p className="text-lg text-github-text-secondary max-w-2xl mx-auto">
                  Sadece birkaç satır kod ile anime verilerine erişmeye başlayın
                </p>
              </div>
              
              <Card className="bg-gradient-to-br from-github-card to-github-surface border-github-border mb-8 overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-github-surface/50 border-b border-github-border">
                  <CardTitle className="text-github-text flex items-center">
                    <Play className="text-github-green mr-2 h-5 w-5" />
                    İlk API çağrınızı yapın
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-github-dark/50 p-6 font-mono text-sm overflow-x-auto relative">
                    <div className="absolute top-4 right-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-github-border text-github-text-secondary hover:text-github-green text-xs"
                        onClick={() => navigator.clipboard.writeText(`// Anime ara\nfetch('/api/search?q=naruto')\n  .then(response => response.json())\n  .then(data => console.log(data));`)}
                      >
                        Kopyala
                      </Button>
                    </div>
                    <pre className="text-github-text pr-20">
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
                <Card className="bg-gradient-to-br from-github-card to-github-surface border-github-border group hover:shadow-lg hover:shadow-github-green/10 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-lg bg-github-green/10 mr-4 group-hover:bg-github-green/20 transition-colors duration-300">
                        <Key className="text-github-green h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-semibold text-github-text">API Anahtarı Gerekmez</h4>
                    </div>
                    <p className="text-github-text-secondary">Kayıt olmadan hemen başlayın. API'miz cömert hız sınırlarıyla tamamen ücretsizdir.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-github-card to-github-surface border-github-border group hover:shadow-lg hover:shadow-github-blue/10 transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-lg bg-github-blue/10 mr-4 group-hover:bg-github-blue/20 transition-colors duration-300">
                        <Gauge className="text-github-blue h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-semibold text-github-text">Hızlı ve Güvenilir</h4>
                    </div>
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
      <footer className="bg-gradient-to-br from-github-surface to-github-card border-t border-github-border mt-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-github-green rounded-full blur-3xl -translate-x-32 translate-y-32"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-github-blue rounded-full blur-3xl translate-x-24 -translate-y-24"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6 group">
                <Play className="text-github-green text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="text-xl font-bold bg-gradient-to-r from-white to-github-green bg-clip-text text-transparent">
                  Anirox
                </span>
              </div>
              <p className="text-github-text-secondary mb-6 text-lg leading-relaxed">
                Geliştiriciler için ücretsiz ve güçlü anime API'si. 
                <span className="text-github-green"> Anime topluluğu için ❤️ ile yapıldı.</span>
              </p>
              <div className="flex space-x-3">
                <a 
                  href="https://github.com/anirox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-github-card border border-github-border text-github-text-secondary hover:text-github-green hover:border-github-green/30 transition-all duration-300 hover:scale-110"
                  data-testid="footer-github"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/anirox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-github-card border border-github-border text-github-text-secondary hover:text-github-blue hover:border-github-blue/30 transition-all duration-300 hover:scale-110"
                  data-testid="footer-twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://discord.gg/anirox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-github-card border border-github-border text-github-text-secondary hover:text-purple-400 hover:border-purple-400/30 transition-all duration-300 hover:scale-110"
                  data-testid="footer-discord"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-github-text font-semibold mb-6 text-lg">Kaynaklar</h4>
              <nav className="space-y-3">
                <button 
                  onClick={() => scrollToSection("docs")}
                  className="block text-github-text-secondary hover:text-github-green transition-all duration-200 hover:translate-x-1"
                  data-testid="footer-documentation"
                >
                  Dokümantasyon
                </button>
                <button 
                  onClick={() => scrollToSection("docs")}
                  className="block text-github-text-secondary hover:text-github-green transition-all duration-200 hover:translate-x-1"
                  data-testid="footer-api-reference"
                >
                  API Referansı
                </button>
                <button 
                  className="block text-github-text-secondary hover:text-github-green transition-all duration-200 hover:translate-x-1"
                  data-testid="footer-status"
                >
                  Durum Sayfası
                </button>
                <button 
                  className="block text-github-text-secondary hover:text-github-green transition-all duration-200 hover:translate-x-1"
                  data-testid="footer-changelog"
                >
                  Değişiklik Günlüğü
                </button>
              </nav>
            </div>
            
            <div>
              <h4 className="text-github-text font-semibold mb-6 text-lg">Destek</h4>
              <nav className="space-y-3">
                <button 
                  className="block text-github-text-secondary hover:text-github-blue transition-all duration-200 hover:translate-x-1" 
                  data-testid="footer-help"
                >
                  Yardım Merkezi
                </button>
                <button 
                  className="block text-github-text-secondary hover:text-github-blue transition-all duration-200 hover:translate-x-1" 
                  data-testid="footer-contact"
                >
                  İletişim
                </button>
                <button 
                  className="block text-github-text-secondary hover:text-github-blue transition-all duration-200 hover:translate-x-1" 
                  data-testid="footer-issues"
                >
                  Sorun Bildir
                </button>
                <button 
                  className="block text-github-text-secondary hover:text-github-blue transition-all duration-200 hover:translate-x-1" 
                  data-testid="footer-terms"
                >
                  Kullanım Koşulları
                </button>
              </nav>
            </div>
          </div>
          
          <div className="border-t border-github-border/50 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-github-text-secondary text-center md:text-left mb-4 md:mb-0">
                © 2024 Anirox API. Tüm hakları saklıdır. 
                <span className="text-github-green"> Geliştiriciler için ❤️ ile yapıldı.</span>
              </p>
              <div className="flex items-center space-x-4 text-sm text-github-text-secondary">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-github-green rounded-full mr-2 animate-pulse"></div>
                  Tüm Sistemler Çalışıyor
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
