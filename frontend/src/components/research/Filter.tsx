import React from 'react';

interface FilterByAreaOfResearchProps {
  selectedArea: string;
  onChange: (area: string) => void;
}

const FilterByAreaOfResearch: React.FC<FilterByAreaOfResearchProps> = ({ selectedArea, onChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Filter by Area of Research</h2>
      <input
        type="text"
        placeholder="Enter area of research"
        value={selectedArea}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg p-2 mb-2 w-full"
      />
    </div>
  );
};

export default FilterByAreaOfResearch;
