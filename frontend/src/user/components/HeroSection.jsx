import heroImage from "../../assets/hero/hero-office.jpg";

function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay">
        <h1>Premium Office Spaces in Thrissur</h1>
        <p>
          Flexible, fully-managed coworking spaces designed for modern professionals
  and growing teams in Thrissur.
          
        </p>
        <button className="btn primary">Explore Spaces</button>
      </div>
    </section>
  );
}

export default HeroSection;
