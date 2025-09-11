import React from "react";
import "./components.css";

// Example: If images are stored in /src/assets/images/
import card1 from "../assets/images/card1.jpg";

const applications = [
  {
    id: 1,
    title: "Residential Extension Project",
    description:
      "Single-story rear extension complying with exempt development criteria under State Environmental Planning...",
    location: "Sydney CBD, NSW",
    date: "March 15, 2024",
    status: "Exempt",
    category: "Residential",
    image: card1,
  },
  {
    id: 2,
    title: "Commercial Renovation",
    description:
      "Internal fit-out for office space meeting all building code requirements and planning regulations.",
    location: "Melbourne, VIC",
    date: "March 10, 2024",
    status: "Approved",
    category: "Commercial",
    image: card1,
  },
  {
    id: 3,
    title: "Garden Studio Development",
    description:
      "Detached studio structure under 60sqm, compliant with local planning scheme provisions.",
    location: "Brisbane, QLD",
    date: "March 20, 2024",
    status: "Pending",
    category: "Ancillary",
    image: card1,
  },
];

function DevelopmentApplications() {
  return (
    <section className="applications">
      <h2>Recent Development Applications</h2>
      <p></p>
<br/>
      <div className="application-cards">
        {applications.map((app) => (
          <div className="card" key={app.id}>
            <div className="card-image">
              <img src={app.image} alt={app.title} />
              <span className={`status ${app.status.toLowerCase()}`}>
                {app.status}
              </span>
              <span className="category">{app.category}</span>
            </div>
            <div className="card-content">
              <h3>{app.title}</h3>
              <p>{app.description}</p>
              <div className="meta">
                <span>{app.location}</span>
                <span>Submitted: {app.date}</span>
              </div>
              <div className="card-actions">
                <button className="btn-primary">View Details</button>
                <button className="btn-secondary">Check Status</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DevelopmentApplications;
