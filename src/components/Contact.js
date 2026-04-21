import { useState } from "react";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    alert("Message sent successfully!");
    
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="contact-container">

      {/* Header */}
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Reach out for any queries or feedback.</p>

      <div className="contact-content">

        {/* Left Side - Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>📍 Ahmedabad, Gujarat</p>
          <p>📞 +91 XXXXX XXXXX</p>
          <p>📧 support@urbaneats.com</p>
          <p>🕒 9 AM – 10 PM</p>
        </div>

        {/* Right Side - Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>

      </div>
    </div>
  );
};

export default Contact;