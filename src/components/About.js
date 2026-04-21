import User from "./user";

const About = () => {
  return (
    <div className="about-container">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>About UrbanEats</h1>
        <p>
          Delivering your favorite food and groceries at lightning speed,
          right to your doorstep.
        </p>
      </section>

      {/* Our Story */}
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          UrbanEats was built as a modern food delivery platform to simplify
          how people order food and groceries online. What started as a college
          project has now evolved into a full-stack web application focused on
          performance, usability, and real-world functionality.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide a fast, reliable, and seamless ordering
          experience with a wide variety of choices and an easy-to-use interface.
        </p>
      </section>

      {/* Features */}
      <section className="about-section">
        <h2>Why Choose Us</h2>
        <ul>
          <li>⚡ Fast delivery system</li>
          <li>🍔 Wide variety of food & groceries</li>
          <li>📱 Easy-to-use interface</li>
          <li>🔒 Secure authentication (JWT-based)</li>
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="about-section">
        <h2>Technology Stack</h2>
        <p>
          Built using MERN Stack — MongoDB, Express.js, React.js, and Node.js,
          with JWT authentication and modern frontend practices.
        </p>
      </section>

      {/* Developer Info */}
      <section className="about-section">
        <h2>Developer</h2>
        <User />
      </section>

    </div>
  );
};

export default About;