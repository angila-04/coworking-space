import { useNavigate } from "react-router-dom";

function SpaceCard({ id, image, name, location, hours, price }) {
  const navigate = useNavigate();

  return (
    <div className="awfis-card">
      <div
        className="awfis-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <span className="awfis-rating">★ 4.8</span>
      </div>

      <div className="awfis-content">
        <h3>{name}</h3>
        <p className="awfis-location">{location}</p>

        <div className="awfis-meta">
          <span className="hours">{hours}</span>
          <span className="price">₹ {price}/day</span>
        </div>

        <button
          className="awfis-cta"
          onClick={() => navigate(`/user/spaces/${id}`)}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}

export default SpaceCard;
