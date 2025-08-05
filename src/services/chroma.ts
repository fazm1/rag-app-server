import { ChromaClient } from 'chromadb';
import { embedText } from './embedding';

const client = new ChromaClient({
     path: process.env.CHROMA_URL || 'http://localhost:8000'
});


const embeddingFunction = {
  generate: async (texts: string[]) => {
    return await Promise.all(texts.map(embedText));
  },
};

const COLLECTION_NAME = 'pdf_chunks';

let collectionPromise = client.getOrCreateCollection({
  name: COLLECTION_NAME,
  metadata: { description: 'Chunks of PDF text' },
  embeddingFunction, 
});

export const storeChunks = async (chunks: string[]) => {
  const collection = await collectionPromise;

  const embeddings = await embeddingFunction.generate(chunks);

  await collection.add({
    ids: chunks.map((_, i) => `chunk-${Date.now()}-${i}`),
    documents: chunks,
    embeddings,
  });
};

export const querySimilarChunks = async (query: string, k = 5): Promise<string[]> => {
  const collection = await collectionPromise;

  const [queryEmbedding] = await embeddingFunction.generate([query]);

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: k,
  });

  return (results.documents?.[0] ?? []).filter((d): d is string => d !== null);
};
