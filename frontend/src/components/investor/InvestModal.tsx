import { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from "../../fireBaseConfig";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  startup: {
    id: string;
    name: string;
    valuation: number;
  } | null;
  fetchStartups: () => void;
}

const InvestModal = ({ isOpen, onClose, startup, fetchStartups }: InvestmentModalProps) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  const handleInvestmentSubmit = async () => {
    if (startup && investmentAmount > 0) {
      const promise = async () => {
        try{
            const startupRef = doc(db, 'startups', startup.id);
            await updateDoc(startupRef, {
              valuation: startup.valuation + investmentAmount,
            });

            await addDoc(collection(db, 'investments'), {
              startupId: startup.id,
              startupName: startup.name,
              investmentAmount: investmentAmount,
            });
        }
        catch(err){
            console.log(err);
        }
      };

      toast.promise(
        promise(),
        {
          pending: 'Investing...',
          success: `Investment of ₹${investmentAmount.toLocaleString()} was successful!`,
          error: 'Failed to invest. Please try again.',
        }
      );
      fetchStartups();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="md">
      <DialogHeader>Invest in {startup?.name}</DialogHeader>
      <DialogBody divider>
        <label htmlFor="investmentAmount" className="block text-sm font-semibold text-gray-700 mb-1">
          Investment Amount (₹):
        </label>
        <input
          id="investmentAmount"
          type="text"
          placeholder="Enter investment amount"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(parseInt(e.target.value) || 0)}
          className="px-4 py-2 border border-gray-300 focus:outline-blue-500 rounded-lg w-full mb-4"
        />
      </DialogBody>
      <DialogFooter className='w-full justify-end flex gap-3'>
        <Button color="green" onClick={handleInvestmentSubmit} ripple={true}>
          Submit Investment
        </Button>
        <Button color="red" onClick={onClose} ripple={true}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default InvestModal;
