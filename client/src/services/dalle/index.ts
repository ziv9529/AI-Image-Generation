import axios from "axios";

export async function generatedImageService(prompt: string, count: string): Promise<any> {
    const { data } = await axios.post('http://localhost:8080/api/v1/dalle', { prompt: prompt, numOfImage: count });
    // console.log(data.images)
    // // const image = aiResponse.data.data[0].b64_json;
    // .data[0].b64_json
    return data.images.data
}



