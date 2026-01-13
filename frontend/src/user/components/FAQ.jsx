function FAQ() {
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-list">
        <details>
          <summary>What are the working hours?</summary>
          <p>
            Most of our coworking spaces are accessible 24×7. Some locations
            may have specific timings.
          </p>
        </details>

        <details>
          <summary>Can I book a space for one day?</summary>
          <p>
            Yes, we offer flexible day passes as well as monthly and custom
            plans.
          </p>
        </details>

        <details>
          <summary>Are meeting rooms included?</summary>
          <p>
            Meeting rooms are available and can be booked based on your plan.
          </p>
        </details>

        <details>
          <summary>Is parking available?</summary>
          <p>
            Yes, parking facilities are available at most of our locations.
          </p>
        </details>
      </div>

      {/* SUPPORT CTA */}
      <div className="support-cta">
        <h3>Still have questions?</h3>
        <p>Our support team is happy to help you.</p>
        <button className="btn primary">Contact Support</button>
      </div>
    </section>
  );
}

export default FAQ;
