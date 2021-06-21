import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '9796e0df-7156-4180-913f-3e6c30a4c76a'
    }
})

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type TaskType = {
    addedDate: string
    deadline: number
    description: number
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todoListId: string
}

type TasksType = {
    error: number
    totalCount: number
    items: Array<TaskType>
}

type ResponseType<T = {}> = {
    fieldsErrors: []
    messages: string[]
    resultCode: number
    data: T
}



export const taskApi = {
    getTask(todolistId: string) {
       return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string,title: string) {
        return instance.post<ResponseType<{item:TasksType}>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId: string,taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }

}