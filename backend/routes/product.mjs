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



router.get("/api/products/:users_id", async (req, res) => {
    const users_id = req.params.users_id;
    try {
        const findProduct = await Product.findAll({ where: { users_id } });
        if (!findProduct) return res.sendStatus(404);
        return res.json(findProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

router.get("/api/product/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const findProduct = await Product.findByPk(id);
        if(!findProduct) return res.sendStatus(404);
        return res.json(findProduct)
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
})

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

router.patch(
    "/api/product/:id",
    upload.single("image"),
    async (req, res) => {

        const product_id = req.params.id;
        const data = req.body;

        if (req.file) {
            data.image = req.file.path;
        }

        try {
            const [updatedRows] = await Product.update(data, { where: { product_id } });

            if (updatedRows === 0) {
                return res.status(404).json({ message: 'Product not found or no changes made' });
            }

            const updatedProduct = await Product.findOne({ where: { product_id } });
            res.status(200).json(updatedProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
);

router.delete("/api/product/:id", async(req, res) => {
    const product_id = req.params.id;
    try {
        const deleteProduct = await Product.destroy({where: {product_id}})

        if(deleteProduct === 0) {
            console.log("Product not found")
        } else{
            console.log("Product deleted!")
            res.send("Product deleted!")
        }

    } catch (error) {
        console.log(error)
    }
})

export default router;
