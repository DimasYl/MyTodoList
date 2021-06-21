import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '9796e0df-7156-4180-913f-3e6c30a4c76a'
    }
})

export type TodoType = {
    id:string
    addedDate: string
    order: number
    title:string
}

type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: []
    messages: string[],
    data: T
}

export const todolistApi = {
    getTodo() {
       return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>('/todo-lists',{title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string,title: string) {
        return  instance.put<ResponseType>(`/todo-lists/${todolistId}`,{title})
    }

}