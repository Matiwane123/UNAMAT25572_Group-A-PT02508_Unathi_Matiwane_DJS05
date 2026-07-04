const API_BASE = "https://podcast-api.netlify.app";

export const GENRE_TITLES = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

/**
 * Fetch all show previews.
 * @returns {Promise<Array>} Promise resolving to preview show objects.
 */
export async function fetchShowPreviews() {
  const response = await fetch(`${API_BASE}`);
  if (!response.ok) {
    throw new Error("Failed to load show previews");
  }
  return response.json();
}

/**
 * Fetch a single show by id.
 * @param {string} id Show ID from route params.
 * @returns {Promise<Object>} Promise resolving to show details.
 */
export async function fetchShowById(id) {
  const response = await fetch(`${API_BASE}/id/${id}`);
  if (!response.ok) {
    throw new Error("Failed to load show details");
  }
  return response.json();
}
