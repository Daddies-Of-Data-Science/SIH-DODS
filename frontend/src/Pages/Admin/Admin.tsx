import { useState, useEffect } from 'react';
import { getDocs, doc, updateDoc, collection, query, where } from 'firebase/firestore';
import { db } from '../../fireBaseConfig';
import { toast } from 'react-toastify';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Initialize Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface IPRApplication {
  id: string;
  description: string;
  title: string;
  type: string;
  createdAt: Date;
  status: string;
}

interface InvestmentApplication {
  id: string;
  startupName: string;
  investmentAmount: number;
  investorName: string;
  industry: string;
  status: string;
}

interface GrantRequest {
  id: string;
  projectId: string;
  grantAmount: number;
  justification: string;
  dateRequested: Date;
  status: string;
}

const Admin = () => {
  const [iprApplications, setIprApplications] = useState<IPRApplication[]>([]);
  const [investments, setInvestments] = useState<InvestmentApplication[]>([]);
  const [grants, setGrants] = useState<GrantRequest[]>([]);
  const [totalStartups, setTotalStartups] = useState<number>(0);
  const [totalResearchPapers, setTotalResearchPapers] = useState<number>(0);
  const [approvedGrants, setApprovedGrants] = useState<number>(0);
  const [totalGrantAmount, setTotalGrantAmount] = useState<number>(0);
  const [investmentByIndustry, setInvestmentByIndustry] = useState<{ [key: string]: number }>({});
  const [totalInvestments, setTotalInvestments] = useState<number>(0);
  const [approvedIPRs, setApprovedIPRs] = useState<number>(0);

  useEffect(() => {
    fetchIPRApplications();
    fetchInvestmentApplications();
    fetchGrants();
    fetchTotalStartups();
    fetchTotalResearchPapers();
  }, []);

  useEffect(() => {
    console.log("Updated Industry Graph:", investmentByIndustry);  // Log after state is updated
  }, [investmentByIndustry]);

  const fetchIPRApplications = async () => {
    const querySnapshot = await getDocs(collection(db, 'iprApplications'));
    const applications = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IPRApplication[];
    applications.sort((a) => (a.status === 'IN REVIEW' ? -1 : 1));
    setIprApplications(applications);

    const q = query(collection(db, 'iprApplications'), where('status', '==', 'APPROVED'));
    const approvedIPRS = await getDocs(q);
    setApprovedIPRs(approvedIPRS.docs.length);
  };


  const fetchInvestmentApplications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'investments'));
      const investmentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as InvestmentApplication[];
      investmentsData.sort((a) => (a.status === 'IN REVIEW' ? -1 : 1));
      const investmentByIndustryData: any = {};
      
      let totalInvestments = 0;
      investmentsData.forEach((investment) => {
        totalInvestments += investment.investmentAmount;
        if (investment.status === 'APPROVED') {
          if (investmentByIndustryData[investment.industry]) {
            investmentByIndustryData[investment.industry] += investment.investmentAmount;
          } else {
            investmentByIndustryData[investment.industry] = investment.investmentAmount;
          }
        }
      });
      console.log("Investment update: ",investmentByIndustryData)
      setInvestments(investmentsData);
      setInvestmentByIndustry(investmentByIndustryData);
      setTotalInvestments(totalInvestments);

    } catch (error) {
      console.error("Error fetching investments:", error);
      setInvestmentByIndustry({}); 
    }
  };

  const fetchGrants = async () => {
    const querySnapshot = await getDocs(collection(db, 'grantRequests'));
    const grants = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dateRequested: doc.data().dateRequested.toDate(),
    })) as GrantRequest[];
    grants.sort((a) => (a.status === 'IN REVIEW' ? -1 : 1));
    let approvedGrants = 0;
    let totalGrantAmount = 0;

    grants.forEach((grant) => {
      if (grant.status === 'APPROVED') {
        approvedGrants++;
        totalGrantAmount += grant.grantAmount;
      }
    });

    grants.sort((a) => (a.status === 'pending' ? -1 : 1));
    setGrants(grants);
    setApprovedGrants(approvedGrants);
    setTotalGrantAmount(totalGrantAmount);
  };

  const fetchTotalStartups = async () => {
    const querySnapshot = await getDocs(collection(db, 'startups'));
    setTotalStartups(querySnapshot.docs.length);
  };

  const fetchTotalResearchPapers = async () => {
    try {
      const q = query(collection(db, 'researchPapers'), where('status', '==', 'published'));
      const querySnapshot = await getDocs(q);
      setTotalResearchPapers(querySnapshot.docs.length);
  
    } catch (error) {
      console.error("Error fetching published research papers:", error);
    }
  };

  // Update Investment Status
  const updateInvestmentStatus = async (id: string, newStatus: string, amount?:number, name?:string) => {
    try {
      await updateDoc(doc(db, 'investments', id), { status: newStatus });
      fetchInvestmentApplications();
      toast.success(`Sucessfully Approved Investment of ₹${amount} for ${name}`)
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  // Update IPR Status
  const updateIPRStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'iprApplications', id), { status: newStatus });
      fetchIPRApplications();
      toast.success('IPR status updated successfully!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  // Update Grant Status
  const updateGrantStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'grantRequests', id), { status: newStatus });
      fetchGrants();
      toast.success('Grant status updated successfully!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const chartData = {
    labels: ['IPR Applications', 'Investment Applications', 'Grant Requests'],
    datasets: [
      {
        label: 'Total Applications',
        data: [iprApplications.length, investments.length, grants.length],
        backgroundColor: ['#1D4ED8', '#10B981', '#F59E0B'],
        borderColor: ['#1D4ED8', '#10B981', '#F59E0B'],
        borderWidth: 1,
      },
    ],
  };

  const investmentByIndustryData = {
    labels: Object.keys(investmentByIndustry),
    datasets: [
      {
        label: 'Investments by Industry',
        data: Object.values(investmentByIndustry),
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336', '#3F51B5', '#2196F3'],
        borderColor: ['#4CAF50', '#FF9800', '#F44336', '#3F51B5', '#2196F3'],
        borderWidth: 1,
      },
    ],
  };

  const generalStatsData = {
    labels: ['Total Startups', 'Published Research Papers', 'Approved Grants'],
    datasets: [
      {
        label: 'Count',
        data: [totalStartups, totalResearchPapers, approvedGrants],
        backgroundColor: ['#FF5722', '#009688', '#FFEB3B'],
        borderColor: ['#FF5722', '#009688', '#FFEB3B'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen max-w-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

        <div className='w-full flex flex-row gap-8'>
          {/* Charts */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Application Overview</h2>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>

          {/* General Statistics Chart */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">General Statistics</h2>
            <Bar data={generalStatsData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>
        </div>

        {/* Investment by Industry Chart with Totals */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Investments, Grants, and IPR Overview</h2>
          <div className="w-full flex flex-row md:flex-nowrap flex-wrap gap-8">

            {/* Pie Chart for Investments by Industry */}
            <div className="w-2/3 md:flex-nowrap flex-1">
              {Object.keys(investmentByIndustry).length > 0 ? (
                <Pie data={investmentByIndustryData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
              ) : (
                <p className="text-center text-gray-500">No investment data available.</p>
              )}
            </div>
            <div className='w-1/3 flex flex-col gap-5'>
              {/* Total Approved Investments */}
              <div className="flex-1 bg-green-100 p-4 rounded-lg shadow flex flex-col justify-center items-center text-center">
                <h3 className="text-lg font-semibold text-green-800">Total Approved Investments</h3>
                <p className="text-2xl font-bold text-green-900">₹{totalInvestments.toLocaleString()}</p>
              </div>

              {/* Total Approved Grants */}
              <div className="flex-1 bg-blue-100 p-4 rounded-lg shadow flex flex-col justify-center items-center text-center">
                <h3 className="text-lg font-semibold text-blue-800">Total Approved Grants</h3>
                <p className="text-2xl font-bold text-blue-900">₹{totalGrantAmount.toLocaleString()}</p>
              </div>

              {/* Total Approved IPRs */}
              <div className="flex-1 bg-purple-100 p-4 rounded-lg shadow flex flex-col justify-center items-center text-center">
                <h3 className="text-lg font-semibold text-purple-800">Total Approved IPRs</h3>
                <p className="text-2xl font-bold text-purple-900">{approvedIPRs}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* IPR Applications */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">IPR Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {iprApplications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{app.title}</td>
                    <td className="py-3 px-6">{app.type}</td>
                    <td className="py-3 px-6">{app.status}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => updateIPRStatus(app.id, 'APPROVED')}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateIPRStatus(app.id, 'REJECTED')}
                        className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Applications */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Investment Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Startup Name</th>
                  <th className="py-3 px-6 text-left">Investment Amount</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {investments.map((investment) => (
                  <tr key={investment.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{investment.startupName}</td>
                    <td className="py-3 px-6">₹{investment.investmentAmount.toLocaleString()}</td>
                    <td className="py-3 px-6">{investment.status}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => updateInvestmentStatus(investment.id, 'APPROVED', investment.investmentAmount, investment.startupName)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateInvestmentStatus(investment.id, 'REJECTED')}
                        className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grant Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Grant Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Project ID</th>
                  <th className="py-3 px-6 text-left">Grant Amount</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {grants.map((grant) => (
                  <tr key={grant.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{grant.projectId}</td>
                    <td className="py-3 px-6">₹{grant.grantAmount.toLocaleString()}</td>
                    <td className="py-3 px-6">{grant.status}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => updateGrantStatus(grant.id, 'APPROVED')}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateGrantStatus(grant.id, 'REJECTED')}
                        className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
