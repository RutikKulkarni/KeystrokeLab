export interface ISession {
  userId: string;
  wpm: number;
  accuracy: number;
  totalErrors: number;
  errorWords: string[];
  typingDurations: number[];
  duration: 15 | 30;
  text: string;
  psychologicalInsights: {
    impulsivity: number;
    cognitiveLoad: number;
    resilience: number;
    anxiety: number;
  };
  createdAt: Date;
}

export interface SessionAnalysis {
  session: ISession;
  insights: {
    impulsivity: number;
    cognitiveLoad: number;
    resilience: number;
    anxiety: number;
  };
}