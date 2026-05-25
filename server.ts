import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please add it to Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for real-time AI copywriting / analysis trial (Gemini API Integration)
  app.post("/api/gemini/generate", async (req: Request, res: Response): Promise<void> => {
    try {
      const { prompt, context = "general" } = req.body;

      if (!prompt || typeof prompt !== "string") {
        res.status(400).json({ error: "Missing prompt parameter." });
        return;
      }

      const ai = getGeminiClient();

      // System Instructions based on context to provide high quality customized feedback
      let systemInstruction = "You are an AI assistant in marketing analytics for the Aetheris SaaS Platform. ";
      if (context === "copywrite") {
        systemInstruction += "You are a master conversion copywriter. Write stunningly short, Punchy and professional copy (1-2 sentences max). Focus on benefit-driven hooks.";
      } else if (context === "analyze") {
        systemInstruction += "You are a senior data analyst. Synthesize the user's data or query into a short list of 3 highly actionable bullet points under 50 words total.";
      } else {
        systemInstruction += "Provide brief, professional answers under 60 words.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || "No response generated.";
      res.json({ text });
    } catch (error: any) {
      console.error("Gemini route error:", error);
      res.status(500).json({ 
        error: error.message || "An unexpected error occurred during Generation",
        isConfigError: !process.env.GEMINI_API_KEY
      });
    }
  });

  // Health endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
