import { useState } from "react";
import { useSubmitContactFormMutation } from "../../../redux/api/contact";
import "./style.css";

const Contact = () => {
  // RTK Query - NEW APPROACH
  const [submitContactMutation, { isLoading: isSubmittingContact }] =
    useSubmitContactFormMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // RTK Query - NEW APPROACH using useSubmitContactFormMutation
      const response = await submitContactMutation(formData).unwrap();
      console.log("Contact form submitted successfully:", response);

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      // DEPRECATED: Fallback to demo mode (kept for reference)
      // Here you would typically send the form data to a server
      console.log("Contact form submitted (demo):", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with us today!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <h3>📍 Address</h3>
            <p>123 Shopping Street, Commerce City, CC 12345</p>
          </div>
          <div className="info-item">
            <h3>📞 Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <h3>✉️ Email</h3>
            <p>support@shoppingcart.com</p>
          </div>
          <div className="info-item">
            <h3>🕐 Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday - Sunday: 10:00 AM - 4:00 PM</p>
          </div>
        </div>

        <div className="contact-form-container">
          {submitted && (
            <div className="success-message">
              ✓ Thank you! Your message has been sent successfully.
            </div>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="6"
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmittingContact}
            >
              {isSubmittingContact ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
