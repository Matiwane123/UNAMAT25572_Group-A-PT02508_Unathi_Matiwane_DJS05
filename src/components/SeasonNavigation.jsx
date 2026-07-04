import { useMemo } from "react";

/**
 * Render season toggles and episode listings.
 * @param {{seasons: Array, activeSeason: string|null, onSelectSeason: function}} props
 */
export default function SeasonNavigation({
  seasons,
  activeSeason,
  onSelectSeason,
}) {
  const selectedSeason = useMemo(
    () =>
      seasons.find((season) => season.id === activeSeason) ??
      seasons[0] ??
      null,
    [seasons, activeSeason],
  );

  return (
    <div className="season-navigation">
      <div className="season-list">
        {seasons.map((season) => (
          <button
            key={season.id}
            className={
              season.id === selectedSeason?.id
                ? "season-tab active"
                : "season-tab"
            }
            onClick={() => onSelectSeason(season.id)}
          >
            <span>{season.title}</span>
            <small>{season.episodes?.length ?? 0} episodes</small>
          </button>
        ))}
      </div>

      {selectedSeason ? (
        <div className="episode-list">
          {selectedSeason.episodes.map((episode) => (
            <article key={episode.id} className="episode-card">
              <img src={episode.image} alt={episode.title} />
              <div>
                <div className="episode-headline">
                  <span className="episode-number">Ep {episode.number}</span>
                  <h4>{episode.title}</h4>
                </div>
                <p>
                  {episode.description.length > 140
                    ? `${episode.description.slice(0, 140).trim()}...`
                    : episode.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="status-banner">
          No seasons are available for this show.
        </div>
      )}
    </div>
  );
}
