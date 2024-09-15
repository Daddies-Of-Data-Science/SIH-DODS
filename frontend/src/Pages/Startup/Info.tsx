import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {db} from '../../fireBaseConfig';
// Initialize Firebase (replace with your config)


// const FeatureCard = ({ icon: Icon, title, description }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
//     <Icon className="h-12 w-12 text-blue-500 mb-2" />
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//   </div>
// );

// const StartupCard = ({ title, description, icon: Icon }) => (
//   <div className="bg-black text-white p-6 rounded-lg shadow-md h-full flex flex-col">
//     <Icon className="h-16 w-16 text-blue-400 mb-4" />
//     <h3 className="text-2xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-300 flex-grow">{description}</p>
//     <button className="text-blue-400 mt-4 flex items-center">
//       Learn more 
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//       </svg>
//     </button>
//   </div>
// );

interface SubmitStartupFormProps {
  onClose: () => void;
}

const SubmitStartupForm: React.FC<SubmitStartupFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    email: '',
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'startups'), formData);
      onClose();
      alert('Startup submitted successfully!');
    } catch (error) {
      console.error('Error submitting startup:', error);
      alert('Error submitting startup. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Startup Name</label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
        <input
          type="url"
          id="website"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Contact Email</label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Submit
      </button>
    </form>
  );
};

const Info = () => {
  interface Startup {
    id: string;
    name: string;
    description: string;
    website: string;
  }
  
  const [startups, setStartups] = useState<Startup[]>([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  useEffect(() => {
    const fetchStartups = async () => {
      const querySnapshot = await getDocs(collection(db, 'startups'));
      setStartups(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Startup[]);
    };
    fetchStartups();
  }, []);

  


  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Elevate Your Business with Innovative Solutions</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Unlock the power of groundbreaking startups and innovative technologies to propel your business forward. Our comprehensive directory and detailed profiles provide the insights and connections you need to stay ahead of the curve.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setShowSubmitForm(true)} 
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit your Startup
            </button>
            <Link to="/investor">
              <button className="bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Become an Investor
              </button>
            </Link>
          </div>
        </div>
      </section>


      {startups.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Latest Startups</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {startups.map((startup) => (
                <div key={startup.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{startup.name}</h3>
                  <p className="text-gray-600 mb-4">{startup.description}</p>
                  <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Visit Website
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showSubmitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Submit Your Startup</h2>
            <SubmitStartupForm onClose={() => setShowSubmitForm(false)} />
            <button
              onClick={() => setShowSubmitForm(false)}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Startup Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Info;