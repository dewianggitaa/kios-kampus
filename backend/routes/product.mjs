import { Router } from "express";
import Product from "../models/products.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { productValidation } from "../middleware/validate.mjs";
import multer from 'multer';
import path from 'path';

const router = new Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.get("/api/products", async (req, res) => {
    try {
        const result = await Product.findAll();
        console.log("get products success");
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post(
    "/api/product",
    upload.single("image"),
    checkSchema(productValidation),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const data = matchedData(req);

        if (req.file) {
            data.image = req.file.path;
        }

        try {
            const newProduct = await Product.create(data);
            res.status(201).json(newProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
);

export default router;
