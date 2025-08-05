import express from 'express';
import multer from 'multer';
import { handleQuery } from '../controllers/query.controller'
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post('/query', upload.single('file'), handleQuery);

export default router;
