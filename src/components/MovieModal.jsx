
function MovieModal({ movie, onClose }) {
  if (!movie) {
    return null;
  }

  const image =
    movie.image?.original ||
    movie.image?.medium ||
    "https://via.placeholder.com/800x450?text=No+Image";

  const rating = movie.rating?.average || "N/A";

  const year = movie.premiered
    ? new Date(movie.premiered).getFullYear()
    : "N/A";

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={image}
          alt={movie.name}
          className="modal-image"
        />

        <div className="modal-content">
          <h2>{movie.name}</h2>

          <div className="modal-meta">
            <span>⭐ Rating: {rating}</span>
            <span>📅 Release: {year}</span>
          </div>

          {movie.genres?.length > 0 && (
            <p>
              <strong>Genre:</strong>{" "}
              {movie.genres.join(", ")}
            </p>
          )}

          <div className="summary">
            <h3>Overview</h3>

            <div
              dangerouslySetInnerHTML={{
                __html:
                  movie.summary ||
                  "<p>No summary available.</p>",
              }}
            />
          </div>

          {movie.network?.name && (
            <p>
              <strong>Network:</strong>{" "}
              {movie.network.name}
            </p>
          )}

          <button
            className="close-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
