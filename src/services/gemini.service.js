
import ai from "../config/gemini.js";

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3.8-flash";

export const generateAIResponse = async (prompt) => {
    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt
    });

    const text = response.text;

    if (!text) {
        throw new Error("Gemini returned an empty response");
    }

    return text;
};
