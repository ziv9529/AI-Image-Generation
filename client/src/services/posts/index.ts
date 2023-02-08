import axios from "axios";
import { postModel } from "../../models";

export async function fetchAllPostsService(): Promise<postModel[]> {
    const { data } = await axios.get('https://ai-image-generation-4aqw.onrender.com/');
    return data.posts
}
export async function uploadPostService(form: postModel): Promise<any> {
    const { data } = await axios.post('https://ai-image-generation-4aqw.onrender.com/', {
        name: form.name,
        prompt: form.prompt,
        photo: form.photo
    })
    return data
}
