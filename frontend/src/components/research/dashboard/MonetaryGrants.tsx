import React, { useEffect, useState } from 'react';
import { db } from '../../../fireBaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface GrantRequest {
  id: string;
  projectId: string;
  grantAmount: number;
  justification: string;
  dateRequested: Date;
  status: string;
}

interface Grant {
  source: string;  
  amount: number; 
  color: string;   
}

const MonetaryGrants: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPendingGrants = async () => {
    try {
      const q = query(collection(db, 'grantRequests'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      
      const grantsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        projectId: doc.data().projectId,
        grantAmount: doc.data().grantAmount,
        dateRequested: doc.data().dateRequested.toDate(),
      })) as GrantRequest[];

      
      const mappedGrants = grantsData.map(grant => ({
        source: grant.projectId, 
        amount: grant.grantAmount / 100000,  
        color: 'bg-orange-500',  
      }));

      setGrants(mappedGrants);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending grants: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingGrants();
  }, []);

  const totalAmount = grants.reduce((sum, grant) => sum + grant.amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Monetary Grants</h3>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center justify-between">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center relative">
            <div className="text-center">
              <span className="text-2xl font-bold">{totalAmount}</span> Lakhs
            </div>
          </div>
          
          <ul className="flex-1 ml-6 space-y-2">
            {grants.length > 0 ? (
              grants.map((grant, idx) => (
                <li key={idx} className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${grant.color}`}
                  ></span>
                  {grant.source}: {grant.amount} Lakhs
                </li>
              ))
            ) : (
              <p>No pending grant requests.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonetaryGrants;
