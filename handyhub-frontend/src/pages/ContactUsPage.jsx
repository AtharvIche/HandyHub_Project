// import React from "react";
// import { MapPin, Phone, Mail } from "lucide-react";
// import "./ContactUsPage.css";

// const ContactUsPage = () => {
//   return (
//     <div className="contact-us-page">
//       <h1 className="title">Contact Us</h1>
//       <p className="subtitle">
//         Have questions or need assistance with HandyHub? We're here to help!
//       </p>

//       <div className="contact-grid">
//         <div className="contact-card">
//           <MapPin className="icon" />
//           <h3>ADDRESS</h3>
//           <p>444101 Param Asara Colony Akot</p>
//         </div>

//         <div className="contact-card">
//           <Phone className="icon" />
//           <h3>PHONE</h3>
//           <p>(+91) 87999-88210</p>
//         </div>

//         <div className="contact-card">
//           <Mail className="icon" />
//           <h3>EMAIL</h3>
//           <p>adityaiche09@gmail.com</p>
//         </div>
//       </div>

//       <p className="response-time">
//         We aim to respond to all queries within 24-48 business hours.
//       </p>
//     </div>
//   );
// };

// export default ContactUsPage;


import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import "./ContactUsPage.css";

const ContactUsPage = () => {
  return (
    <div className="contact-us-page">
      {/* Title */}
      <h1 className="title">Contact Us</h1>
      <p className="subtitle">
        Have questions or need assistance with HandyHub? We're here to help!
      </p>

      {/* Contact Info Grid */}
      <div className="contact-grid">
        <div className="contact-card">
          <MapPin className="icon" />
          <h3>ADDRESS</h3>
          <p>444101 Param Asara Colony Akot</p>
        </div>

        <div className="contact-card">
          <Phone className="icon" />
          <h3>PHONE</h3>
          <p>(+91) 87999-88210</p>
        </div>

        <div className="contact-card">
          <Mail className="icon" />
          <h3>EMAIL</h3>
          <p>adityaiche09@gmail.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Google Map */}
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.6043146450774!2d77.0581!3d21.0950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd75f245f3d20db%3A0x123456789abcdef!2sAkot%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1693762000000!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Social Links */}
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <p className="response-time">
        We aim to respond to all queries within 24-48 business hours.
      </p>
    </div>
  );
};

export default ContactUsPage;
