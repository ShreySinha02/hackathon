import { useState, useEffect, ChangeEvent } from 'react';
import Challenge from '../components/challenge/Challenge';
import Filter from '../components/filter/Filter';

// Define the updated type for a challenge object with status and levelType fields
interface ChallengeType {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  image: string;
  levelType: string; // Field for level (easy, medium, hard)
  status: string; // Field for status (upcoming, active, past)
}

function ExploreChallenge() {
  const [searchTerm, setSearchTerm] = useState('');
  const [challenges, setChallenges] = useState<ChallengeType[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<ChallengeType[]>([]);
  const [filters, setFilters] = useState({ status: [], level: [] });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const url = import.meta.env.VITE_API_URL_STAGING;

  // Function to determine the status of the challenge based on the start and end dates
  const determineStatus = (startDate: string, endDate: string): string => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'active';
    return 'past';
  };

  // Fetch challenges from the server and set the status based on the dates
  const fetchChallenges = async () => {
    try {
      const response = await fetch(`${url}/challenge`);
      const data: ChallengeType[] = await response.json();
      
      // Update challenges with status field
      const updatedChallenges = data.map((challenge) => ({
        ...challenge,
        status: determineStatus(challenge.startDate, challenge.endDate),
      }));
      
      setChallenges(updatedChallenges);
      setFilteredChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  useEffect(() => {
    // Filter challenges based on the selected filters
    const filtered = challenges.filter((challenge) => {
      const matchesStatus = !filters.status.length || filters.status.includes(challenge.status);
      const matchesLevel = !filters.level.length || filters.level.includes(challenge.levelType);
      return matchesStatus && matchesLevel;
    });
    setFilteredChallenges(filtered);
  }, [filters, challenges]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Remove filter tag when the user clicks the 'x' button
  const removeFilterTag = (type: 'status' | 'level', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item: string) => item !== value),
    }));
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-green-400">
      <div className="p-4 h-full flex-col w-9/12">
        {/* Search and Filter Section */}
        <div className="flex justify-center space-x-4 items-center mb-6">
          <input
            type="text"
            placeholder="Search Challenges..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-1/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.status.map((status) => (
            <span key={status} className="bg-gray-200 text-gray-800 p-2 rounded flex items-center">
              {status}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeFilterTag('status', status)}
              >
                ×
              </button>
            </span>
          ))}
          {filters.level.map((level) => (
            <span key={level} className="bg-gray-200 text-gray-800 p-2 rounded flex items-center">
              {level}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeFilterTag('level', level)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Filter Dropdown */}
        {isFilterOpen && (
          <div className="relative">
            <div className="absolute top-0 left-[50%] mt-2 bg-white p-4 rounded-lg shadow-lg z-10 w-full max-w-sm">
              <Filter setFilter={setFilters} />
            </div>
          </div>
        )}

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6">
          {filteredChallenges.map((challenge) => (
            <Challenge key={challenge._id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreChallenge;
