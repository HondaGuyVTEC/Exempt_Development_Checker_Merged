import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Mail, Phone, MapPin, Clock, Building2 } from "lucide-react";
import "./Contactus.css"; 

function Contactus() {
  return (
    <>

      {/* Contact Page */}
      <div className="contact-page1">
        {/* Header */}
        <header className="header">
          <h1>Exempt Development 2008</h1>
          <p className="subtitle">Planning & Development Consultants</p>
          <p className="tagline">
            Expert guidance for your property development needs
          </p>
        </header>

        {/* Main Section */}
        <section className="main">
          {/* Form */}
          <div className="form-container">
            <h2>Get In Touch</h2>
            <p className="intro">
              Whether you need assistance with exempt development applications,
              planning advice, or general consultation, our expert team is here
              to help you navigate the complexities of property development.
            </p>
            <form>
              <div className="form-grid">
                <input type="text" placeholder="Full Name *" required />
                <input type="email" placeholder="Email Address *" required />
                <input type="text" placeholder="Phone Number" />
                <input type="text" placeholder="Property Address" />
              </div>

              <select required>
                <option value="">Select inquiry type</option>
                <option value="general">General Inquiry</option>
                <option value="planning">Planning Advice</option>
                <option value="da">DA Application</option>
                <option value="consultation">Consultation</option>
              </select>

              <textarea
                placeholder="Message *"
                rows="4"
                required
              ></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="info-container">
            <div className="info-card">
              <Building2 className="icon" />
              <div>
                <h3>Head Office</h3>
                <p>
                  Exempt Development 2008
                  <br />
                  Planning & Development Consultants
                </p>
              </div>
            </div>

            <div className="info-card">
              <MapPin className="icon" />
              <div>
                <h3>Office Address</h3>
                <p>
                  Level 1, 512 Pitt Street
                  <br />
                  Sydney NSW 2000
                  <br />
                  Australia
                </p>
              </div>
            </div>

            <div className="info-card">
              <Phone className="icon" />
              <div>
                <h3>Phone</h3>
                <p>
                  (02) 9000 0000
                  <br />
                  1300 EXEMPT (1300 393 678)
                </p>
              </div>
            </div>

            <div className="info-card">
              <Mail className="icon" />
              <div>
                <h3>Email</h3>
                <p>
                  info@exemptdev2008.com.au
                  <br />
                  planning@exemptdev2008.com.au
                </p>
              </div>
            </div>

            <div className="info-card">
              <Clock className="icon" />
              <div>
                <h3>Business Hours</h3>
                <p>
                  Mon - Fri: 9:00 AM - 5:30 PM
                  <br />
                  Sat: 10:00 AM - 2:00 PM
                  <br />
                  Sun: Closed
                  <br />
                  <span className="note">
                    Emergency consultations available
                  </span>
                </p>
              </div>
            </div>

            
          </div>
        </section>
      </div>

    
    </>
  );
}

export default Contactus;
