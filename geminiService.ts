
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSalesInsight = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tu es un expert en vente B2B pour LeaderPak. Fournis un court argument de vente persuasif de 2 phrases en français pour un directeur des achats de grande distribution (type BIM, Kazyon, Carrefour) envisageant le produit '${productName}'. Concentre-toi sur la rentabilité, la rotation des stocks ou la fiabilité industrielle de LeaderPak (fondée en 2013).`,
    });
    return response.text || "Ce produit offre une excellente rotation en rayon et des marges compétitives pour votre réseau de distribution.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "La forte demande du marché garantit un renouvellement rapide des stocks et une satisfaction client optimale.";
  }
};
