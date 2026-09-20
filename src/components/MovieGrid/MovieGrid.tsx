import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <MovieCard movie={movie} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
