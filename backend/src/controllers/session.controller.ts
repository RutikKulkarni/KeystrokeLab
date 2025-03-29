import { Request, Response } from "express";
import { AppError } from "../middleware/error.middleware";
import Session from "../models/session.model";
import { ISession, SessionAnalysis } from "../types/session";

export const saveSession = async (req: Request, res: Response) => {
  try {
    const sessionData: Partial<ISession> = {
      ...req.body,
      userId: req.userId,
    };

    const session = await Session.create(sessionData);

    const insights = calculatePsychologicalInsights(session);
    session.psychologicalInsights = insights;
    await session.save();

    res.status(201).json({
      message: "Session saved successfully",
      session,
    });
  } catch (error) {
    throw new AppError("Error saving session", 500);
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(sessions);
  } catch (error) {
    throw new AppError("Error fetching sessions", 500);
  }
};

export const analyzeSession = async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    if (!session) {
      throw new AppError("Session not found", 404);
    }

    if (session.userId.toString() !== req.userId) {
      throw new AppError("Unauthorized access to session", 403);
    }

    const analysis: SessionAnalysis = {
      session,
      insights: calculatePsychologicalInsights(session),
    };

    res.json(analysis);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Error analyzing session", 500);
  }
};

function calculatePsychologicalInsights(session: ISession) {
  const avgTypingDuration =
    session.typingDurations.reduce((a, b) => a + b, 0) /
    session.typingDurations.length;
  const maxTypingDuration = Math.max(...session.typingDurations);

  return {
    impulsivity: Math.min(
      session.totalErrors / session.text.split(" ").length,
      1
    ),

    cognitiveLoad: Math.min(maxTypingDuration / 2000, 1),

    resilience: Math.max(1 - avgTypingDuration / 1000, 0),

    anxiety: Math.min(
      session.typingDurations.filter((d) => d > avgTypingDuration * 1.5)
        .length / session.typingDurations.length,
      1
    ),
  };
}
