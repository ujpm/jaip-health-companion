const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const openAIConfig = {
  apiKey: OPENAI_API_KEY,
  baseUrl: "https://api.openai.com/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
  },
};
