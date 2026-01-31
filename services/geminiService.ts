
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis, Activity } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getSpiritualAnalysis(activities: Activity[], score: number): Promise<AIAnalysis> {
  const completedNames = activities.filter(a => a.completed).map(a => a.label).join(", ");
  const missingNames = activities.filter(a => !a.completed).map(a => a.label).join(", ");

  const prompt = `Analyze a person's current walk with God based on today's spiritual activities. 
  Completed: [${completedNames}]. 
  Not completed: [${missingNames}]. 
  Attunement Score: ${score}%.
  
  Provide a brief, compassionate, and encouraging reflection (2-3 sentences). 
  Include a powerful Bible verse that fits their situation.
  Provide 3 specific suggestions for deepening their faith.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reflection: { type: Type.STRING },
            verse: { type: Type.STRING },
            reference: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["reflection", "verse", "reference", "suggestions"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result as AIAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      reflection: "God's grace is sufficient for you. Your journey is unique, and today is a new opportunity to seek His presence.",
      verse: "The Lord is near to all who call on him, to all who call on him in truth.",
      reference: "Psalm 145:18",
      suggestions: [
        "Take 5 minutes for silent listening prayer.",
        "Read one chapter from the Gospel of John.",
        "Send an encouraging text to a friend."
      ]
    };
  }
}
