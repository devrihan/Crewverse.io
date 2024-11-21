

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
console.log(import.meta.env.VITE_GEMINI_API_KEY);

export const generateContent = async (prompt: string, type: string, mood: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const systemPrompt = `You are an expert content creator. Create ${type} content with a ${mood} mood that is engaging and professional. 
                         Format the response in markdown.`;
    
    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};
