import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Exempt Planning Environmente. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
