
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {  Search, Bell } from 'lucide-react';

const mockValuationData = [
  { day: 1, value: 15000 },
  { day: 5, value: 16000 },
  { day: 10, value: 18000 },
  { day: 15, value: 22034 },
  { day: 20, value: 21000 },
  { day: 25, value: 19000 },
  { day: 30, value: 20000 },
];

const equityData = [
  { name: 'Self', value: 60 },
  { name: 'Total', value: 30 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const StartupDashboard = () => {

  return (
    <div className={`p-6 pt-[15vh] bg-[#F0F0F0] font-outfit`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Dashboard</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">My Investments</button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-full" />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2">
            <span>Admin Singh</span>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <button className="px-4 py-2 bg-white border rounded shadow hover:bg-gray-50">DODS Startup</button>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-100 text-green-800 rounded">EDUCATION</button>
          <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded">TECHNOLOGY</button>
        </div>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded">PRE SEED</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Find Investors</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Valuation Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockValuationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Equity Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={equityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {equityData.map((data: any, index:any) => (
                  <Cell key={`cell-${data}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Total IPR in process</h2>
          <div className="text-4xl font-bold mb-4">13 Total</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between mt-2">
            <span>Completed</span>
            <span>Remaining</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-4">IPR Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
              46%
            </div>
            <div>
              <div className="font-semibold">IPR A</div>
              <div className="text-sm text-green-500">+25%</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
              46%
            </div>
            <div>
              <div className="font-semibold">IPR B</div>
              <div className="text-sm text-green-500">+25%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDashboard;