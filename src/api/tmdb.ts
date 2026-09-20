import axios from "axios";
import { type FetchMoviesResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );
  return response.data;
};
