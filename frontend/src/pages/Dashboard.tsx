import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LineChart, Trophy, Clock, Target, AlertCircle } from "lucide-react";
import apiClient from "../utils/api";

interface Session {
  _id: string;
  wpm: number;
  accuracy: number;
  totalErrors: number;
  duration: number;
  createdAt: string;
  psychologicalInsights?: {
    impulsivity: number;
    cognitiveLoad: number;
    resilience: number;
    anxiety: number;
  };
}

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchSessions = async () => {
      try {
        const response = await apiClient.get(`/sessions/${user.id}`);
        setSessions(response.data);
      } catch (err) {
        setError("Failed to load your typing history");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user, isAuthenticated, navigate]);

  const calculateStats = () => {
    if (sessions.length === 0)
      return { avgWpm: 0, avgAccuracy: 0, totalTests: 0, bestWpm: 0 };

    const totalWpm = sessions.reduce((sum, session) => sum + session.wpm, 0);
    const totalAccuracy = sessions.reduce(
      (sum, session) => sum + session.accuracy,
      0
    );
    const bestWpm = Math.max(...sessions.map((session) => session.wpm));

    return {
      avgWpm: Math.round(totalWpm / sessions.length),
      avgAccuracy: Math.round(totalAccuracy / sessions.length),
      totalTests: sessions.length,
      bestWpm,
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading your statistics...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600 mt-2">
            Track your typing progress and performance
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md"
        >
          Give the Test
        </button>
      </div>

      {error && (
        <div className="mb-8 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600">Best WPM</p>
              <p className="text-2xl font-bold">{stats.bestWpm}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <LineChart className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Average WPM</p>
              <p className="text-2xl font-bold">{stats.avgWpm}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <Target className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Average Accuracy</p>
              <p className="text-2xl font-bold">{stats.avgAccuracy}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <Clock className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold">{stats.totalTests}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold">Recent Tests</h2>
        </div>

        {sessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    WPM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Errors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.wpm}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.accuracy}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.totalErrors}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {session.duration}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500 flex flex-col items-center gap-2">
            <AlertCircle className="h-8 w-8" />
            <p>
              No typing tests completed yet. Take a test to see your results
              here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
