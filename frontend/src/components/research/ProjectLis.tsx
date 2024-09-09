import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fireBaseConfig";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectList: any[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Submitted Projects</h1>
      <ul className="space-y-4">
        {projects.map(project => (
          <li key={project.id} className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{project.title}</h2>
            <p className="text-lg text-gray-600 mb-2"><strong>Description:</strong> {project.description}</p>
            <p className="text-lg text-gray-600 mb-2"><strong>Authors:</strong> {project.authors}</p>
            <p className="text-lg text-gray-600 mb-2"><strong>Abstract:</strong> {project.abstract}</p>
            <p className="text-lg text-gray-600 mb-2"><strong>Keywords:</strong> {project.keywords}</p>
            {/* Uncomment and format if you want to use the submission date
            <p className="text-lg text-gray-600"><strong>Submission Date:</strong> {project.submissionDate?.toDate().toDateString()}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
