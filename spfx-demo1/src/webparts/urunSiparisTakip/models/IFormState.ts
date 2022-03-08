
export enum FormStateType{
    Loading,
    Loaded,
    InvalidForm,
    Success,
    Fail
}


export interface IFormState {
    FormStateType: FormStateType,
    Message: string;
}