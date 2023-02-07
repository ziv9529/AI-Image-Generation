import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.AI_SECRET_KEY
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req: Request, res: Response) => {
    res.send('hello from dalle')
})
router.route('/').post(async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })
        const image = aiResponse.data.data[0].b64_json;

        return res.status(200).json({ image })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error?.message })
    }
})

export default router;