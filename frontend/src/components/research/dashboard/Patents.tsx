import React, { useEffect, useState } from 'react';
import { db } from '../../../fireBaseConfig';
import { collection, getDocs } from 'firebase/firestore';

type Status = 'in-progress' | 'in-review' | 'published';

interface PaperProps {
  id: string;
  title: string;
  status: Status;
  collaborators: string[];
  publishedDate?: string;
  areaOfResearch?: string;
  isStarred: boolean;
}

const Patent: React.FC = () => {
  const [papers, setPapers] = useState<PaperProps[]>([]);

 
  const fetchResearchPapers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'researchPapers'));
      const papersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PaperProps[];
      setPapers(papersData);
    } catch (error) {
      console.error('Error fetching research papers:', error);
    }
  };

  useEffect(() => {
    fetchResearchPapers();
  }, []);


  const totalPapers = papers.length;
  const publishedPapers = papers.filter(paper => paper.status === 'published').length;
  const inReviewPapers = papers.filter(paper => paper.status === 'in-review').length;
  const inProgressPapers = papers.filter(paper => paper.status === 'in-progress').length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Total Research Papers</h3>
      <div className="text-3xl font-bold mb-4">{totalPapers}</div>

      <div className="space-y-2">
        {/* Published Papers */}
        <div className="flex justify-between text-sm">
          <span>Published</span>
          <span>{publishedPapers}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(publishedPapers / totalPapers) * 100}%` }}
          ></div>
        </div>

        {/* In Review Papers */}
        <div className="flex justify-between text-sm mt-2">
          <span>In Review</span>
          <span>{inReviewPapers}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${(inReviewPapers / totalPapers) * 100}%` }}
          ></div>
        </div>

       
        <div className="flex justify-between text-sm mt-2">
          <span>In Progress</span>
          <span>{inProgressPapers}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${(inProgressPapers / totalPapers) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Patent;
