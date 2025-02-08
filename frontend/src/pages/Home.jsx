import Features from "../components/Features";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import News from "../components/News"
import Footer from "../components/Footer";
function Home(){
    return(
        <>
        <Navbar/>
        <Hero/>
        <Stats/>
        <Features/>
        {/* <News/> */}
        <Footer/>
          </>
    )
}
export default Home;