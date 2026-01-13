import { useState } from "react";

import HeroSection from "../components/HeroSection";
import AboutSpacetrix from "../components/AboutSpacetrix";
import LocationOverview from "../components/LocationOverview";
import WhyChooseUs from "../components/WhyChooseUs";
import Amenities from "../components/Amenities";
import PricingPlans from "../components/PricingPlans";
import FAQ from "../components/FAQ";

import SpaceCard from "../components/SpaceCard";
import SpaceFilters from "../components/SpaceFilters";
import QuickViewModal from "../components/QuickViewModal";
import TrustMetrics from "../components/TrustMetrics";


// Images
import spaceMain from "../../assets/spaces/space-main.jpg";
import spaceDesk from "../../assets/spaces/space-desk.jpg";
import spaceLounge from "../../assets/spaces/space-lounge.jpg";

function Spaces() {
  /* ===============================
     FILTER STATE
  =============================== */
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    price: "",
  });

  /* ===============================
     QUICK VIEW STATE
  =============================== */
  const [quickViewSpace, setQuickViewSpace] = useState(null);

  /* ===============================
     (SIMULATED) LOADING STATE
     Ready for API later
  =============================== */
  const isLoading = false;

  /* ===============================
     SPACES DATA
  =============================== */
  const spaces = [
    {
      id: 1,
      name: "SPACETRIX MG Road",
      location: "MG Road, Thrissur",
      city: "MG Road",
      type: "Private",
      price: 599,
      hours: "Open 24×7",
      image: spaceMain,
    },
    {
      id: 2,
      name: "SPACETRIX HiLite Hub",
      location: "Puzhakkal, Thrissur",
      city: "Puzhakkal",
      type: "Dedicated",
      price: 699,
      hours: "8 AM – 10 PM",
      image: spaceDesk,
    },
    {
      id: 3,
      name: "SPACETRIX Round North",
      location: "Round North, Thrissur",
      city: "Round North",
      type: "Hot",
      price: 549,
      hours: "9 AM – 9 PM",
      image: spaceLounge,
    },
  ];

  /* ===============================
     FILTER LOGIC
  =============================== */
  const filteredSpaces = spaces.filter((space) => {
    return (
      (!filters.city || space.city === filters.city) &&
      (!filters.type || space.type === filters.type) &&
      (!filters.price || space.price <= Number(filters.price))
    );
  });

  return (
    <div className="page">
      {/* ===== 1️⃣ HERO ===== */}
      <HeroSection />

      {/* ===== 2️⃣ ABOUT ===== */}
      <AboutSpacetrix />
      <AboutSpacetrix />
<TrustMetrics />


      {/* ===== 3️⃣ LOCATION ===== */}
      <LocationOverview />

      {/* ===== 4️⃣ WHY CHOOSE ===== */}
      <WhyChooseUs />

      {/* ===== 5️⃣ AMENITIES ===== */}
      <Amenities />

      {/* ===== 6️⃣ PRICING ===== */}
      <PricingPlans />

      {/* ===== 7️⃣ SPACES ===== */}
      <section>
        <h1>Available Spaces in Thrissur</h1>
        <p>
          Discover premium coworking spaces across Thrissur, designed for
          startups, freelancers, and modern teams.
        </p>

        {/* Sticky Filter Bar */}
        <SpaceFilters filters={filters} setFilters={setFilters} />

        {/* Cards */}
        <div className="card-grid">
          {isLoading ? (
            <p className="empty">Loading spaces...</p>
          ) : filteredSpaces.length > 0 ? (
            filteredSpaces.map((space) => (
              <div
                key={space.id}
                onClick={() => setQuickViewSpace(space)}
                style={{ cursor: "pointer" }}
              >
                <SpaceCard
                  id={space.id}
                  image={space.image}
                  name={space.name}
                  location={space.location}
                  hours={space.hours}
                  price={space.price}
                />
              </div>
            ))
          ) : (
            <p className="empty">
              No spaces match your selected filters.
            </p>
          )}
        </div>
      </section>

      {/* ===== 8️⃣ FAQ ===== */}
      <FAQ />

      {/* ===== QUICK VIEW MODAL ===== */}
      <QuickViewModal
        space={quickViewSpace}
        onClose={() => setQuickViewSpace(null)}
      />
    </div>
  );
}

export default Spaces;
