import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { Response } from "../utils/Responsehandler.js";
import { Faqs } from "../utils/AiFaqs.js";
import UserModel from "../Models/UserModel.js";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const ChatBotController = async (req, res) => {
  try {
      const userId = req.user 
       const user = await UserModel.findById(userId)
       if(!user){
        return Response(res,401,"User not found")
       }
    const { role, message } = req.body;

    if (!message) {
      return Response(res, 400, "Message is required");
    }
    // Convert FAQs to plain text format
    const faqText = Faqs.map(
      (f, i) => `Q${i + 1}: ${f.question}\nA: ${f.answer}`
    ).join("\n\n");
    // Custom prompt for Estato-specific answers
    const prompt = `
You are an expert real estate assistant for Estato.
Use ONLY the following FAQ information to answer user queries.
If the user's question is not related to these FAQs, reply:
"Sorry, I don’t have that information right now. Please contact estato@support.com for help."

FAQs:
${faqText}
User (${role || "User"}): ${message}
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      temperature: 0.7, // creativity control
      max_output_tokens: 500,
    });

    const reply =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I cannot answer that.";
    // console.log("RAW GEMINI RESPONSE:", JSON.stringify(response, null, 2));
    return Response(res, 200, "Success", { role: "system", reply });
  } catch (error) {
    console.log("Chatbot error:", error.response || error.message);
    return Response(res, 500, "Internal server error");
  }
};
