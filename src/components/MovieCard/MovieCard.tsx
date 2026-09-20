import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  const defaultImg =
    "https://dl-pro.com/wp-content/uploads/2021/04/default-image.png";

  return (
    <div className={css.card} onClick={() => onSelect(movie)}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : defaultImg
        }
        alt={movie.title}
        className={css.image}
      />
      <div className={css.info}>
        <h3 className={css.title}>{movie.title}</h3>
      </div>
    </div>
  );
}
