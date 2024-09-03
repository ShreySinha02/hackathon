import { useState, useEffect } from 'react';

interface FilterProps {
  setFilter: (filters: { status: string[]; level: string[] }) => void;
}

function Filter({ setFilter }: FilterProps) {
  // State for selected filters
  const [status, setStatus] = useState<string[]>([]);
  const [level, setLevel] = useState<string[]>([]);

  // Options for status and level
  const statusOptions = ['upcoming', 'active', 'past'];
  const levelOptions = ['easy', 'medium', 'hard'];

  // Handler for checkbox changes
  const handleCheckboxChange = (value: string, type: string) => {
    if (type === 'status') {
      setStatus((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    } else if (type === 'level') {
      setLevel((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };

  // Update the filters whenever status or level changes
  useEffect(() => {
    setFilter({ status, level });
  }, [status, level, setFilter]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter</h2>

      {/* Status Filter */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={status.includes(option)}
                onChange={() => handleCheckboxChange(option, 'status')}
                className="form-checkbox text-blue-600 focus:ring-blue-500 rounded"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Level Filter */}
      <div>
        <h3 className="font-medium mb-2">Level</h3>
        <div className="flex flex-wrap gap-2">
          {levelOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={level.includes(option)}
                onChange={() => handleCheckboxChange(option, 'level')}
                className="form-checkbox text-blue-600 focus:ring-blue-500 rounded"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
