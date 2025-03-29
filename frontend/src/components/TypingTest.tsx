import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import apiClient from "../utils/api";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly.",
  "In 2024, 73% of companies invested $5.2M in AI technology. During Q1-Q4, profits rose by 12.8%, while 9/10 executives reported satisfaction.",
  "Mr. Smith's car broke down at 123 Main St., causing a 30-minute delay. He called Dr. Johnson @ 3:45 PM to reschedule their 4:00 PM meeting!",
];

interface TypingTestProps {
  duration: 15 | 30;
}

const TypingTest: React.FC<TypingTestProps> = ({ duration }) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [errors, setErrors] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endTest();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTest = () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setInput("");
    setErrors([]);
    setTimeLeft(duration);
  };

  const calculateWPM = (input: string, timeElapsed: number) => {
    const words = input.trim().split(" ").length;
    const minutes = timeElapsed / 60;
    return Math.round(words / minutes);
  };

  const calculateAccuracy = (input: string, errors: number[]) => {
    const totalChars = input.length;
    const errorCount = errors.length;
    return Math.round(((totalChars - errorCount) / totalChars) * 100);
  };

  const endTest = async () => {
    setIsRunning(false);
    if (!startTime) return;

    const timeElapsed = (Date.now() - startTime) / 1000;
    const wpm = calculateWPM(input, timeElapsed);
    const accuracy = calculateAccuracy(input, errors);

    const testResults = {
      wpm,
      accuracy,
      totalErrors: errors.length,
      errorWords: input.split(" ").filter((_, i) => errors.includes(i)),
      typingDurations: [],
      duration,
      text,
      userId: user?.id,
    };

    setResults(testResults);

    try {
      await apiClient.post("/sessions", testResults);
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isRunning) return;

    const newInput = e.target.value;
    setInput(newInput);

    const newErrors = [];
    const inputChars = newInput.split("");
    const textChars = text.split("");

    for (let i = 0; i < inputChars.length; i++) {
      if (inputChars[i] !== textChars[i]) {
        newErrors.push(i);
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Typing Test ({duration}s)</h2>
        <div className="text-xl font-semibold">Time: {timeLeft}s</div>
      </div>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p className="text-lg font-mono">{text}</p>
      </div>

      <textarea
        className={`w-full p-4 border rounded font-mono ${
          errors.length > 0 ? "border-red-500" : "border-gray-300"
        }`}
        rows={4}
        value={input}
        onChange={handleInput}
        disabled={!isRunning}
        placeholder={isRunning ? "Start typing..." : "Click 'Start' to begin"}
      />

      <div className="mt-4 flex justify-between items-center">
        <button
          className={`px-6 py-2 rounded ${
            isRunning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={startTest}
          disabled={isRunning}
        >
          Start
        </button>

        {results && (
          <div className="text-right">
            <p className="text-lg font-semibold">WPM: {results.wpm}</p>
            <p className="text-lg font-semibold">
              Accuracy: {results.accuracy}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
