import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config(); // load env variables into process.env object

const router = express.Router();

// handle error in case api key isn't set
if(!process.env.OPENAI_API_KEY) {
    console.error("OPENAI API Key not found");
    process.exit(1)
}

// create Configuration object to be used in OpenAIAPI object
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}); 

const openai = new OpenAIApi(config);

// define api response to GET requests to root path
//  respond with simple message
router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from Dall.E routes" })
});

// define api response to POST requests to root path
//  respond with generated image from DALL-E 
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const image = response.data.data[0].b64_json;

        res.status(200).json({ photo: image });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default router;