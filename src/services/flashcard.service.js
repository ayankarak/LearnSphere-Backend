
import { generateAIResponse } from "./gemini.service.js";

export const generateFlashcardsWithAI = async (lesson) => {
    const prompt = `
You are an expert educational flashcard generator for LearnSphere.

Generate exactly 15 useful study flashcards based on the lesson information below.

Lesson Title: ${lesson.title}
Lesson Description: ${lesson.description || "Not available"}

Rules:
- Create beginner-friendly and educational flashcards.
- Cover important concepts from the lesson.
- Each question should test one specific concept.
- Answers should be clear, accurate and concise.
- Do not create duplicate questions.
- Do not invent information that is not supported by the lesson details.
- Return ONLY valid JSON.
- Do not include markdown code blocks.

Required JSON format:
{
    "flashcards": [
        {
            "question": "What is ...?",
            "answer": "..."
        }
    ]
}
`;

    const response = await generateAIResponse(prompt);

    try {
        const parsedResponse = JSON.parse(response);

        if (
            !parsedResponse.flashcards ||
            !Array.isArray(parsedResponse.flashcards) ||
            parsedResponse.flashcards.length !== 15
        ) {
            throw new Error("Invalid flashcard response format");
        }

        for (const card of parsedResponse.flashcards) {
            if (
                typeof card.question !== "string" ||
                typeof card.answer !== "string" ||
                !card.question.trim() ||
                !card.answer.trim()
            ) {
                throw new Error("Invalid flashcard data");
            }
        }

        return parsedResponse.flashcards;
    } catch (error) {
        throw new Error("Failed to parse Gemini flashcard response");
    }
};
