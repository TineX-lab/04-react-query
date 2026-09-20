import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formAction = (formData: FormData) => {
    const query = formData.get("query") as string;
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      toast.error("Please enter a search query!");
      return;
    }

    onSubmit(normalizedQuery);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className={css.logo}
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={formAction}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
