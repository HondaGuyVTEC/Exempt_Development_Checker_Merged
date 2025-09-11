import DevelopmentApplications from "../Components/DevelopmentApplications"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"
import State from "../Components/Statistic"
import CallToAction from "../Components/vedio"

function Home() {

    return(
        <div>
            
            <Hero/>
            <State/>
            <DevelopmentApplications/>
            <CallToAction/>
            
        </div>
    )
 


}

export default Home