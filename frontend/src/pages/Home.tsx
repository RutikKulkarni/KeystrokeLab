import React, { useState } from 'react';
import TypingTest from '../components/TypingTest';
import { Clock, Timer } from 'lucide-react';

const Home = () => {
  const [selectedDuration, setSelectedDuration] = useState<15 | 30>(30);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Speed Typing Test</h1>
        <p className="text-gray-600 mb-6">
          Test your typing speed and accuracy with our advanced typing test
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              selectedDuration === 15
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedDuration(15)}
          >
            <Clock size={20} />
            15 Seconds
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              selectedDuration === 30
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedDuration(30)}
          >
            <Timer size={20} />
            30 Seconds
          </button>
        </div>
      </div>

      <TypingTest duration={selectedDuration} />
    </div>
  );
};

export default Home;