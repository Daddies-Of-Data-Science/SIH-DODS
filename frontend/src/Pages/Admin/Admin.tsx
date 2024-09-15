import React, { useState } from 'react';
import { getDocs, doc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../../fireBaseConfig';
import { toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Initialize Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

  React.useEffect(() => {
    fetchIPRApplications();
    fetchInvestmentApplications();
    fetchGrants();
  }, []);

  // Fetch IPR applications
  const fetchIPRApplications = async () => {
    const querySnapshot = await getDocs(collection(db, 'iprApplications'));
    const applications = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IPRApplication[];
    applications.sort((a) => (a.status === 'IN REVIEW' ? -1 : 1));
    setIprApplications(applications);
  };

  // Fetch Investment applications
  const fetchInvestmentApplications = async () => {
    const querySnapshot = await getDocs(collection(db, 'investments'));
    const investments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as InvestmentApplication[];
    investments.sort((a) => (a.status === 'IN REVIEW' ? -1 : 1));
    setInvestments(investments);
  };

  // Fetch Grant requests
  const fetchGrants = async () => {
    const querySnapshot = await getDocs(collection(db, 'grantRequests'));
    const grants = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dateRequested: doc.data().dateRequested.toDate(),
    })) as GrantRequest[];
    grants.sort((a) => (a.status === 'pending' ? -1 : 1));
    setGrants(grants);
  };

  // Update Investment Status
  const updateInvestmentStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'investments', id), { status: newStatus });
      fetchInvestmentApplications();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  // Update IPR Status
  const updateIPRStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'iprApplications', id), { status: newStatus });
      fetchIPRApplications();
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

  // Data for charts
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

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

        {/* Charts */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Application Overview</h2>
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
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
                        onClick={() => updateInvestmentStatus(investment.id, 'APPROVED')}
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
