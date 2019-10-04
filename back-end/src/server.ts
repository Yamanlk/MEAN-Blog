import * as express from "express";
import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken"
import * as cookieParser from "cookie-parser"
import * as path from "path"
import * as cors from "cors"

import { Env } from "./config/config"
import { router } from "./routes/index"

import errorHandler from "./middleware/error.handler"
import { InvalidDataError } from "shared";
const expressJsonParser = express.json({ type: 'application/json' });
const expressUrlencodedParser = express.urlencoded({ extended: false });

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

mongoose.connect(Env.db.url, { useNewUrlParser: true }, (err) => {
    throw err;
})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Connected to Database');
    app.listen(Env.port, () => console.log(`listening on port ${Env.port}...`));
});

const app = express();
app.use(cors({
    methods: ["GET", "POST", "DELETE", "PUT"]
}))
app.use(express.static(path.join(__dirname, 'view')))
app.use(expressJsonParser);
app.use(expressUrlencodedParser);
app.use(cookieParser());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.cookies.user) {
        if (jwt.verify(req.cookies.user, Env.jwtSecret)) {
            req.cookies.user = jwt.decode(req.cookies.user);
            next();
        }
        else
            next(new InvalidDataError({
                cookie: "invalid user token"
            }));
    }
    else
        next();
});
app.use('/api', router);
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.sendFile(path.join(__dirname, "view/index.html"))
});
app.use(errorHandler);
