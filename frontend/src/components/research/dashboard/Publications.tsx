
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../fireBaseConfig";
import { FaUser, FaCalendarAlt, FaTags } from "react-icons/fa"; 

interface Project {
  id: string;
  title: string;
  description: string;
  authors: string;
  abstract: string;
  keywords: string;
  submissionDate: string;
}

const PublicationsChart: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectList: Project[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          authors: doc.data().authors,
          abstract: doc.data().abstract,
          keywords: doc.data().keywords,
          submissionDate: doc.data().submissionDate,
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
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Research Projects
      </h3>
      <ul className="space-y-6">
        {projects.map((project) => (
          <li
            key={project.id}
            className="border-l-4 border-blue-500 bg-gray-50 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:bg-blue-50"
          >
            <h4 className="font-bold text-xl text-blue-700 mb-2">
              {project.title}
            </h4>
            <div className="text-gray-600 flex items-center mb-2">
              <FaUser className="mr-2 text-blue-500" />
              <span>{project.authors}</span>
            </div>
            {/* <p className="text-gray-600 mb-2">{project.abstract}</p> */}
            <div className="text-gray-600 flex items-center mb-2">
              <FaTags className="mr-2 text-green-500" />
              <span>{project.keywords}</span>
            </div>
            <div className="text-gray-600 flex items-center">
              <FaCalendarAlt className="mr-2 text-red-500" />
              <span>
                Submitted on:{" "}
                {new Date(project.submissionDate).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicationsChart;
