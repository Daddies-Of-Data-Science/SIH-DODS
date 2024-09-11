import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Spinner } from '@material-tailwind/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../fireBaseConfig";
import InvestModal from './InvestModal';

interface Startup {
  id: string;
  name: string;
  industry: string;
  valuation: number;
  fundingStage: string;
}

interface StartupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StartupFilterModal = (props: StartupModalProps) => {
  const { isOpen, onClose } = props;
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(false);
  const [isInvestmentModalOpen, setInvestmentModalOpen] = useState<boolean>(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  const fetchStartups = async () => {
    setLoading(true);  // Start loading
    try {
      const query = await getDocs(collection(db, 'startups'));
      const startupsData = query.docs.map((doc) => ({ id: doc.id, ...doc.data()} as Startup));
      setStartups(startupsData);
      console.log(startupsData);
      setFilteredStartups(startupsData);
    } catch (error) {
      console.error('Error fetching startups: ', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    setSelectedIndustry('All');
    if (isOpen) fetchStartups();
  }, [isOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterStartups(query, selectedIndustry);
  };

  const filterIndustry = (industry: string) => {
    setSelectedIndustry(industry);
    filterStartups(searchQuery, industry);
  };

  const filterStartups = (query: string, industry: string) => {
    let filtered = startups;

    if (industry) {
      filtered = filtered.filter(startup => startup.industry.toLowerCase() === industry.toLowerCase());
    }

    if (query) {
      filtered = filtered.filter(startup => startup.name.toLowerCase().includes(query));
    }

    setFilteredStartups(filtered);
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="lg" >
      <DialogHeader className='text-center flex justify-center'>Discover Startups</DialogHeader>
      <DialogBody divider className='max-h-[75vh] overflow-y-auto py-2 transition-all duration-200 ease-in-out'>
        {/* Search Input */}
        <input
            type="text"
            placeholder="Search startups by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 border focus:outline-light-blue-500  border-gray-300 rounded-lg w-full"
        />

        {/* Filter Tags */}
        <div className="flex gap-2 mb-4 mt-2">
          {['All', 'Technology', 'Healthcare', 'FinTech', 'FoodTech', 'EdTech', 'AI/ML'].map((industry, index) => (
            <Button
              key={index}
              variant={selectedIndustry === industry ? "filled" : "outlined"}
              onClick={() => filterIndustry(industry === 'All' ? '' : industry)}
              className='py-1 px-2 text-[10px]'
              color='blue'
            >
              {industry}
            </Button>
          ))}
        </div>

        
        {loading ? (
          <div className="flex justify-center items-center gap-3 h-full">
            <div className='text-black'>
                <Spinner className="h-8 w-8" />
            </div>
            <p className='text-md font-500'>Loading...</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3">
          {filteredStartups.map((startup, index) => (
            <div key={index} className="relative flex flex-col items-start bg-gray-100 p-4 rounded-lg shadow-md">
              <div className='w-full flex flex-row justify-between items-center'>
                <h3 className="text-xl font-semibold text-gray-700">{startup.name}</h3>
                <Button 
                  color="green"
                  onClick={() => {
                    // onClose();
                    setSelectedStartup(startup);
                    setInvestmentModalOpen(true);
                  }}
                  ripple={true}
                  className='px-2 py-2'
                >
                  Invest
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Industry: {startup.industry}</p>
              <p className="text-sm text-gray-500">Valuation: ₹{startup.valuation.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Funding Stage: {startup.fundingStage}</p>
            </div>
          ))}
        </div>
        )}
      </DialogBody>
      <DialogFooter className='flex justify-center'>
        <Button
          color="blue"
          onClick={onClose}
          ripple={true}
        >
          Close
        </Button>
        <InvestModal 
          isOpen={isInvestmentModalOpen} 
          onClose={() => {
            setInvestmentModalOpen(false);
            onClose();
          }} 
          fetchStartups={fetchStartups} 
          startup={selectedStartup} 
        />
      </DialogFooter>
    </Dialog>
  );
};

export default StartupFilterModal;