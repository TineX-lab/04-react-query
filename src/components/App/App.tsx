import { useState, type ComponentType } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../service/movie-";
import type { Movie } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./App.module.css";

import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: !!searchQuery,
  });

  const handleSearch = (newQuery: string) => {
    if (newQuery === searchQuery) return;
    setSearchQuery(newQuery);
    setPage(1);
  };

  const totalPages = data?.total_pages || 0;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      <main className={css.main}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage message={error.message} />}

        {data && data.results.length > 0 && (
          <>
            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}

            <MovieGrid
              movies={data.results}
              onSelect={(movie) => setSelectedMovie(movie)}
            />
          </>
        )}

        {data && data.results.length === 0 && !isLoading && (
          <div className={css.noResults}>
            <span>❌ No movies found for your request.</span>
          </div>
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
