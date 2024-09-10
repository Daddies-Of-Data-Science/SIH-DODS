import hero from "../../assets/StartupHero.png";
import Info from "./Info";

const Startup = () => {
  return (
    <div className="bg-blue-50 min-h-screen pt-[5%] font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Text Section */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Discover Innovative Startups
            </h1>
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Explore Now
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-100">
                View Startups
              </button>
            </div>
          </div>

          {/* Placeholder for Image Section */}
          <div className="lg:col-span-1 flex justify-center items-center mt-8 lg:mt-0 mb-10">
            <div className="relative w-full h-64 bg-gray-200 rounded-lg">
              <img src={hero} className=" object-cover" alt="therte should be image here"/>
            </div>
          </div>
        </div>
      </div>
      <Info />
    </div>
  );
};

export default Startup;
