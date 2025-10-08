import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <h1>Welcome to the Guest List 🎉</h1>
      <p>
        We’re excited to celebrate with you. Please RSVP below or view the
        current guest list.
      </p>
      <div className="cta-row">
        <Link className="btn" to="/rsvp">
          RSVP Now
        </Link>
        <Link className="btn secondary" to="/guests">
          View Guests
        </Link>
      </div>
    </section>
  );
}
