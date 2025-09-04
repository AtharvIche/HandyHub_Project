import React from 'react';
import './ContactUsPage.css'; // Correct path

const ContactUsPage = () => {
  return (
    <div className="contact-us-page container">
      <h1>Contact Us</h1>
      <p>
        Have questions or need assistance with HandyHub? We're here to help!
      </p>
      <p>
        For any inquiries regarding our services, partnerships, or technical support,
        please feel free to reach out.
      </p>

      <div className="contact-info">
        <h3>Get in Touch:</h3>
        <p>
          <strong>Email:</strong> adityaiche09@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> (+91) 8799988210 (Mon-Fri, 9 AM - 5 PM)
        </p>
        <p>
          <strong>Address:</strong> 444101 Param Asara Colony Akot
        </p>
      </div>
      <p style={{marginTop: "30px"}}>
        We aim to respond to all queries within 24-48 business hours.
      </p>
    </div>
  );
};

export default ContactUsPage;