import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireBaseConfig';

// Validation schemas
const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const iprValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  type: Yup.string().required('Type is required').oneOf(['patent', 'trademark', 'copyright'], 'Invalid type selected'),
});

// Dummy credentials
const validCredentials = { username: 'admin', password: 'password' };

// Landing Page Component
const LandingPage = ({ onLogin }) => (
  <div className="min-h-screen flex flex-col justify-between bg-blue-50 text-black">
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">IPR Management System</h1>
        <p className="text-xl">Protecting Your Intellectual Property Rights</p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Why Protect Your IP?</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Safeguard Your Innovations
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Gain Competitive Advantage
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Monetize Your Creations
            </li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login to Access IPR System</h2>
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
const IPR = () => {
  const [applications, setApplications] = useState([]);

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const querySnapshot = await getDocs(collection(db, "iprApplications"));
    setApplications(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addDoc(collection(db, "iprApplications"), {
        ...values,
        status: 'Pending',
        createdAt: new Date()
      });
      resetForm();
      fetchApplications();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setSubmitting(false);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "iprApplications", id), { status: newStatus });
      fetchApplications();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">IPR Management Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit New Application</h2>
          <Formik
            initialValues={{ title: '', description: '', type: 'patent' }}
            validationSchema={iprValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <Field type="text" name="title" placeholder="Title" className="w-full p-2 border rounded" />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4">
                  <Field as="textarea" name="description" placeholder="Description" className="w-full p-2 border rounded" />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4">
                  <Field as="select" name="type" className="w-full p-2 border rounded">
                    <option value="patent">Patent</option>
                    <option value="trademark">Trademark</option>
                    <option value="copyright">Copyright</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300 transition duration-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        
      </div>
    </div>
  );
};

// Main App Component
const IPRManagementApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='pt-[10vh]'>
      {!isAuthenticated ? (
        <LandingPage onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <IPR />
      )}
    </div>
  );
};

export default IPRManagementApp;