import React from "react";
// import ProjectForm from "./ProjectForm";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {

  // const [isFormVisible, setFormVisible] = useState(false);

  // const handleFormToggle = () => {
  //   setFormVisible(!isFormVisible);
  // };

  // const handleCloseForm = () => {
  //   setFormVisible(false);
  // };

  return (
    <div className="">
      {/* Section 1: Home Page Hero Section */}
      <div className="relative bg-blue-50 h-screen flex flex-col items-center justify-center">
        <div className="text-center z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            CENTRALIZED HUB FOR MANAGING RESEARCH ACTIVITIES
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Seamless Project Submission, Tracking, and Detailed Overviews
          </p>
          <Link
           to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            View Dashboard
          </Link>
        </div>

        <div className="absolute top-10 left-10 h-20 w-20 md:h-40 md:w-40 rounded-full bg-blue-300 opacity-80" />
        <div className="absolute top-20 right-10 h-10 w-10 md:h-16 md:w-16 rounded-full bg-yellow-400 opacity-80" />
        <div className="absolute bottom-32 right-10 h-20 w-20 md:h-40 md:w-40 rounded-full bg-green-400 opacity-80" />
        <div className="absolute bottom-16 left-20 h-16 w-16 md:h-24 md:w-24 rounded-full bg-red-400 opacity-80" />
        <div className="absolute top-40 left-40 h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-600 opacity-80" />
      </div>

      {/* Section 2: Explore Research Projects Section */}
      {/* <div className="flex items-center justify-center bg-white">
        <section className="w-full">
          <div className="text-center md:mb-8 mt-4">
            <h2 className="md:text-5xl text-2xl font-bold text-gray-900 pt-10">
              EXPLORE CUTTING-EDGE RESEARCH PROJECTS
            </h2>
            <p className="text-xl text-gray-500 mt-4">
              Groundbreaking Discoveries
            </p>
            <p className="text-xl text-gray-500">Innovative Approaches</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-24 py-4">
            <div className="bg-black text-white p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Discover the Latest Research Breakthroughs Across Diverse Fields
              </h3>
              <p className="text-gray-300">
                Unlock Insights, Collaborate, and Secure Funding for Your Next
                Big Idea. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloremque qui porro, unde praesentium hic suscipit quae reiciendis id minima magnam repellat quas dolor cupiditate molestiae non? Quibusdam error ea earum sit sunt quisquam commodi!
              </p>
            </div>

            <div className="bg-black text-white p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Streamlined Project Management: From Concept to Completion
              </h3>
              <p className="text-gray-300">
                Elevate Your Research Journey with Our Comprehensive Platform.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, dolores nam enim quidem ipsam doloremque!
              </p>
            </div>

            <div className="bg-black text-white p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Transformative Research Initiatives Shaping the Future
              </h3>
              <p className="text-gray-300">
                Empowering Researchers, Driving Innovation: Explore our Dynamic
                Research Hub. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </section>
      </div> */}

      {/* Section 3: Revolutionize Research Section */}
      {/* <div className="flex items-center justify-center bg-white py-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full gap-10">
          <div className="flex flex-col justify-center items-start px-8 md:px-24">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              REVOLUTIONIZE RESEARCH WITH OUR CUTTING-EDGE PLATFORM
            </h2>
            <p className="text-lg md:text-xl text-gray-500 mt-4">
              Unlock New Frontiers of Knowledge: Discover, Collaborate, and
              Thrive in Our Research Ecosystem
            </p>
            <button
              onClick={handleFormToggle}
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md text-lg"
            >
              {isFormVisible ? "Close Form" : "Submit New Project"}
            </button>
          </div>

          <div className="flex items-center justify-center md:px-10 px-8">
            <img
              src="https://plus.unsplash.com/premium_vector-1720019760039-33c22abd3175?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXNzaWdubWVudHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Research Platform"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
                onClick={handleCloseForm}
              >
                &times;
              </button>
              <ProjectForm />
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default HomePage;
