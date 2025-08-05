import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import apiRoutes from './routes/query.routes';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://chroma-production-14ba.up.railway.app"],
    credentials: true,
}));
app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
