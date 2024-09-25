export class LoginForm{
    username:string
    password:string
    constructor(){
        this.username=""
        this.password=""
    }
}

export type Item = {
    id: number
    name: string
    price: number
    quantity: number
    category: string
}