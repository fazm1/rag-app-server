import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function generateAnswerFromGroq(messages: any[]) {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama3-70b-8192", 
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to get response from Groq");
  }
}
