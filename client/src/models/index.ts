export interface RenderCardPropsModel {
    data: postModel[],
    title: string
}

export interface postModel {
    name: string,
    prompt: string,
    photo: string
}
export interface generatePostModel {
    name: string,
    prompt: string,
    photo: string[]
}
export interface cardModel {
    _id: string,
    name: string,
    prompt: string,
    photo: string
}

export interface formFieldModel {
    LableName: string,
    type: string,
    name: string,
    placeholder: string,
    value: string
    handleChange: any,
    isSurpriseMe?: boolean,
    handleSurpriseMe?: any
}

