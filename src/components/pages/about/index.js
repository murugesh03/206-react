import "./style.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Learn more about our shopping platform</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Shopping Cart, our mission is to provide the best online shopping
            experience with a curated selection of high-quality products at
            competitive prices. We believe in making shopping convenient,
            secure, and enjoyable for all our customers.
          </p>
        </section>

        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            Founded in 2020, Shopping Cart has grown to become a trusted
            e-commerce platform serving thousands of customers worldwide. Our
            dedicated team works tirelessly to bring you the latest products and
            the best customer service.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="features-list">
            <li>✓ Wide selection of quality products</li>
            <li>✓ Competitive and transparent pricing</li>
            <li>✓ Fast and reliable shipping</li>
            <li>✓ Secure payment options</li>
            <li>✓ Excellent customer support</li>
            <li>✓ Easy returns and exchanges</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🎯 Quality</h3>
              <p>We prioritize quality in every product we offer</p>
            </div>
            <div className="value-card">
              <h3>🤝 Integrity</h3>
              <p>We conduct business with honesty and transparency</p>
            </div>
            <div className="value-card">
              <h3>⚡ Innovation</h3>
              <p>We continuously improve our platform and services</p>
            </div>
            <div className="value-card">
              <h3>💖 Customer Focus</h3>
              <p>Your satisfaction is our top priority</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Get in Touch</h2>
          <p>
            Have questions? We'd love to hear from you! Contact us anytime at
            support@shoppingcart.com or visit our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
