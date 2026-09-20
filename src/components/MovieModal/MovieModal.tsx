import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const defaultImg =
    "https://dl-pro.com/wp-content/uploads/2021/04/default-image.png";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ✕
        </button>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.overview}>
            {movie.overview || "No description available."}
          </p>
          {movie.release_date && (
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          )}
          {movie.vote_average && (
            <p>
              <strong>Rating:</strong> {movie.vote_average} / 10
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
