# AI PDF Assistant Backend

This is the backend of an AI-powered PDF assistant built using **TypeScript**, **Express**, and **Node.js**. It allows users to upload PDF files, extract content, generate embeddings, store data in a vector database (Chroma), and query them via an LLM (GROQ).

---

## Features

-  Upload and parse PDF documents
-  Generate embeddings for document chunks
-  Store embeddings in a vector database (Chroma)
-  Query the document content via GROQ (LLM)
-  Middleware for handling file uploads

---

## Project Structure

```
src/
├── server.ts                  # Server entry point
├── controllers/
│   └── query.controller.ts   # Handles user queries and orchestrates logic
├── middlewares/
│   └── upload.ts             # Multer setup for file uploads
├── routes/
│   └── query.routes.ts       # API endpoint definitions
├── services/
│   ├── chroma.ts             # Chroma vector database interaction
│   └── embedding.ts          # Embedding generation logic
├── utils/
│   ├── groqUtils.ts          # GROQ helper functions
│   └── pdfUtils.ts           # PDF parsing and chunking
```

---

##  Getting Started

### Prerequisites

- Node.js >= 18
- Yarn or npm
- Docker Desktop installed
- Chroma DB running locally or in the cloud
- GROQ API key (for LLM responses)
- Cohere API key (for embeddings)

### Installation
```
1. clone this repo
2. open terminal and run: "docker-compose up --build" (Docker desktop must be installed first)
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
CHROMA_API_URL=http://chromadb:8000
EMBEDDING_API_KEY=cohere_api_key
GROQ_API_KEY=groq_api_key
```


### API Endpoint:

## POST `/api/query`
- Upload a PDF and index its content while providing a query.

---

### Tech Stack

- **Node.js + Express**
- **TypeScript**
- **Chroma DB**
- **Cohere (Embeddings)**
- **GROQ (LLM Querying)**
- **Multer (File Upload)**

---

## License

MIT
