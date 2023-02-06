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