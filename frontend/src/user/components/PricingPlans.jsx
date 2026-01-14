function PricingPlans() {
  return (
    <section>
      <h2>Flexible Pricing Plans</h2>
      <p>
        Simple, transparent pricing designed for individuals and growing teams.
      </p>

      <div className="pricing-grid">
        {/* BASIC */}
        <div className="pricing-card">
          <h3>Day Pass</h3>
          <p className="price">₹499</p>
          <p className="price-note">per day</p>

          <ul>
            <li>✔ Access to shared workspace</li>
            <li>✔ High-speed Wi-Fi</li>
            <li>✔ Tea & Coffee</li>
            <li>✔ Business hours access</li>
          </ul>

          <button className="btn secondary">Choose Plan</button>
        </div>

        {/* RECOMMENDED */}
        <div className="pricing-card featured">
          <span className="badge">Most Popular</span>

          <h3>Monthly Desk</h3>
          <p className="price">₹8,999</p>
          <p className="price-note">per month</p>

          <ul>
            <li>✔ Dedicated desk</li>
            <li>✔ 24×7 access</li>
            <li>✔ Meeting room credits</li>
            <li>✔ Premium amenities</li>
          </ul>

          <button className="btn primary">Get Started</button>
        </div>

        {/* TEAM */}
        <div className="pricing-card">
          <h3>Private Office</h3>
          <p className="price">Custom</p>
          <p className="price-note">for teams</p>

          <ul>
            <li>✔ Private cabins</li>
            <li>✔ Team branding</li>
            <li>✔ Dedicated support</li>
            <li>✔ Flexible contracts</li>
          </ul>

          <button className="btn secondary">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;
