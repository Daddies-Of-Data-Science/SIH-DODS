import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../fireBaseConfig';
import { toast } from 'react-toastify';

interface IPRApplication {
  id: string,
  description: string,
  title: string,
  type: string,
  createdAt: Date,
  status: string
}

interface InvestmentApplication {
  id: string,
  startupName: string,
  investmentAmount: Number,
  investorName: string,
  status: string
}

// Validation schemas
const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

// Dummy credentials
const validCredentials = { username: 'admin', password: 'password' };

type LoginProps = {
    onLogin: () => void
}
const LandingPage = ({ onLogin } : LoginProps) => (
  <div className="min-h-screen flex flex-col justify-between bg-blue-50 text-black">
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Admin Management Portal</h1>
        {/* <p className="text-xl">Protecting Your Intellectual Property Rights</p> */}
      </header>
      
      <div className="grid gap-12 place-items-center">
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login to Access Admin Portal</h2>
          <Formik
            initialValues={{ username: 'admin', password: 'password' }}
            validationSchema={loginValidationSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              if (values.username === validCredentials.username && values.password === validCredentials.password) {
                onLogin();
              } else {
                setErrors({ password: 'Invalid username or password' });
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <Field type="text" name="username" placeholder="Username" className="w-full p-2 border rounded text-gray-800" />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4">
                  <Field type="password" name="password" placeholder="Password" className="w-full p-2 border rounded text-gray-800" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition duration-300"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    <footer className="bg-gray-800 text-center py-4">
      <p>&copy; 2024 IPR Management System. All rights reserved.</p>
    </footer>
  </div>
);

// IPR Management System Component
const Admin = () => {
  const [iprapplications, setIprApplications] = useState<IPRApplication[]>([]);
  const [investments, setInvestments] = useState<InvestmentApplication[]>([]);

  React.useEffect(() => {
    fetchIPRApplications();
    fetchInvestmentApplications();
  }, []);

  const fetchIPRApplications = async () => {
    const querySnapshot = await getDocs(collection(db, "iprApplications"));
    const applications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IPRApplication[];
    applications.sort((a) => (a.status === "IN REVIEW" ? -1 : 1));
    setIprApplications(applications);
  };

  const fetchInvestmentApplications = async () => {
    const querySnapshot = await getDocs(collection(db, "investments"));
    const investments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as InvestmentApplication[];
    investments.sort((a) => (a.status === "IN REVIEW" ? -1 : 1));
    setInvestments(investments);
  };

  const updateInvestmentStatus = async (id: string, newStatus: string, investmentAmount?: Number, startupId?: string) => {
    try {
        if(newStatus === "APPROVED" && startupId){
            const startupRef = doc(db, 'startups', startupId);
            const startupSnap = await getDoc(startupRef);
            const startupData = startupSnap.data();  
            const originalValuation = startupData?.valuation || 0;
            await updateDoc(startupRef, {
                valuation: originalValuation + investmentAmount,
            });
            toast.success(`Investment for ${startupData?.name} of ₹${investmentAmount?.toLocaleString()} is approved!`);
        }
        await updateDoc(doc(db, "investments", id), { status: newStatus });
        fetchInvestmentApplications();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
  }

  const updateIPRStatus = async (id: string, newStatus: string) => {
      try {
        await updateDoc(doc(db, "iprApplications", id), { status: newStatus });
        fetchIPRApplications();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">IPR Management Dashboard</h1>

        {/* IPR STATUS UPDATE */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">All IPR Applications</h2>
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
                {iprapplications.map((app:any) => (
                  <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{app.title}</td>
                    <td className="py-3 px-6 text-left">{app.type}</td>
                    <td className="py-3 px-6 text-left">{app.status}</td>
                    <td className="py-3 px-6 text-left">
                      <select
                        onChange={(e) => updateIPRStatus(app.id, e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">Update Status</option>
                        <option value="APPROVED">Approve</option>
                        <option value="REJECTED">Reject</option>
                        <option value="IN REVIEW">Under Review</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* INVESTMENT STATUS UPDATE */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Investment Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Startup Name</th>
                  <th className="py-3 px-6 text-left">Investor Name</th>
                  <th className="py-3 px-6 text-left">Investment Amount</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {investments.map((investment:any) => (
                  <tr key={investment.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{investment.startupName}</td>
                    <td className="py-3 px-6 text-left">{investment.investorName}</td>
                    <td className="py-3 px-6 text-center">₹{investment.investmentAmount.toLocaleString()}</td>
                    <td className="py-3 px-6 text-left">{investment.status}</td>
                    <td className="py-3 px-6 text-left">
                      <select
                        onChange={(e) => {
                            if(e.target.value === "APPROVED") 
                                updateInvestmentStatus(investment.id, e.target.value, investment.investmentAmount, investment.startupId)
                            else 
                                updateInvestmentStatus(investment.id, e.target.value, investment.investmentAmount)
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">Update Status</option>
                        <option value="APPROVED">Approve</option>
                        <option value="REJECTED">Reject</option>
                        <option value="IN REVIEW">Under Review</option>
                      </select>
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

// Main App Component
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='pt-[10vh]'>
      {!isAuthenticated ? (
        <LandingPage onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Admin />
      )}
    </div>
  );
};

export default AdminPage;