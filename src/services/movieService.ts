import axios from "axios";
import { type Movie } from "../types/movie";

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<FetchMoviesResponse> => {
  const { data } = await api.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
    },
  });

  return data;
};
