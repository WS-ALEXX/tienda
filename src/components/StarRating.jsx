import "./StarRating.css";

export default function StarRating({ rating, reviews }) {
  const rounded = Math.round(rating);
  return (
    <div className="stars" aria-label={`Calificación ${rating} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`stars__icon ${n <= rounded ? "is-filled" : ""}`}>
          ★
        </span>
      ))}
      <span className="stars__value">{rating.toFixed(1)}</span>
      {reviews != null && <span className="stars__reviews">({reviews})</span>}
    </div>
  );
}
