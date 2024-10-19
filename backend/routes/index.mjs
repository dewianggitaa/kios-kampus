import { Router } from "express";
import productRouter from './product.mjs';

const router = Router();

router.use(productRouter);


export default router;