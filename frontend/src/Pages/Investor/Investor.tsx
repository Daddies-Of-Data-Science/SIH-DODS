import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import StartupFilterModal from '../../Components/investor/StartupFilter';

import { useNavigate } from 'react-router-dom';
import ViewInvestmentsModal from '../../Components/investor/ViewInvestmentsModal';


const Investor = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewInvestmentModalOpen, setIsViewInvestmentModalOpen] = useState(false);

  const investments = [
    { name: 'CareForAll', image: 'https://via.placeholder.com/150', description: 'Health' },
    { name: 'Pie21.io', image: 'https://via.placeholder.com/150' , description: 'FoodTech' },
    { name: 'FetchAI', image: 'https://via.placeholder.com/150', description: 'AI/ML' },
    { name: 'Kidnovate', image: 'https://via.placeholder.com/150', description: 'EdTech' },
    { name: 'Kang21', image: 'https://via.placeholder.com/150', description: 'Fitness' },
    { name: 'Reversify', image: 'https://via.placeholder.com/150', description: 'FinTech' },
  ];

  // const startups = [
  //   {
  //     "name": "InnoTech",
  //     "industry": "Technology",
  //     "valuation": 50000000,
  //     "fundingStage": "SERIES A"
  //   },
  //   {
  //     "name": "HealthifyMe",
  //     "industry": "Healthcare",
  //     "valuation": 120000000,
  //     "fundingStage": "SERIES B"
  //   },
  //   {
  //     "name": "AgroRise",
  //     "industry": "Agriculture",
  //     "valuation": 30000000,
  //     "fundingStage": "SEED"
  //   },
  //   {
  //     "name": "FinGrowth",
  //     "industry": "FinTech",
  //     "valuation": 150000000,
  //     "fundingStage": "SERIES C"
  //   },
  //   {
  //     "name": "EcoVentures",
  //     "industry": "Environment",
  //     "valuation": 70000000,
  //     "fundingStage": "SERIES A"
  //   },
  //   {
  //     "name": "FoodieExpress",
  //     "industry": "FoodTech",
  //     "valuation": 90000000,
  //     "fundingStage": "SERIES B"
  //   },
  //   {
  //     "name": "EduPro",
  //     "industry": "Education",
  //     "valuation": 45000000,
  //     "fundingStage": "PRE SEED"
  //   },
  //   {
  //     "name": "GreenEnergy",
  //     "industry": "Energy",
  //     "valuation": 130000000,
  //     "fundingStage": "SERIES A"
  //   },
  //   {
  //     "name": "UrbanNest",
  //     "industry": "Real Estate",
  //     "valuation": 60000000,
  //     "fundingStage": "SEED"
  //   },
  //   {
  //     "name": "AutoBots",
  //     "industry": "Automobile",
  //     "valuation": 200000000,
  //     "fundingStage": "SERIES C"
  //   }
  // ]

  // const createStartup = async () => {
  //   try {
  //     for (const startup of startups) {
  //       const docRef = await addDoc(collection(db, 'startups'), startup);
  //       console.log(`Added ${docRef.id} : ${startup.name} to Firestore`);
  //     }
  //     alert('All startups have been added to Firestore successfully!');
  //   } catch (error) {
  //     console.error('Error adding startups to Firestore: ', error);
  //   }
  // };




  return (
    <div>
      <section className="w-full min-h-screen py-4 flex items-center justify-center bg-blue-50">
        <div className="mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
     
          <div className="flex flex-col items-start max-w-lg">
            <h1 className="text-5xl font-bold my-4 text-gray-800 font-zilla">
              Welcome to Our Investor Platform: Your Gateway to Financial Insights
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Unlock Great Investment Opportunites and A Comprehensive Investor Dashboard Offering Insightful Visualizations
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex space-x-4">
                <Button onClick={() => setIsViewInvestmentModalOpen(true)} color="blue" className="py-4 px-6 text-xs" ripple={true}>
                  Explore Your Investments
                </Button>
                <Button onClick={() => setIsModalOpen(true)} color="white" className="py-4 px-6 text-xs text-blue-500 focus:ring-0" ripple={true}>
                  Discover Startups
                </Button>
              </div>
                <Button onClick={() => {navigate('/investor/dashboard')}} color="white" className="py-3 px-6 text-sm focus:ring-0 text-blue-500" ripple={true}>
                  View Investor Dashboard
                </Button>
            </div>
            <StartupFilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <ViewInvestmentsModal isOpen={isViewInvestmentModalOpen} onClose={() => setIsViewInvestmentModalOpen(false)} />
          </div>

        
          <div className="mt-8 md:mt-0 md:ml-24">
            <img
              src="https://via.placeholder.com/600"  // Replace with the actual image URL
              alt="Transforming Investment Insights"
              className="w-full max-w-lg rounded shadow-lg mt-4"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-16">
        <div className=" mx-auto px-8 flex flex-col md:flex-row items-center justify-center">
      
          <div className="flex flex-col items-start md:max-w-xl ">
            <h2 className="text-5xl text-center md:text-left md:text-6xl font-zilla font-bold mb-4 text-gray-800">
              Transforming Investment Insights
            </h2>
            <p className="text-lg text-gray-600 mb-4 text-center md:text-left">
              Elevate Your Investment Strategy: Gain a Holistic View of Your Portfolio Value, Startup Allocations, Total Investments, and ROI Trends.
            </p>
            <p className="text-lg text-gray-600 text-center md:text-left">
              Unveiling Your Investment Distribution: A Detailed Pie Chart Showcasing the Diversification of Your Startup Portfolio.
            </p>
          </div>

     
          <div className="mt-8 md:mt-0 md:ml-36">
            <img
              src="https://via.placeholder.com/500x400.png?text=Investment+Insights"
              alt="Investment Insights"
              className="w-full h-auto rounded shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-blue-50">
        <div className="px-5 md:mx-10">
      
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 font-zilla">
              POTENTIAL INVESTMENTS FOR YOU
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Our platform is tailored to provide you recommendations of startups which are in line with your current investment strategy and also prioritizing top performers!
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {investments.map((investment, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-52"
              >
                <img
                  src={investment.image}
                  alt={investment.name}
                  className="w-24 h-24 mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-700">{investment.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{investment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
};

export default Investor;
