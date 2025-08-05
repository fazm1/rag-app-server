import { ChromaClient } from 'chromadb-client';
import { embedText } from './embedding';

const client = new ChromaClient({
  path: process.env.CHROMA_URL || 'http://localhost:8000',
});

const embeddingFunction = {
  generate: async (texts: string[]) => {
    return await Promise.all(texts.map(embedText));
  },
};

export const createAndStoreChunks = async (chunks: string[]): Promise<string> => {
  const collectionName = `pdf_${Date.now()}`;

  await client.createCollection({
    name: collectionName,
    metadata: { description: 'Chunks for a single PDF file' },
    embeddingFunction,
  });

  const collection = await client.getCollection({
    name: collectionName,
    embeddingFunction,
  });
  
  const embeddings = await embeddingFunction.generate(chunks);

  await collection.add({
    ids: chunks.map((_, i) => `chunk-${Date.now()}-${i}`),
    documents: chunks,
    embeddings,
  });

  return collectionName; 
};

export const querySimilarChunks = async (
  collectionName: string,
  query: string,
  k = 5
): Promise<string[]> => {
  const collection = await client.getCollection({
    name: collectionName,
    embeddingFunction,
  });

  const [queryEmbedding] = await embeddingFunction.generate([query]);

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: k,
  });

  return (results.documents?.[0] ?? []).filter((d): d is string => d !== null);
};
