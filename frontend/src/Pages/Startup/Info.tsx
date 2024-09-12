import info1 from "../../assets/info_1png.png";
import info2 from "../../assets/info_2.png";
import info3 from "../../assets/info_3.png";
import info4 from "../../assets/info_4.png";
import info5 from "../../assets/info_5.png";
import info6 from "../../assets/info_6.png";
import  { useState } from 'react';
import { Link } from "react-router-dom";

function Info() {
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const SubmitForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Submit Your Startup</h2>
        <form className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Startup Name"
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description"
            rows={4}
          />
          <input className="w-full p-2 border rounded" placeholder="Website" />
          <input
            className="w-full p-2 border rounded"
            placeholder="Contact Email"
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </form>
        <button
          className="mt-4 text-gray-600"
          onClick={() => setShowSubmitForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
  return (
    <div className="bg-[#FEFEFF]">
      <div className=" bg-[#FEFEFF] text-center flex justify-center content-center">
        <div className="text-5xl p-[4%] lg:w-[70vw] font-zilla">
          Revolutionize Your Business with Innovative Startups
        </div>
      </div>
      <div className="flex flex-row mx-[20%] gap-4 justify-between h-[30vh]">
        <div className="w-[30%]">
          <div className="flex justify-center content-center h-[30px] mb-5">
            <img className="object-cover " src={info1} />
          </div>
          <div className="text-gray-500 text-center text-sm font-sans">
            Discover groundbreaking solutions across industries
          </div>
        </div>
        <div className="w-[25%]">
          <div className="flex justify-center h-[30px] content-center mb-5">
            <img className="object-cover " src={info2} />
          </div>
          <div className="text-gray-500 text-center text-sm font-sans">
            Explore cutting-edge products and services
          </div>
        </div>
        <div className="w-[30%]">
          <div className="flex justify-center content-center h-[30px] mb-5">
            <img className="object-cover " src={info3} />
          </div>
          <div className="text-gray-500 text-center text-sm font-sans">
            Connect with forward-thinking founders
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-none mx-[5%] gap-20 justify-between h-[80vh] ">
        <div className="bg-black rounded-xl h-[70vh] w-1/3 p-4">
          <div>
            <img className="py-2  h-[70px]" src={info4} />
          </div>
          <div className="text-white font-zilla text-6xl pr-10 pb-4">
            Gujarat Startups
          </div>
          <div className="text-gray-500 text-lg pb-4 ">
            Based in the heart of the city, our directory showcases the most
            promising startups shaping the future of New York. Discover
            innovative solutions, pioneering technologies, and visionary
            entrepreneurs that are transforming industries and driving
            progress..
          </div>
          <div className="text-gray-400 text-xs ">Learn more</div>
        </div>
        <div className="bg-black rounded-xl h-[70vh] w-1/3 p-4">
          <div>
            <img className="py-2  h-[70px]" src={info5} />
          </div>
          <div className="text-white font-zilla text-6xl pr-10 pb-4">
            GN Group Startups
          </div>
          <div className="text-gray-500 text-lg pb-4 overflow-hidden">
            Headquartered in the global business hub, our platform features a
            diverse array of startups from the GN Group ecosystem. Explore
            cutting-edge technologies, disruptive business models, and
            trailblazing founders that are redefining the landscape of
            innovation...
          </div>
          <div className="text-gray-400 text-xs z-10">Learn more</div>
        </div>
        <div className="bg-black rounded-xl h-[70vh] w-1/3 p-4">
          <div>
            <img className="py-2  h-[70px]" src={info6} />
          </div>
          <div className="text-white font-zilla text-6xl">
            Gujarat 
          </div>
          <div className="text-white font-zilla text-5xl pb-4">
          Council Startups 
          </div>
          
          <div className="text-gray-500 text-lg pb-4">
            BImmerse yourself in the vibrant startup ecosystem of New York City.
            Our platform showcases the most promising ventures, innovative
            products, and visionary leaders that are shaping the future of the
            city
          </div>
          <div className="text-gray-400 text-xs ">Learn more</div>
        </div>
      </div>
      <div className="h-[50vh] w-full bg-blue-50">
        <div className="text-center text-4xl font font-zilla pt-16 lg:px-[25vw]">
          Elevate Your Business with Innovative Solutions{" "}
        </div>
        <div className="mt-10 lg:px-[20vw] text-gray-600 text-center">
          Unlock the power of groundbreaking startups and innovative
          technologies to propel your business forward. Our comprehensive
          directory and detailed profiles provide the insights and connections
          you need to stay ahead of the curve and capitalize on emerging
          opportunities
        </div>
      </div>
      <div className="bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto space-y-8">


          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Explore Diverse Startups
              </h2>
              <p className="mb-4">
                Discover pioneering solutions across fintech, healthcare,
                sustainability, and AI. Connect with visionary founders
                transforming industries.
              </p>
              <button
                onClick={() => setShowSubmitForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit your Startup
              </button>
            </div>

            <div className=" p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Become an Investor Insider
              </h2>
              <p className="mb-4">
                Gain exclusive access to curated startup profiles, pitch decks,
                and investment opportunities.
              </p>
              <Link to="/investor">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Apply Now
              </button>
              </Link>
            </div>
          </div>

          {/* <div className="bg-navy-800 text-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              Unlock the Power of Innovation
            </h2>
            <div className="flex space-x-4">
              <button className="bg-white text-navy-800 px-4 py-2 rounded hover:bg-gray-200 flex items-center">
                <Activity className="mr-2" />
                Explore
              </button>
              <button className="bg-white text-navy-800 px-4 py-2 rounded hover:bg-gray-200 flex items-center">
                <DollarSign className="mr-2" />
                Invest
              </button>
              <button
                onClick={() => setShowSubmitForm(true)}
                className="bg-white text-navy-800 px-4 py-2 rounded hover:bg-gray-200 flex items-center"
              >
                <Send className="mr-2" />
                Submit Startup
              </button>
            </div>
          </div> */}

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              Stay Ahead of the Curve with Innovative Startups
            </h2>
            <p>
              Browse our comprehensive directory of cutting-edge startups and
              connect with the visionaries shaping the future of your industry.
            </p>
          </div>
        </div>

        {showSubmitForm && <SubmitForm />}
      </div>
      {/* <div className="text-5xl">
        WORK IN PROGRESS....
      </div> */}
    </div>
  );
}

export default Info;
