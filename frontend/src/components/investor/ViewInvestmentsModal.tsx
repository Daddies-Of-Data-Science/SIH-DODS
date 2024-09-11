import { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Spinner } from '@material-tailwind/react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../fireBaseConfig'; // Adjust the import path as necessary

interface Investment {
  startupId: string;
  startupName: string;
  investmentAmount: number;
}

interface InvestmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewInvestmentsModal = ({ isOpen, onClose }: InvestmentsModalProps) => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInvestments = async () => {
    try {
      const query = await getDocs(collection(db, 'investments'));
      const investmentsData = query.docs.map((doc) => ({...doc.data()})) as Investment[];
      return investmentsData;
    } 
    catch (error) {
      console.error('Error fetching investments: ', error);
      return [];
    }
  };

  useEffect(() => {
    const loadInvestments = async () => {
      setLoading(true);
      const allInvestments = await fetchInvestments();
      setInvestments(allInvestments);
      setLoading(false);
    };

    if (isOpen) {
      loadInvestments();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} handler={onClose} size="lg">
      <DialogHeader>All Investments</DialogHeader>
      <DialogBody divider>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : investments.length > 0 ? (
          <div className="max-h-[60vh] overflow-y-auto">
            {investments.map((investment, index) => (
              <div key={index} className="flex flex-col p-4 mb-4 shadow-md border rounded-lg">
                <h3 className="text-lg font-semibold">Startup Name: {investment.startupName}</h3>
                <p className="text-sm text-gray-500">Startup ID: {investment.startupId}</p>
                <p className="text-sm text-green-500">Investment Amount: ₹{investment.investmentAmount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No investments found.</p>
        )}
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={onClose} ripple={true}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ViewInvestmentsModal;
