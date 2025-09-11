import React from "react";
import "./CallToAction.css";

function CallToAction() {
  return (
    <section className="cta-section">
      {/* Background video */}
      <video
        className="cta-video"
        src="/abc.mp4"   // ✅ correct path for public folder
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay content */}
      <div className="cta-overlay">
        <h2>Ready to Start Your Development Project?</h2>
        <p>
          Get expert guidance on planning regulations and ensure your project is compliant
        </p>
       
      </div>
    </section>
  );
}

export default CallToAction;
