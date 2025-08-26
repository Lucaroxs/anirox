import { apiRequest } from "./queryClient";
import type { AnimeSearchResult, EpisodeVideoResponse, AnimeInfoResponse, ApiResponse } from "@shared/schema";

export class AnimeAPIClient {
  async searchAnime(query: string): Promise<ApiResponse<AnimeSearchResult[]>> {
    const response = await apiRequest("GET", `/api/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }

  async getEpisodeVideos(titleId: string, season: string, episode: string): Promise<ApiResponse<EpisodeVideoResponse>> {
    const params = new URLSearchParams({ titleId, season, episode });
    const response = await apiRequest("GET", `/api/episodes?${params.toString()}`);
    return response.json();
  }

  async getAnimeInfo(titleId: string): Promise<ApiResponse<AnimeInfoResponse>> {
    const response = await apiRequest("GET", `/api/anime-info?titleId=${titleId}`);
    return response.json();
  }
}

export const animeAPI = new AnimeAPIClient();
