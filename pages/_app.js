import "../styles/globals.css";
import Display from "./Components/Display";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";

function MyApp() {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <Hero />
      <Display />
    </div>
  );
}

export default MyApp;
