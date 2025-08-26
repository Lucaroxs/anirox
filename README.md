# Anirox API

🎌 **Geliştiriciler için ücretsiz ve güçlü anime API'si**

Anirox, anime severlerin ve geliştiricilerin ihtiyaçları için tasarlanmış, ücretsiz ve hızlı bir anime API servisidir. Binlerce anime başlığına, bölümlerine ve detaylı bilgilerine kolayca erişin.

## ✨ Özellikler

- 🔍 **Anime Arama**: Kapsamlı anime veritabanında hızlı arama
- 📺 **Bölüm Bilgileri**: Detaylı bölüm verileri ve video kaynakları
- 📊 **Anime Detayları**: Türler, puanlar ve açıklamalar
- 🌐 **CORS Desteği**: Tüm domainlerden erişim
- ⚡ **Hızlı Yanıt**: Ortalama 100ms altında yanıt süresi
- 🆓 **Ücretsiz**: API anahtarı gerektirmez
- 🎨 **Kolay Kullanım**: RESTful API tasarımı
- 📚 **Interaktif Dokümantasyon**: Test edilebilir API playground

## 🚀 Hızlı Başlangıç

### API Kullanımı

```bash
# Anime ara
curl "https://your-domain.com/api/search?q=naruto"

# Bölüm videoları al
curl "https://your-domain.com/api/episodes?titleId=1735&season=1&episode=1"

# Anime bilgilerini al
curl "https://your-domain.com/api/anime-info?titleId=1735"
```

### JavaScript Örneği

```javascript
// Anime arama
const searchAnime = async (query) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
};

// Kullanım
searchAnime('attack on titan').then(data => {
  console.log(data);
});
```

## 💻 Kurulum ve Çalıştırma

### Gereksinimler

- **Node.js** 18+ veya 20+
- **npm** veya **yarn**

### 🪟 Windows Kurulumu

1. **Node.js İndirin:**
   - [Node.js resmi sitesine](https://nodejs.org) gidin
   - LTS versiyonunu indirin ve kurun

2. **Projeyi Klonlayın:**
   ```cmd
   git clone https://github.com/yourusername/anirox.git
   cd anirox
   ```

3. **Bağımlılıkları Yükleyin:**
   ```cmd
   npm install
   ```

4. **Geliştirme Sunucusunu Başlatın:**
   ```cmd
   npm run dev
   ```

5. **Tarayıcınızda açın:** `http://localhost:5000`

### 🐧 Linux Kurulumu

1. **Node.js Kurun:**
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # CentOS/RHEL/Fedora
   curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
   sudo dnf install -y nodejs

   # Arch Linux
   sudo pacman -S nodejs npm
   ```

2. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/yourusername/anirox.git
   cd anirox
   ```

3. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

4. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

5. **Tarayıcınızda açın:** `http://localhost:5000`

### 🍎 macOS Kurulumu

1. **Homebrew Kurun (Yoksa):**
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Node.js Kurun:**
   ```bash
   brew install node
   ```

3. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/yourusername/anirox.git
   cd anirox
   ```

4. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

5. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

6. **Tarayıcınızda açın:** `http://localhost:5000`

## 📡 API Endpoints

### 🔍 Anime Ara
```http
GET /api/search?q={anime_adı}
```

**Örnek Yanıt:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1735,
      "name": "Attack on Titan",
      "name_english": "Shingeki no Kyojin",
      "description": "...",
      "poster": "https://...",
      "year": 2013,
      "episode_count": 25,
      "genres": ["Action", "Drama"],
      "rating": 9.0
    }
  ]
}
```

### 📺 Bölüm Videoları
```http
GET /api/episodes?titleId={anime_id}&season={sezon}&episode={bölüm}
```

### 📊 Anime Bilgileri
```http
GET /api/anime-info?titleId={anime_id}
```

## 🛠️ Geliştirme

### Proje Yapısı
```
anirox/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Ortak tipler ve şemalar
└── README.md
```

### Kullanılabilen Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Projeyi başlat
npm start
```

## 🚀 Production Dağıtımı

### Çevre Değişkenleri

```bash
# .env dosyası oluşturun
PORT=5000
NODE_ENV=production
```

### Docker ile Dağıtım

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📋 Hız Sınırları

| Limit | Değer |
|-------|-------|
| Saatlik İstek | 1,000 |
| Dakikalık İstek | 50 |
| Eş Zamanlı Bağlantı | 5 |

## 🐛 Sorun Giderme

### Sık Karşılaşılan Sorunlar

**Port 5000 kullanımda hatası:**
```bash
# Farklı port kullanın
PORT=3000 npm run dev
```

**Node.js versiyonu uyumsuz:**
```bash
# Node.js versiyonunu kontrol edin
node --version

# 18+ gerekli
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

Anime topluluğu için Lucaroxs ❤️ ile geliştirildi.

---

## 🌟 Destek

Proje faydalı olduysa ⭐ vermeyi unutmayın!

Sorularınız için [Issues](https://github.com/yourusername/anirox/issues) bölümünü kullanın.
