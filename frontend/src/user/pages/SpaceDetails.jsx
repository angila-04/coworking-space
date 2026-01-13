import { useParams, useNavigate } from "react-router-dom";

import spaceMain from "../../assets/spaces/space-main.jpg";
import spaceDesk from "../../assets/spaces/space-desk.jpg";
import spaceLounge from "../../assets/spaces/space-lounge.jpg";

function SpaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* Hero Image */}
      <img src={spaceMain} className="hero-img" alt="Space" />

      <h1>Startup Hub</h1>
      <p>📍 Bangalore &nbsp; | &nbsp; ⏰ Open 24×7 &nbsp; | &nbsp; ⭐ 4.8</p>

      <h3>About this space</h3>
      <p>
        A premium coworking space designed for startups, freelancers,
        and remote teams. Calm environment, high-speed internet,
        and modern interiors.
      </p>

      <h3>Workspace Preview</h3>
      <div className="details-grid">
        <img src={spaceDesk} alt="Desk area" />
        <img src={spaceLounge} alt="Lounge area" />
      </div>

      <h3>Amenities</h3>
      <ul className="info-list">
        <li>✔ High-Speed WiFi</li>
        <li>✔ Power Backup</li>
        <li>✔ Meeting Rooms</li>
        <li>✔ Free Coffee & Snacks</li>
        <li>✔ 24×7 Security</li>
      </ul>

      <h3>Pricing</h3>
      <p>
        ₹499 / Day &nbsp; • &nbsp;
        ₹2999 / Week &nbsp; • &nbsp;
        ₹9999 / Month
      </p>

      <button
        className="btn primary"
        onClick={() => navigate("/user/booking")}
      >
        Book Now
      </button>
    </div>
  );
}

export default SpaceDetails;
