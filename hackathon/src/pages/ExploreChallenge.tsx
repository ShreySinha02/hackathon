import { useState, useEffect, ChangeEvent } from 'react';
import Challenge from '../components/challenge/Challenge';

// Define a type for a challenge object
interface ChallengeType {
  _id: string; // Add other relevant fields here based on your data structure
  name: string;
  startDate: string;
  endDate: string;
  image: string;
  // Add other fields as needed
}

function ExploreChallenge() {
  const [searchTerm, setSearchTerm] = useState('');
  const [challenges, setChallenges] = useState<ChallengeType[]>([]); // Use the defined type
  const url=import.meta.env.VITE_API_URL_STAGING
  console.log("uel",import.meta.env.VITE_API_URL_STAGING);
  // Function to fetch challenges from the server
  const fetchChallenges = async () => {
    try {
      const response = await fetch(`${url}/challenge`); // Adjust URL if necessary
      const data: ChallengeType[] = await response.json(); // Expect data to be an array of ChallengeType
      console.log('Fetched Challenges:', data); // Log fetched challenges
      setChallenges(data); // Store challenges in state
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  // Fetch challenges when the component mounts
  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
          <button className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            Filter
          </button>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6">
          {/* Render Challenge components with fetched data */}
          {challenges.map((challenge) => (
            <Challenge key={challenge._id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreChallenge;
