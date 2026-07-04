import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchShowById, GENRE_TITLES } from "../services/podcastService.js";
import { formatDate } from "../utils/date.js";
import SeasonNavigation from "../components/SeasonNavigation.jsx";

export default function ShowDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSeason, setActiveSeason] = useState(null);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);
    setShow(null);

    fetchShowById(id)
      .then((data) => {
        if (!data || !data.title) {
          throw new Error("Show not found");
        }
        setShow(data);
        setActiveSeason(data.seasons?.[0]?.id ?? null);
      })
      .catch(() => setError("Show details could not be loaded."))
      .finally(() => setIsLoading(false));
  }, [id]);

  const genres = useMemo(() => {
    if (!show?.genre_ids) return [];
    return show.genre_ids.map((genreId) => GENRE_TITLES[genreId] ?? "Unknown");
  }, [show]);

  const goBack = () => {
    if (location.search) {
      navigate(`/${location.search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="page-layout">
      <header className="page-header">
        <button className="back-button" onClick={goBack}>
          ← Back to shows
        </button>
        <h1>Show Details</h1>
      </header>

      {isLoading && (
        <div className="status-banner">Loading show details...</div>
      )}
      {error && <div className="status-banner error">{error}</div>}

      {!isLoading && !error && show && (
        <article className="detail-card">
          <div className="detail-hero">
            <img src={show.image} alt={show.title} />
            <div className="detail-meta">
              <h2>{show.title}</h2>
              <p className="detail-subtitle">
                Updated {formatDate(show.updated)}
              </p>
              <div className="genre-tags">
                {genres.map((genre) => (
                  <span key={genre} className="genre-pill">
                    {genre}
                  </span>
                ))}
              </div>
              <p>{show.description}</p>
            </div>
          </div>

          <section className="season-section">
            <h3>Seasons & episodes</h3>
            <SeasonNavigation
              seasons={show.seasons ?? []}
              activeSeason={activeSeason}
              onSelectSeason={setActiveSeason}
            />
          </section>
        </article>
      )}
    </div>
  );
}
