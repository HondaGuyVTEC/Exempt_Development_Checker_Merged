import "./components.css";
function Hero(){
    return(
        <section className="hero">
        <div className="overlay">
          <h1>Exempt Planning Environment</h1>
          <p>Learn about exempt developments, guidelines, and compliance with our comprehensive planning resource hub.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Guidelines</button>
            <button className="btn-secondary">Submit Your Project</button>
          </div>
        </div>
      </section>
    )

}

export default Hero