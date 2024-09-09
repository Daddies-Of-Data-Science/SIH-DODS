import React, { useEffect, useState } from 'react';
import { db } from '../../fireBaseConfig'; 
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ResearchProject {
  id: string;
  title: string;
  status: string;
}

interface GrantRequestFormProps {
  projects: ResearchProject[];
}

interface GrantRequest {
  id: string;
  projectId: string;
  grantAmount: number;
  justification: string;
  dateRequested: Date;
  status: string;
}

const validationSchema = Yup.object({
  selectedProject: Yup.string().required('Please select a project'),
  grantAmount: Yup.number().required('Grant amount is required').min(1, 'Grant amount must be greater than 0'),
  justification: Yup.string().required('Justification is required'),
});

const GrantRequestForm: React.FC<GrantRequestFormProps> = ({ projects }) => {
  const [pendingGrants, setPendingGrants] = useState<GrantRequest[]>([]);

  const fetchPendingGrants = async () => {
    try {
      const q = query(collection(db, 'grantRequests'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const grantsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dateRequested: doc.data().dateRequested.toDate(),
      })) as GrantRequest[];
      setPendingGrants(grantsData);
    } catch (error) {
      console.error('Error fetching pending grants: ', error);
    }
  };

  useEffect(() => {
    fetchPendingGrants();
  }, []);

  return (
    <div className="w-full p-6 bg-blue-50 mt-20 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request a Grant</h2>
      
      <Formik
        initialValues={{ selectedProject: '', grantAmount: 0, justification: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await addDoc(collection(db, 'grantRequests'), {
              projectId: values.selectedProject,
              grantAmount: values.grantAmount,
              justification: values.justification,
              dateRequested: new Date(),
              status: 'pending',
            });
            resetForm();
            fetchPendingGrants();
            alert('Grant request submitted successfully!');
          } catch (error) {
            console.error('Error submitting grant request: ', error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Research Project</label>
              <Field as="select" name="selectedProject" className="border rounded-lg p-2 w-full bg-white">
                <option value="">Select a project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="selectedProject" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Grant Amount (Rs.)</label>
              <Field
                type="number"
                name="grantAmount"
                className="border rounded-lg p-2 w-full bg-white"
              />
              <ErrorMessage name="grantAmount" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Justification</label>
              <Field
                as="textarea"
                name="justification"
                rows={4}
                className="border rounded-lg p-2 w-full bg-white"
              />
              <ErrorMessage name="justification" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white rounded-lg p-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Grant Request'}
            </button>
          </Form>
        )}
      </Formik>
      
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Pending Grant Requests</h3>
        {pendingGrants.length === 0 ? (
          <p className="text-gray-600">No pending grant requests.</p>
        ) : (
          <div className="space-y-4">
            {pendingGrants.map(grant => (
              <div key={grant.id} className="p-4 border rounded-lg bg-white shadow-sm">
                <p className="text-sm font-medium">Project ID: {grant.projectId}</p>
                <p className="text-sm text-gray-600">Amount Requested: Rs. {grant.grantAmount}</p>
                <p className="text-sm text-gray-600">Date Requested: {grant.dateRequested.toDateString()}</p>
                <p className="text-sm text-gray-600">Justification: {grant.justification}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrantRequestForm;
