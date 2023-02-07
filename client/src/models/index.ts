export interface RenderCardPropsModel {
    data: any,
    title: any
}

export interface postModel {
    name: string,
    prompt: string,
    photo: string
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

