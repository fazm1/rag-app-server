import { Request, Response } from 'express';
import { extractTextFromPDF, chunkText } from '../utils/pdfUtils';
import { createAndStoreChunks, querySimilarChunks } from '../services/chroma';
import { generateAnswerFromGroq } from '../utils/groqUtils';

export const handleQuery = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const fullText = await extractTextFromPDF(req.file.path);
    const chunks = chunkText(fullText, 100); // 100 words per chunk

    const collectionName = await createAndStoreChunks(chunks);

    const relevantChunks = await querySimilarChunks(collectionName, req.body.query);

    const context = relevantChunks.join('\n\n');

    const messages = [
      {
        role: 'system',
        content: 'You are a helpful assistant that answers user questions using the provided context extracted from a PDF, in no more than two paragraphs.',
      },
      {
        role: 'user',
        content: `${req.body.query}\n\nContext:\n${context}`,
      },
    ];

    const answer = await generateAnswerFromGroq(messages);

    res.status(200).json({ answer });
  } catch (err) {
    console.error('Error in handleQuery:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
