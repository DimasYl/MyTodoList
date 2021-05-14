import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'ea6367b3-487e-4d1f-82bd-c02cf44f6f25'
    }
})

type TodoType = {
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