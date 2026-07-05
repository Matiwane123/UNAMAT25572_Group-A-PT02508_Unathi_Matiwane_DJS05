import { Link } from "react-router-dom";

export default function LoginPrompt() {
  return (
    <div className="status-banner">
      You must <Link to="/login">log in</Link> to view this page.
    </div>
  );
}
