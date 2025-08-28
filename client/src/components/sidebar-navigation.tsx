import { Badge } from "@/components/ui/badge";

interface SidebarNavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

interface NavigationItem {
  id: string;
  label: string;
  method?: string;
}

const navigationSections = [
  {
    title: "Başlangıç",
    items: [
      { id: "quick-start", label: "Hızlı Başlangıç" },
      { id: "authentication", label: "Kimlik Doğrulama" },
      { id: "rate-limits", label: "Hız Sınırları" }
    ] as NavigationItem[]
  },
  {
    title: "API Referansı", 
    items: [
      { id: "search-anime", label: "Anime Ara", method: "GET" },
      { id: "get-episodes", label: "Bölümleri Al", method: "GET" },
      { id: "anime-info", label: "Anime Bilgisi", method: "GET" }
    ] as NavigationItem[]
  },
  {
    title: "SDK'lar ve Araçlar",
    items: [
      { id: "examples", label: "Kod Örnekleri" },
      { id: "playground", label: "API Test Alanı" },
      { id: "postman", label: "Postman Koleksiyonu" }
    ] as NavigationItem[]
  }
];

export default function SidebarNavigation({ activeSection, onSectionClick }: SidebarNavigationProps) {
  return (
    <aside className="w-80 bg-gradient-to-b from-github-surface to-github-card border-r border-github-border hidden lg:block sticky top-16 z-40" style={{height: 'calc(100vh - 4rem)'}}>
      <div className="p-6">
        <div className="space-y-8">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-github-text-secondary uppercase tracking-wider mb-4 flex items-center">
                <div className="w-2 h-2 bg-github-green rounded-full mr-3"></div>
                {section.title}
              </h3>
              <nav className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionClick(item.id)}
                    className={`w-full text-left transition-all duration-200 p-3 rounded-lg group relative ${
                      activeSection === item.id 
                        ? 'text-github-blue bg-github-blue/10 border-l-4 border-github-blue' 
                        : 'text-github-text hover:text-github-blue hover:bg-github-card/50 hover:translate-x-1'
                    }`}
                    data-testid={`sidebar-${item.id}`}
                  >
                    <div className="flex items-center">
                      {item.method && (
                        <Badge 
                          className={`text-xs font-mono mr-3 transition-colors duration-200 ${
                            item.method === 'GET' 
                              ? 'bg-github-green text-white' 
                              : item.method === 'POST' 
                              ? 'bg-github-blue text-white'
                              : 'bg-github-yellow text-black'
                          }`}
                          data-testid={`method-badge-${item.method.toLowerCase()}`}
                        >
                          {item.method}
                        </Badge>
                      )}
                      <span className="flex-1">{item.label}</span>
                      {activeSection === item.id && (
                        <div className="w-2 h-2 bg-github-blue rounded-full animate-pulse"></div>
                      )}
                    </div>
                    {activeSection !== item.id && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-github-blue rounded-full transition-all duration-200 group-hover:h-6"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>
        
        {/* Bottom section with additional info */}
        <div className="mt-8 p-4 rounded-lg bg-github-card/30 border border-github-border/50">
          <div className="text-xs text-github-text-secondary space-y-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-github-green rounded-full mr-2 animate-pulse"></div>
              <span>API Durumu: Çalışıyor</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-github-blue rounded-full mr-2"></div>
              <span>Yanıt Süresi: ~95ms</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
