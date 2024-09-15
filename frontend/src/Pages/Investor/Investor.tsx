import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import StartupFilterModal from '../../components/investor/StartupFilter';
import { useNavigate } from 'react-router-dom';
import ViewInvestmentsModal from '../../components/investor/ViewInvestmentsModal';
import InvestorSVG from '../../assets/inv1';
import InvestorSVG2 from '../../assets/inv2';

const Investor = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewInvestmentModalOpen, setIsViewInvestmentModalOpen] = useState(false);

  const investments = [
    { 
      name: 'CareForAll', 
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',  // Health industry: Doctors and healthcare setting
      description: 'Health' 
    },
    { 
      name: 'Pie21.io', 
      image: 'https://images.unsplash.com/photo-1477925518023-22b33cbd802c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',  // FoodTech industry: Food preparation with tech
      description: 'FoodTech' 
    },
    { 
      name: 'FetchAI', 
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',  // AI/ML industry: AI technology concept
      description: 'AI/ML' 
    },
    { 
      name: 'Kidnovate', 
      image: 'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',  // EdTech industry: Kids learning with tech
      description: 'EdTech' 
    },
    { 
      name: 'Kang21', 
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',  
      description: 'Fitness' 
    },
    { 
      name: 'Reversify', 
      image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60',  // FinTech industry: Financial technology concept
      description: 'FinTech' 
    },
  ];

  return (
    <div>
      <section className="w-full min-h-screen py-4 flex items-center justify-center bg-blue-50">
        <div className="mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-start max-w-lg">
            <h1 className="text-5xl font-bold my-4 text-gray-800 font-zilla">
              Welcome to Our Investor Platform: Your Gateway to Financial Insights
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Unlock Great Investment Opportunities and A Comprehensive Investor Dashboard Offering Insightful Visualizations
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
            <InvestorSVG/>
          </div>
        </div>
      </section>

      <section className="w-full py-16">
        <div className="mx-auto px-8 flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col items-start md:max-w-xl">
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
            <InvestorSVG2/>
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
