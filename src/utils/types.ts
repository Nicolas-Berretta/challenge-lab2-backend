
export type UserType = {
    id: number
    name: string
    email: string
}

export type Token = {
    id:number
    name:string
    email:string
    expiresIn:string
}

export type EmailSendResult = {
    id?: string
    message?: string
    status: number
    details?: string
}

export type EmailData = {
    from: string;
    to: string,
    subject:string,
    body:string
}

export type Stat = {
    email: string,
    count: number
}

export type EmailType = {
    id: number
    senderEmail: string
    to: string
    sentDate: Date
}