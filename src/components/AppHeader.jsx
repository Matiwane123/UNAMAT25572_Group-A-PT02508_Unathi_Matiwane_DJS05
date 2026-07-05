import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AppHeader() {
  const auth = useAuth();

  return (
    <header className="page-header header-with-actions">
      <div>
        <h1>Podcast Shows</h1>
        <p>Browse podcast series, filter by genre, and open show detail pages.</p>
      </div>
      <div className="header-actions">
        {auth.isAuthenticated ? (
          <button className="logout-button" onClick={auth.logout}>
            Log out
          </button>
        ) : (
          <Link to="/login" className="login-link">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
