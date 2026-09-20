import { useState, useEffect, type ComponentType } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
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

  const { data, isLoading, isFetching, isError, error, isSuccess } = useQuery({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: !!searchQuery,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === searchQuery) return;
    setSearchQuery(newQuery);
    setPage(1);
  };

  const totalPages = data?.total_pages || 0;
  const isSpinnerShowing = isLoading || isFetching;

  return (
    <div className={css.container}>
      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      <main className={css.main}>
        {isSpinnerShowing && <Loader />}
        {isError && <ErrorMessage message={error.message} />}

        {isSuccess && data && data.results.length > 0 && (
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

            <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
          </>
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
