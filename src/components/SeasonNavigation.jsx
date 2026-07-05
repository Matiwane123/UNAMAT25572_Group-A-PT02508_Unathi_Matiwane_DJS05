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
  const selectedSeason = useMemo(() => {
    if (!Array.isArray(seasons) || seasons.length === 0) return null;

    const selectedId = String(
      activeSeason ?? seasons[0]?.season ?? seasons[0]?.id ?? "",
    );

    return (
      seasons.find(
        (season) =>
          String(season.season ?? season.id ?? "") === selectedId,
      ) ?? seasons[0] ?? null
    );
  }, [seasons, activeSeason]);

  const seasonOptions = Array.isArray(seasons) ? seasons : [];

  return (
    <div className="season-navigation">
      {seasonOptions.length > 0 ? (
        <>
          <label className="season-select-label">
            Season
            <select
              className="season-select"
              value={String(selectedSeason?.season ?? selectedSeason?.id ?? "")}
              onChange={(event) => onSelectSeason(event.target.value)}
            >
              {seasonOptions.map((season) => {
                const seasonNumber = season.season ?? season.id ?? "";
                const episodeCount = season.episodes?.length ?? 0;

                return (
                  <option
                    key={String(seasonNumber ?? season.title)}
                    value={String(seasonNumber)}
                  >
                    Season {seasonNumber} — {episodeCount} episode{episodeCount === 1 ? "" : "s"}
                  </option>
                );
              })}
            </select>
          </label>

          {selectedSeason ? (
            <div className="season-card">
              {selectedSeason.image ? (
                <img
                  className="season-card-image"
                  src={selectedSeason.image}
                  alt={selectedSeason.title}
                />
              ) : null}
              <div className="season-card-info">
                <h4>{selectedSeason.title || `Season ${selectedSeason.season ?? selectedSeason.id ?? ""}`}</h4>
                <p>
                  {selectedSeason.episodes?.length ?? 0} chapter{(selectedSeason.episodes?.length ?? 0) === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {Array.isArray(selectedSeason?.episodes) && selectedSeason.episodes.length > 0 ? (
        <div className="episode-list">
          {selectedSeason.episodes.map((episode, index) => {
            const episodeNumber = episode.episode ?? index + 1;
            const episodeTitle = episode.title ?? `Chapter ${episodeNumber}`;
            const episodeDescription = String(episode.description || "No description available.");

            return (
              <article
                key={String(episode.episode ?? episode.id ?? index)}
                className="episode-card"
              >
                {episode.image ? (
                  <img src={episode.image} alt={episodeTitle} />
                ) : null}
                <div>
                  <div className="episode-headline">
                    <span className="episode-number">
                      Chapter {episodeNumber}
                    </span>
                    <h4>{episodeTitle}</h4>
                  </div>
                  <p>
                    {episodeDescription.length > 140
                      ? `${episodeDescription.slice(0, 140).trim()}...`
                      : episodeDescription}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="status-banner">
          No episodes are available for this season.
        </div>
      )}
    </div>
  );
}
