import axios from "axios";

export async function generatedImageService(prompt: string): Promise<any> {
    const { data } = await axios.post('http://localhost:8080/api/v1/dalle', { prompt: prompt });
    return data
}



