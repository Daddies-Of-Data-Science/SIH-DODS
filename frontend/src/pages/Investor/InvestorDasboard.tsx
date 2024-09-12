import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Button } from '@material-tailwind/react';
import StartupFilterModal from '../../components/investor/StartupFilter';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../fireBaseConfig';

interface Investment {
    startupId: string;
    startupName: string;
    investmentAmount: number;
};

function InvestorDashboard() {
const [isModalOpen, setIsModalOpen] = useState(false);
const [investments, setInvestments] = useState<Investment[]>([]);
const [totalInvestment, setTotalInvestment] = useState<number>(0);

const fetchInvestments = async () => {
  try {
    const query = await getDocs(collection(db, 'investments'));
    const investmentsData = query.docs.map((doc) => ({...doc.data(),})) as Investment[];
    return investmentsData;
  } 
  catch (error) {
    console.error('Error fetching investments: ', error);
    return [];
  }
};

useEffect(() => {
    const loadInvestments = async() =>{
        const allInvestments = await fetchInvestments();
        setInvestments(allInvestments);
        const total = allInvestments.reduce((sum, investment) => sum + investment.investmentAmount, 0);
        setTotalInvestment(total);
    }
    loadInvestments();
}, []);

const pieData = investments.map((investment) => ({
  name: investment.startupName,
  value: investment.investmentAmount,
}));

// const pieData = [
// { name: 'SolarIndia Tech', value: 3.8 },
// { name: 'InventoSolutions', value: 1.52 },
// { name: 'Others', value: 0.94 },
// ];

const lineData = [
{ day: 1, value: 140 },
{ day: 5, value: 160 },
{ day: 10, value: 180 },
{ day: 15, value: 220 },
{ day: 20, value: 260 },
{ day: 25, value: 240 },
{ day: 30, value: 180 },
];

const areaData = [
{ year: 2010, Education: 40, Technology: 50, Finance: 30, Agriculture: 20 },
{ year: 2012, Education: 50, Technology: 60, Finance: 40, Agriculture: 25 },
{ year: 2014, Education: 60, Technology: 70, Finance: 55, Agriculture: 35 },
{ year: 2016, Education: 70, Technology: 80, Finance: 65, Agriculture: 50 },
{ year: 2018, Education: 90, Technology: 100, Finance: 75, Agriculture: 65 },
];

const notifications = [
    {
      id: 1,
      status: 'Startup A:',
      description: 'Patent application submitted for approval',
      urgency: 'low',
    },
    {
      id: 2,
      status: 'Startup B:',
      description: 'IPR review in progress',
      urgency: 'medium',
    },
    {
      id: 3,
      status: 'Startup C:',
      description: 'Patent granted and published',
      urgency: '',
    },
    {
      id: 4,
      status: 'Startup D:',
      description: 'Patent application requires additional documentation',
      urgency: 'high',
    },
    {
        id: 4,
        status: 'Startup E:',
        description: 'Patent application requires additional documentation',
        urgency: '',
      },
      {
        id: 4,
        status: 'Startup F:',
        description: 'Patent application requires additional documentation',
        urgency: 'low',
      },
  ];
  
  const getColorByUrgency = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-500'; 
      case 'medium':
        return 'bg-yellow-500'; 
      case 'low':
        return 'bg-green-500'; 
      default:
        return 'bg-gray-400'; 
    }
  };

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="w-full px-4 md:px-10 flex flex-col gap-4 md:pt-24">
      {/* Header Section */}
      <div className="py-4 px-1 md:py-6 md:px-3 flex flex-col space-y-4 md:space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0">
          <div className="flex flex-col">
            <h2 className="text-2xl">Welcome, Aaron</h2>
            <div className="flex flex-wrap space-x-2 mt-2">
              <p className="my-1 font-bold md:text-lg text-sm">Your area of Interest:</p>
              <div className="px-3 bg-purple-400 text-xs grid place-items-center text-white font-semibold rounded-full">
                EdTech
              </div>
              <div className="px-3 bg-purple-400 text-xs grid place-items-center text-white font-semibold rounded-full">
                Technology
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => {setIsModalOpen(true)}} color="green" className="px-4 py-2 md:py-3 text-sm md:text-md normal-case">
              Find New Startups
            </Button>
          </div>
          <StartupFilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>

      {/* Line Chart Card */}
      <div className="bg-white rounded-lg shadow-custom p-4 md:p-6 mb-6 -mt-4">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Investment Valuation Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

       
          <div className="w-full flex flex-col md:flex-row md:gap-8">
            {/* Pie Chart Section */}
            {investments.length > 0 ? (
            <div className="flex-grow bg-white rounded-lg shadow-custom p-4 md:p-6 mb-6">
              <h3 className="text-lg md:text-xl font-semibold">Investment Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                  {/* Display Total Investment in the Center */}
                  <text
                    x="50%"
                    y="47%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xl font-semibold"
                    fill="#333"
                  >
                    ₹{totalInvestment.toLocaleString()}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
          
        ) : (
          <p className="text-center text-gray-500">No investments found.</p>
        )}

        <div className="flex-grow bg-white rounded-lg shadow-custom p-4 md:p-6 mb-6 max-h-[400px]">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Notifications</h3>
            {/* Container for notifications with controlled overflow */}
            <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden max-h-[300px] pr-2">
                {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-4 rounded-lg shadow px-3 py-2 bg-gray-100">
                    {/* Conditional color based on urgency */}
                    <span className={`w-4 h-4 rounded-full ${getColorByUrgency(notification.urgency)}`}></span>
                    <div>
                    <p className="font-medium text-gray-800">{notification.status}</p>
                    <p className="text-gray-600 text-sm">{notification.description}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </div>

    </div>
  );
}

export default InvestorDashboard;
