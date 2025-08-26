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
    <aside className="w-80 bg-github-surface border-r border-github-border hidden lg:block sticky top-16 z-40" style={{height: 'calc(100vh - 4rem)'}}>
      <div className="p-6">
        <div className="space-y-6">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-github-text-secondary uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <nav className="space-y-2">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionClick(item.id)}
                    className={`w-full text-left transition-colors ${
                      activeSection === item.id 
                        ? 'text-github-blue' 
                        : 'text-github-text hover:text-github-blue'
                    }`}
                    data-testid={`sidebar-${item.id}`}
                  >
                    {item.method && (
                      <Badge 
                        className="bg-github-green text-white text-xs font-mono mr-2"
                        data-testid={`method-badge-${item.method.toLowerCase()}`}
                      >
                        {item.method}
                      </Badge>
                    )}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
