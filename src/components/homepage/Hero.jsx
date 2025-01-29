import Image1 from "../../assets/best.jpg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50">
        <div className="max-w-7xl mx-auto relative z-10 text-white text-center py-20 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-36">
            The best way to inspire is often by example
          </h1>
          <p className="text-base md:text-lg mb-8">
            Get a head start in life by saving for the future.
          </p>
          <Button>
            <Link to="/form">APPLY NOW</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
