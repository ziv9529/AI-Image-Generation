import axios from "axios";
import { postModel } from "../../models";

export async function fetchAllPostsService(): Promise<postModel[]> {
    const { data } = await axios.get('http://localhost:8080/api/v1/post');
    return data.posts
}
export async function uploadPostService(form: postModel): Promise<any> {
    const { data } = await axios.post('http://localhost:8080/api/v1/post', {
        name: form.name,
        prompt: form.prompt,
        photo: form.photo
    })
    return data
}
