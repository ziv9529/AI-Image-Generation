import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import preview from '../assets/preview.png'
import FormField from '../components/FormField'
import Loader from '../components/Loader'
import { generatePostModel } from '../models'
import { generatedImageService } from '../services/dalle'
import { uploadPostService } from '../services/posts'
import getRandomPrompt from '../utils/getRandomPrompt'


const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<generatePostModel>({ name: '', prompt: '', photo: [] });
    const [generatingImg, setGeneratingImg] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [imgCount, setImgCount] = useState<string>('2');
    const [selectedImg, setSelectedImg] = useState<string>('');

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const data = await generatedImageService(form.prompt, imgCount);
                const updatedPhotos = data.map((item: any) => `data:image/jpeg;base64,${item.b64_json}`)
                setForm({ ...form, photo: updatedPhotos });
            } catch (error) {
                console.log(error)
                alert(error)
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('please enter prompt')
        }
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const postForm = { name: form.name, prompt: form.prompt, photo: form.photo[parseInt(selectedImg)] }
                await uploadPostService(postForm);
                navigate('/')
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please enter a prompt and generate image')
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleImgCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImgCount(e.target.value)
    }
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt })
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
            </div>

            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <FormField
                        LableName="Your name"
                        type="text"
                        name="name"
                        placeholder="Ziv Ashkenazi"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        LableName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="a stained glass window depicting a hamburger and french fries"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <label className="block text-sm font-medium text-grey-900"> qty: {imgCount} </label>
                    <input disabled={generatingImg} type="range" name="range" id="range" min="1" max="3" defaultValue={imgCount} className="w-20" onChange={handleImgCountChange} />
                    <div className='flex flex-wrap'>
                        {Array.from({ length: parseInt(imgCount) }, (_, i) => (
                            <div onClick={() => {
                                if (!form.photo[i]) return
                                setSelectedImg(i.toString());
                            }} key={i} className={`${selectedImg === i.toString() ? "bg-gray-300" : ""} relative bg-gray-50 hover:bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-56 p-3 h-56 flex justify-center items-center m-3`}>
                                {form.photo[i] ? (
                                    <img src={form.photo[i]} alt={form.prompt} className='w-full h-full object-contain' />
                                ) : (
                                    <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain' />
                                )}
                                {generatingImg && <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'> <Loader /> </div>}
                            </div>
                        ))}
                    </div>

                </div>
                <div className='mt-5 flex gap-5'>
                    <button
                        disabled={loading}
                        type='button'
                        onClick={generateImage}
                        className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center '
                    > {generatingImg ? 'Generating...' : 'Generate Image'} </button>
                </div>
                <div className='mt-10'>
                    <p className='mt-2 text-[#666e75] text-[14px]'> Once you have created and chose the image you want, you can share it with others in the community</p>
                    <button disabled={(parseInt(imgCount) > 1 && !selectedImg) || generatingImg || !form.photo[0]} type='submit' className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-slate-300'>{loading ? 'Sharing...' : 'Share with the community'}</button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost