import express, { response } from 'express';
import { db } from './db.mjs';
import { matchedData, checkSchema, validationResult } from 'express-validator';
import { userValidation } from './middleware/validate.mjs';
import cors from 'cors'; // Impor cors
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { hashPassword } from './middleware/helpers.mjs';
import User from './models/user.mjs';
import passport from 'passport';
import './strategies/local-strategy.mjs'


const app = express();

app.use(cookieParser("sangatrahasiacuy"))
app.use(session({
    secret: "inilebihrahasia",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true, maxAge: 6000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.get("/", (req, res) => {
    
    console.log("hello world")
    return res.send("hola juga")
})

app.get('/api/users', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post(
    '/api/signup', 
    checkSchema(userValidation), 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const data = matchedData(req);
        data.password = hashPassword(data.password)
        const { name, email, no_wa, password } = data;
        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
            console.log('Email sudah terdaftar');
            return;
            }

            const newUser = await User.upsert({name, email, no_wa, password})
            res.status(201).json(data);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
});

app.post("/api/signin", passport.authenticate('local'), (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
    res.cookie('halo', 'mahasiswas', {maxAge: 6000 * 60 *24, signed:true})
    try {
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
