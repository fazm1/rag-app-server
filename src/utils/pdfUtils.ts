import fs from 'fs';
import pdfParse from 'pdf-parse';

export const extractTextFromPDF = async (filePath: string): Promise<string> => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);  
  return data.text;
};

export const chunkText = (text: string, chunkSize = 500): string[] => {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  return chunks;
};
