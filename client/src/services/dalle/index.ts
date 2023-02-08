import axios from "axios";

export async function generatedImageService(prompt: string, count: string): Promise<any> {
    const { data } = await axios.post('https://ai-image-generation-4aqw.onrender.com/', { prompt: prompt, numOfImage: count });
    return data.images.data
}



