import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as dotenv from 'dotenv'
import mongoose from "mongoose";
import postsRouter from "./routes/posts"
import dalleRouter from "./routes/dalle"
import fs from 'fs';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
    let log = `User visited at ${new Date()} with IP address: ${req.socket.remoteAddress}\n`;
    fs.appendFile('visitor_logs.txt', log, (err) => {
        if (err) throw err;
        console.log('Visitor log saved successfully.');
    });
    next();
});

app.use('/api/v1/post', postsRouter)
app.use('/api/v1/dalle', dalleRouter)

app.get('/', async (req: Request, res: Response) => {
    res.send("Hello world")
})

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => { console.log("mongoDB connected") })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`api listening to port ${process.env.PORT}`);
        });
    }).catch((error) => {
        console.log(error + ' did not connect!')
    });