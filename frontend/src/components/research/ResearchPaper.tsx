import React, { useEffect, useState } from 'react';
import { db } from '../../fireBaseConfig'; 
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import FilterByAreaOfResearch from './Filter';
import GrantRequestForm from './GrantRequest';

type Status = 'in-progress' | 'in-review' | 'published';

interface PaperCardProps {
  id: string; 
  title: string;
  status: Status;
  collaborators: string[];
  publishedDate?: string;
  areaOfResearch?: string;
  isStarred: boolean; 
}

const ResearchPapers: React.FC = () => {
  const [papers, setPapers] = useState<PaperCardProps[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<PaperCardProps[]>([]);
  const [newPaper, setNewPaper] = useState<PaperCardProps>({ id: '', title: '', status: 'in-progress', collaborators: [], areaOfResearch: '', isStarred: false });
  const [collaborator, setCollaborator] = useState<string>('');
  const [filterAreaOfResearch, setFilterAreaOfResearch] = useState<string>('');

  const fetchPapers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'researchPapers'));
      const papersData = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
        publishedDate: doc.data().publishedDate || '',
        areaOfResearch: doc.data().areaOfResearch || '',
        isStarred: doc.data().isStarred || false, 
      })) as PaperCardProps[];
      setPapers(papersData);
      setFilteredPapers(papersData); 
    } catch (error) {
      console.error('Error fetching papers: ', error);
    }
  };

  const addPaper = async () => {
    try {
      await addDoc(collection(db, 'researchPapers'), newPaper);
      setNewPaper({ id: '', title: '', status: 'in-progress', collaborators: [], areaOfResearch: '', isStarred: false });
      fetchPapers();
    } catch (error) {
      console.error('Error adding new paper: ', error);
    }
  };

  const addCollaborator = () => {
    if (collaborator.trim()) {
      setNewPaper((prev) => ({
        ...prev,
        collaborators: [...prev.collaborators, collaborator],
      }));
      setCollaborator('');
    }
  };

  const toggleStar = async (id: string, isStarred: boolean) => {
    try {
      const paperRef = doc(db, 'researchPapers', id);
      await updateDoc(paperRef, { isStarred: !isStarred });
      setPapers(papers.map(paper => paper.id === id ? { ...paper, isStarred: !isStarred } : paper));
    } catch (error) {
      console.error('Error toggling star: ', error);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  useEffect(() => {
    const filtered = papers.filter(paper =>
      paper.areaOfResearch?.toLowerCase().includes(filterAreaOfResearch.toLowerCase()) || filterAreaOfResearch === ''
    );
    setFilteredPapers(filtered);
  }, [filterAreaOfResearch, papers]);

  return (
    <>
    <div className="w-full p-6 mt-20 bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">Your Research Papers</h1>
      <p className="text-center mb-6">Get access to real-time collaboration with your fellow researchers to jump-start your productivity!</p>

      <FilterByAreaOfResearch
        selectedArea={filterAreaOfResearch}
        onChange={(area) => setFilterAreaOfResearch(area)}
      />

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Research Paper</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPaper.title}
          onChange={(e) => setNewPaper({ ...newPaper, title: e.target.value })}
          className="border rounded-lg p-2 mb-2 w-full"
        />
        <select
          value={newPaper.status}
          onChange={(e) => setNewPaper({ ...newPaper, status: e.target.value as Status })}
          className="border rounded-lg p-2 mb-2 w-full"
        >
          <option value="in-progress">In progress</option>
          <option value="in-review">In review</option>
          <option value="published">Published</option>
        </select>
        <input
          type="text"
          placeholder="Area of Research"
          value={newPaper.areaOfResearch}
          onChange={(e) => setNewPaper({ ...newPaper, areaOfResearch: e.target.value })}
          className="border rounded-lg p-2 mb-2 w-full"
        />
        <div className="mb-4">
          <input
            type="text"
            placeholder="Add Collaborator"
            value={collaborator}
            onChange={(e) => setCollaborator(e.target.value)}
            className="border rounded-lg p-2 mb-2 w-full"
          />
          <button onClick={addCollaborator} className="bg-green-500 text-white rounded-lg p-2 mb-1 md:w-[20vh]">Add Collaborator</button>

          <div className="flex space-x-2">
            {newPaper.collaborators.map((collab, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white"
              >
                {collab.split(' ').map(word => word[0]).join('')}
              </div>
            ))}
          </div>
        </div>
        <button onClick={addPaper} className="bg-blue-500 text-white rounded-lg p-2 md:w-[20vh]">Add Paper</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.map((paper) => (
          <div key={paper.id} className="border rounded-lg shadow-md w-full p-4">
            <h3 className="text-lg font-semibold text-center mb-2">{paper.title}</h3>
            <div className="h-32 bg-gray-200 mb-4 flex items-center justify-center">
              <p className="text-gray-500">Document Preview</p>
            </div>
            <div className={`text-center p-2 rounded-lg ${paper.status === 'in-progress' ? 'bg-green-200' : paper.status === 'in-review' ? 'bg-orange-300' : 'bg-blue-300'}`}>
              {paper.status === 'published'
                ? `Published ${paper.publishedDate || ''}`
                : paper.status === 'in-progress'
                  ? 'In progress'
                  : 'In review'}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm">Collaborators:</p>
              <div className="flex space-x-2">
                {paper.collaborators.map((collaborator, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white"
                  >
                    {collaborator.split(' ').map(word => word[0]).join('')}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm">Area of Research:</p>
              <p className="text-sm font-medium">{paper.areaOfResearch || 'Not specified'}</p>
            </div>
            <button
              onClick={() => toggleStar(paper.id, paper.isStarred)}
              className={`w-full mt-4 p-2 rounded-lg ${paper.isStarred ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}
            >
              {paper.isStarred ? 'Unstar' : 'Star'}
            </button>
          </div>
        ))}
      </div>
    </div>


<GrantRequestForm projects={papers} />
</>
  );
};

export default ResearchPapers;
