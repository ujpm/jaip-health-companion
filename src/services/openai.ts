import { toast } from "@/components/ui/use-toast";

// Use import.meta.env to access Vite environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

export async function getAIResponse(messages: Array<{ role: string; content: string }>) {
  try {
    console.log("Checking API key configuration...");
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not found in environment variables");
      throw new Error("OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.");
    }

    console.log("Making API request to OpenAI...");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are JAIP AI, a helpful medical assistant. Provide clear, concise medical advice while being empathetic and professional.",
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log("Response status:", response.status);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`Failed to get AI response: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("Successfully received AI response");
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to get AI response. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
}