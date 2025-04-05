import { GoogleGenAI } from "@google/genai";
import { config } from "./config";

export const ai = new GoogleGenAI(
  {
    apiKey: config.chat.key
  }
);