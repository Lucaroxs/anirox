import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Anime data types based on the PHP API structure
export interface AnimeSearchResult {
  id: number;
  name: string;
  name_english: string;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  episode_count: number;
  season_count: number;
  genres: string[];
  rating: number;
}

export interface EpisodeVideo {
  id: string;
  url: string;
  quality: string;
  extra: string;
  language: string;
  votes: {
    positive: number;
    negative: number;
  };
}

export interface EpisodeInfo {
  name: string;
  description: string;
  poster: string;
  release_date: string;
  sub_name: string;
}

export interface EpisodeVideoResponse {
  episode_info: EpisodeInfo | null;
  sources: Record<string, EpisodeVideo[]>;
  translator_points: any[];
  total_videos: number;
}

export interface AnimeInfoResponse {
  message: string;
  url: string;
  note: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Zod schemas for validation
export const searchQuerySchema = z.object({
  q: z.string().min(1, "Query parameter is required"),
});

export const episodeQuerySchema = z.object({
  titleId: z.string().min(1, "titleId parameter is required"),
  season: z.string().min(1, "season parameter is required"),
  episode: z.string().min(1, "episode parameter is required"),
});

export const animeInfoQuerySchema = z.object({
  titleId: z.string().min(1, "titleId parameter is required"),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type EpisodeQuery = z.infer<typeof episodeQuerySchema>;
export type AnimeInfoQuery = z.infer<typeof animeInfoQuerySchema>;

// Keep existing user schema for completeness
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
