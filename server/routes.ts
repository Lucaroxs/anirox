import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  searchQuerySchema, 
  episodeQuerySchema, 
  animeInfoQuerySchema,
  type ApiResponse,
  type AnimeSearchResult,
  type EpisodeVideoResponse,
  type AnimeInfoResponse
} from "@shared/schema";

class AnimeAPI {
  private baseUrl = 'https://animecix.tv/secure';
  private userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  async searchAnime(query: string, clientIp?: string): Promise<AnimeSearchResult[]> {
    const url = `${this.baseUrl}/search/${encodeURIComponent(query)}?type=&limit=8&provider=`;
    
    const response = await this.makeRequest(url, clientIp);
    const data = JSON.parse(response);
    
    if (!data || !data.results) {
      throw new Error('Anime bulunamadı');
    }
    
    const results: AnimeSearchResult[] = [];
    for (const anime of data.results) {
      results.push({
        id: anime.id,
        name: anime.name,
        name_english: anime.name_english || '',
        description: anime.description || '',
        poster: anime.poster || '',
        backdrop: anime.backdrop || '',
        year: anime.year || 0,
        episode_count: anime.episode_count || 0,
        season_count: anime.season_count || 1,
        genres: anime.genres ? anime.genres.map((g: any) => g.display_name) : [],
        rating: anime.tmdb_vote_average || 0
      });
    }
    
    return results;
  }

  async getEpisodeVideos(titleId: string, season: string, episode: string, clientIp?: string): Promise<EpisodeVideoResponse> {
    const url = `${this.baseUrl}/episode-videos-points?titleId=${titleId}&episode=${episode}&season=${season}`;
    
    const response = await this.makeRequest(url, clientIp);
    const data = JSON.parse(response);
    
    if (!data || !data.videos) {
      throw new Error('Video bulunamadı');
    }
    
    const sources: Record<string, any[]> = {};
    
    for (const video of data.videos) {
      const sourceName = video.name;
      const quality = video.quality || 'regular';
      const extra = video.extra || '';
      
      if (!sources[sourceName]) {
        sources[sourceName] = [];
      }
      
      sources[sourceName].push({
        id: video.id,
        url: video.url,
        quality: quality,
        extra: extra,
        language: video.language || 'tr',
        votes: {
          positive: video.positive_votes || 0,
          negative: video.negative_votes || 0
        }
      });
    }
    
    // Episode info
    let episodeInfo = null;
    if (data.episodeList && data.episodeList.length > 0) {
      const currentEpisode = data.episodeList.find((ep: any) => 
        ep.episode_number == episode && ep.season_number == season
      );
      
      if (currentEpisode) {
        episodeInfo = {
          name: currentEpisode.name || '',
          description: currentEpisode.description || '',
          poster: currentEpisode.poster || '',
          release_date: currentEpisode.release_date || '',
          sub_name: currentEpisode.sub_name || ''
        };
      }
    }
    
    return {
      episode_info: episodeInfo,
      sources: sources,
      translator_points: data.translatorPoints || [],
      total_videos: data.videos.length
    };
  }

  async getAnimeInfo(titleId: string, clientIp?: string): Promise<AnimeInfoResponse> {
    const url = `https://animecix.tv/titles/${titleId}`;
    
    const response = await this.makeRequest(url, clientIp);
    
    // Simple check if the response contains title information
    if (response.includes('title')) {
      return {
        message: 'Anime bilgileri mevcut',
        url: url,
        note: 'Detaylı bilgi için web sayfasını ziyaret edin'
      };
    }
    
    throw new Error('Anime bilgisi bulunamadı');
  }

  private async makeRequest(url: string, clientIp?: string): Promise<string> {
    // Eğer gerçek IP varsa onu kullan, yoksa varsayılan Türk IP'si
    const forwardedIp = clientIp || '88.250.140.151';
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.8',
        'Referer': 'https://animecix.tv/',
        'User-Agent': this.userAgent,
        'X-Forwarded-For': forwardedIp,
        'X-Real-IP': forwardedIp,
        'CF-IPCountry': 'TR',
        'Origin': 'https://animecix.tv'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Hatası: ${response.status}`);
    }

    return await response.text();
  }
}

const animeAPI = new AnimeAPI();

export async function registerRoutes(app: Express): Promise<Server> {
  // Search anime endpoint
  app.get('/api/search', async (req, res) => {
    try {
      const { q } = searchQuerySchema.parse(req.query);
      const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress;
      const result = await animeAPI.searchAnime(q, clientIp as string);
      
      const response: ApiResponse<AnimeSearchResult[]> = {
        success: true,
        data: result
      };
      
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
      res.status(400).json(response);
    }
  });

  // Get episode videos endpoint
  app.get('/api/episodes', async (req, res) => {
    try {
      const { titleId, season, episode } = episodeQuerySchema.parse(req.query);
      const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress;
      const result = await animeAPI.getEpisodeVideos(titleId, season, episode, clientIp as string);
      
      const response: ApiResponse<EpisodeVideoResponse> = {
        success: true,
        data: result
      };
      
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
      res.status(400).json(response);
    }
  });

  // Get anime info endpoint
  app.get('/api/anime-info', async (req, res) => {
    try {
      const { titleId } = animeInfoQuerySchema.parse(req.query);
      const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress;
      const result = await animeAPI.getAnimeInfo(titleId, clientIp as string);
      
      const response: ApiResponse<AnimeInfoResponse> = {
        success: true,
        data: result
      };
      
      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
      res.status(400).json(response);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
