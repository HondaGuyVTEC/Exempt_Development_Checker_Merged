import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";

function ComplianceCheck() {
  const [devTypes, setDevTypes] = useState([]);
  const [zones, setZones] = useState([]);
  const [developmentType, setDevelopmentType] = useState("");
  const [zone, setZone] = useState("");
  const [length, setLength] = useState(4);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [setback, setSetback] = useState(1);
  const [floorArea, setFloorArea] = useState(16);
  const [locationDesc, setLocationDesc] = useState("Behind building line");

  const [result, setResult] = useState(null);
  const [rule, setRule] = useState(null);
  const [submittedPayload, setSubmittedPayload] = useState(null);

  // Load dev types + zones
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dev-types").then((res) => {
      setDevTypes(res.data.types || []);
    });
    axios.get("http://127.0.0.1:8000/zones").then((res) => {
      setZones(res.data.zones || []);
    });
  }, []);

  // Auto-calc floor area
  useEffect(() => {
    setFloorArea(length * width);
  }, [length, width]);

  // Load requirements when type+zone selected
  useEffect(() => {
    if (developmentType && zone) {
      axios
        .get(`http://127.0.0.1:8000/rules/${developmentType}/${zone}`)
        .then((res) => setRule(res.data));
    }
  }, [developmentType, zone]);

  const checkCompliance = () => {
    const payload = {
      development_type: developmentType,
      zone,
      length,
      width,
      height,
      setback,
      floor_area: floorArea,
      location_desc: locationDesc,
    };

    console.log("Sending payload:", payload);
    setSubmittedPayload(payload);

    axios
      .post("http://127.0.0.1:8000/check-compliance", payload)
      .then((res) => {
        console.log("Response:", res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.error("Error checking compliance:", err);
        setResult({
          compliant: false,
          issues: ["Server error or invalid request"],
          recommendation: "Please try again later.",
        });
      });
  };

  return (
    <div className="compliance-container">
      {/* Left: Form */}
      <div className="form-box">
        <h2> Development Compliance Checker</h2>

        <label>Development Type</label>
        <select
          value={developmentType}
          onChange={(e) => setDevelopmentType(e.target.value)}
        >
          <option value="">-- Select --</option>
          {devTypes.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label>Zone</label>
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="">-- Select --</option>
          {zones.map((z, i) => (
            <option key={i} value={z}>
              {z}
            </option>
          ))}
        </select>

        <h3>Dimensions</h3>
        <div className="grid">
          <div>
            <label>Length (m)</label>
            <input
              type="number"
              step="0.1"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label>Width (m)</label>
            <input
              type="number"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label>Height (m)</label>
            <input
              type="number"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label>Setback (m)</label>
            <input
              type="number"
              step="0.1"
              value={setback}
              onChange={(e) => setSetback(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <label>Floor Area (m²)</label>
        <input type="number" value={floorArea} readOnly />

        <label>Location Description</label>
        <input
          type="text"
          value={locationDesc}
          onChange={(e) => setLocationDesc(e.target.value)}
        />

        <button onClick={checkCompliance}>Check Compliance</button>
      </div>

      {/* Right side - Rule + Results */}
      <div className="info-box">
        <div className="result1 instructions-box">
          <h3>Instructions</h3>
          <ul>
            <li>1. Select development type and zone before entering dimensions.</li>
            <li>2. Fill in all required fields (length, width, height, setback).</li>
            <li>3. Click "Check Compliance" to view results and recommendations.</li>
          </ul>
        </div>

        {rule && (
          <div className="requirements">
            <h3> Requirements</h3>
            <p>
              <strong>Max Floor Area:</strong> {rule.max_floor_area_m2} m²
            </p>
            <p>
              <strong>Max Dimensions:</strong>{" "}
              {rule.dimensions.max_length_m} × {rule.dimensions.max_width_m} ×{" "}
              {rule.dimensions.max_height_m} m
            </p>
            <p>
              <strong>Min Setback:</strong> {rule.min_setback_m} m
            </p>
            <p>
              <strong>Location:</strong> {rule.location}
            </p>
          </div>
        )}

       

        {result && (
          <div
            className={`results ${result.compliant ? "success" : "error"}`}
          >
            {result.compliant ? (
              <h3> Compliant</h3>
            ) : (
              <h3> Non-Compliant</h3>
            )}

            {result.issues?.length > 0 && (
              <>
                <h4>Issues:</h4>
                <ul>
                  {result.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </>
            )}

            <h4>Recommendation:</h4>
            <p>{result.recommendation}</p>

            {/* Clause references with links */}
            {result.rule && result.rule.clause_refs && (
              <div className="clauses">
                <h4>Clause References</h4>
                <ul>
                  {result.rule.clause_refs.map((ref, i) => (
                    <li key={i}>
                      {ref}:{" "}
                      <a
                        href={result.rule.clause_links[i]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {result.rule.clause_links[i]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplianceCheck;
