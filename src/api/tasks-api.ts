import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'ea6367b3-487e-4d1f-82bd-c02cf44f6f25'
    }
})

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
    updateTask(todolistId: string,title: string,taskId: string) {
        return  instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`,{title})
    }

}