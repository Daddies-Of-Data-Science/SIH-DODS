
import Topbar from "../../components/research/dashboard/Topbar";
import DashboardContent from "../../components/research/dashboard/DashboardContent";

const ReactDashboard: React.FC = () => {
  return (
    <div className="flex h-screen mx-2">
      <div className="flex-1 flex flex-col md:mt-[12vh]">
        <Topbar />
        <DashboardContent />
      </div>
    </div>
  );
};

export default ReactDashboard;