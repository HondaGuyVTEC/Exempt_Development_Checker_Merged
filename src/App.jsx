import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import RuleSearch from "./Pages/RuleSearch";
import Contactus from "./Pages/Contactus";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"; // optional if you want global footer
import ComplianceCheck1 from "./Pages/RuleSearch1";
import ComplianceCheck2 from "./Pages/RuleSearch2";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar should be inside BrowserRouter so Links work */}
      <Navbar />

      <Routes>
        <Route path="/custom_search" element={<Home />} />
        <Route path="/" element={<RuleSearch />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/custom_search1" element={<ComplianceCheck1/>} />
        <Route path="/custom_search2" element={<ComplianceCheck2/>} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>

      {/* You can keep Footer global if you want */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
