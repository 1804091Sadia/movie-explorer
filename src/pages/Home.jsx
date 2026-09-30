
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-small-title">
              WELCOME TO MOVIEEXPLORER
            </p>

            <h1>
              Discover Your Next
              <span> Favorite Show</span>
            </h1>

            <p className="hero-description">
              Explore thousands of movies and TV shows,
              discover new stories, and find something
              exciting to watch.
            </p>

            <Link to="/movies" className="hero-button">
              Explore Movies →
            </Link>
          </div>
        </div>
      </section>

      <section className="home-intro">
        <h2>Explore. Discover. Enjoy.</h2>

        <p>
          Search for your favorite shows, check ratings,
          explore genres, and learn more about the stories
          behind them.
        </p>
      </section>
    </main>
  );
}

export default Home;
