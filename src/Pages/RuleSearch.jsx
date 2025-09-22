import React, { useState, useEffect } from "react";
import rulesData from "../assets/data/rules.json";

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

  // Load dev types + zones from rules data
  useEffect(() => {
    setDevTypes(Object.keys(rulesData));
    setZones(["RU4", "R1", "R2", "R3"]);
  }, []);

  // Auto-calc floor area
  useEffect(() => {
    setFloorArea(length * width);
  }, [length, width]);

  // Load requirements when type+zone selected
  useEffect(() => {
    if (developmentType && zone) {
      const selectedRule = rulesData[developmentType]?.[zone] || rulesData[developmentType]?.["default"];
      setRule(selectedRule);
    } else {
      setRule(null);
    }
  }, [developmentType, zone]);

  const checkCompliance = () => {
    const selectedRule = rulesData[developmentType]?.[zone] || rulesData[developmentType]?.["default"];

    if (!selectedRule) {
      setResult({
        compliant: false,
        issues: ["No rules found for the selected development type and zone."],
        recommendation: "Please select a valid combination of development type and zone.",
      });
      return;
    }

    const issues = [];

    // Check floor area
    const maxFloorArea = selectedRule.max_floor_area_m2;
    if (maxFloorArea && floorArea > maxFloorArea) {
      issues.push(`Floor area exceeds the maximum limit of ${maxFloorArea}m².`);
    }

    // Check height
    const maxHeight = selectedRule.dimensions.max_height_m;
    if (maxHeight && height > maxHeight) {
      issues.push(`Height exceeds the maximum limit of ${maxHeight}m.`);
    }

    // Check location
    if (locationDesc !== selectedRule.location) {
      issues.push(`Location does not match the required location '${selectedRule.location}'.`);
    }

    const isCompliant = issues.length === 0;
    let recommendation = "";

    if (isCompliant) {
      recommendation = `No issues found, your ${developmentType} is an exempt development.`;
    } else {
      recommendation = "Your development is non-compliant. You may need to adjust your plans or seek formal planning approval.";
    }

    setResult({
      compliant: isCompliant,
      issues: issues,
      recommendation: recommendation,
      rule: selectedRule,
    });
  };

  return (
    <>
      <div className="compliance-container">
        {/* Left: Form */}
        <div className="form-box">
          <h2>Development Compliance Checker</h2>

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
              <h3>Requirements</h3>
              <p>
                <strong>Max Floor Area:</strong> {rule.max_floor_area_m2} m²
              </p>
              <p>
                <strong>Max Dimensions:</strong>{" "}
                {rule.dimensions.max_length_m || "Any"} × {rule.dimensions.max_width_m || "Any"} ×{" "}
                {rule.dimensions.max_height_m} m
              </p>
              <p>
                <strong>Min Setback:</strong> {rule.min_setback_m || "Not Specified"} m
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
                <h3>Compliant</h3>
              ) : (
                <h3>Non-Compliant</h3>
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
    </>
  );
}

export default ComplianceCheck;