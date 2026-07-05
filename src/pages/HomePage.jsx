import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchShowPreviews } from "../services/podcastService.js";
import { genres as genreOptions } from "../data.js";
import AppHeader from "../components/AppHeader.jsx";

const PAGE_SIZE = 12;

export default function HomePage() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const genre = searchParams.get("genre") ?? "";
    const page = Number(searchParams.get("page")) || 1;

    setSearchValue(search);
    setGenreFilter(genre);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchShowPreviews()
      .then((data) => setShows(data))
      .catch(() => setError("Unable to load shows. Please try again later."))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredShows = useMemo(() => {
    return shows
      .filter((show) => {
        const matchesSearch = show.title
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const matchesGenre = genreFilter
          ? show.genres?.includes(Number(genreFilter))
          : true;
        return matchesSearch && matchesGenre;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [shows, searchValue, genreFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredShows.length / PAGE_SIZE));
  const currentShows = filteredShows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const updateQuery = (params) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    updateQuery({ search: event.target.value, page: "1" });
  };

  const handleGenreChange = (event) => {
    setGenreFilter(event.target.value);
    updateQuery({ genre: event.target.value, page: "1" });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateQuery({ page: String(newPage) });
  };

  return (
    <div className="page-layout">
      <AppHeader />

      <section className="controls-card">
        <label>
          Search
          <input
            type="search"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search shows"
          />
        </label>

        <label>
          Genre
          <select value={genreFilter} onChange={handleGenreChange}>
            <option value="">All genres</option>
            {genreOptions.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.title}
              </option>
            ))}
          </select>
        </label>
      </section>

      {isLoading && <div className="status-banner">Loading shows...</div>}
      {error && <div className="status-banner error">{error}</div>}

      {!isLoading && !error && currentShows.length === 0 && (
        <div className="status-banner">
          No shows match your search and filter.
        </div>
      )}

      <section className="show-grid">
        {currentShows.map((show) => (
          <article key={show.id} className="show-card">
            <Link
              to={`/show/${show.id}${window.location.search}`}
              className="show-link"
            >
              <img src={show.image} alt={show.title} loading="lazy" />
              <div className="show-card-body">
                <h2>{show.title}</h2>
                <p>{show.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>

      <section className="pagination-bar">
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </section>
    </div>
  );
}
