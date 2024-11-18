import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import '../strategies/local-strategy.mjs';
import routes from '../routes/index.mjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(cookieParser("sangatrahasiacuy"));
app.use(session({
    secret: "inilebihrahasia",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 6000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use('/images', express.static('../images'));

app.get("/", (req, res) => {
    console.log("hello world");
    return res.send("hola juga");
});

export default function handler(req, res) {
    app(req, res);
}
