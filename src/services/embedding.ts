import axios from 'axios';

const API_KEY = process.env.EMBEDDING_API_KEY || '';
const BASE_URL = 'https://api.cohere.ai/v1/embed';

const MODEL = 'embed-english-v3.0'; 

export const embedText = async (text: string): Promise<number[]> => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        texts: [text], 
        model: MODEL,
        input_type: 'search_query', 
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.embeddings[0]; 
  } catch (error: any) {
    console.error('Embedding error:', error.response?.data || error.message);
    throw new Error('Failed to get embedding from Cohere');
  }
};
