import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {taskApi, UpdateTaskModelType} from "../api/tasks-api";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
   task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistId: string
}
type ActionType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTaskActionType

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":{
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.id)
            return stateCopy;
        }
        case "ADD-TASK": {
            let stateCopy = {...state}
            // let tasks = stateCopy[action.todolistId]
            // let newTask = {id: v1(), title: action.title, status: TaskStatuses.New,
            //         todoListId: action.todolistId, description: '',
            //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
            // stateCopy[action.todolistId] = [newTask, ...tasks]
            const tasks = stateCopy[action.task.todoListId]
            const newTask = [action.task, ...tasks ]
            stateCopy[action.task.todoListId] = newTask
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTask = state[action.todolistId]
            let newTaskArray = todolistTask.map(t => t.id === action.taskId
                ? {...t, status: action.status}
                : t)
            state[action.todolistId] = newTaskArray
            return {...state}
        }
        case "CHANGE-TASK-TITLE": {
            let todolistTask = state[action.todolistId]
            let newTaskArray = todolistTask.map(t => t.id === action.id
                ? {...t, title: action.title}
                : t)
            state[action.todolistId] = newTaskArray
            return {...state}
        }
        case "ADD-TODOLIST": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, title, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

export type SetTaskActionType = ReturnType<typeof setTasksAC>


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    taskApi.getTask(todolistId)
        .then((res)=>{
            const tasks = res.data.items
            // @ts-ignore
            dispatch(setTasksAC(tasks, todolistId))
        })
}

export const removeTaskTC = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    taskApi.deleteTask(todolistID, taskID)
        .then((res)=> {
            dispatch(removeTaskAC(taskID, todolistID))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    taskApi.createTask(todolistId, title)
        .then((res)=> {
            let task = res.data.data.item
            // @ts-ignore
            dispatch(addTaskAC(task))
        })
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()

    const allTasks = state.tasks
    const tasksForCurrentTodo = allTasks[todolistId]

    let updateTask = tasksForCurrentTodo.find(tl=>{
        return tl.id === taskId
    })

    if(updateTask) {

        const model: UpdateTaskModelType = {
            title: updateTask.title,
            status: status,
            deadline: updateTask.deadline,
            description: updateTask.description,
            priority: updateTask.priority,
            startDate: updateTask.startDate
        }

        //есть проще запись рабочая
        // const model = {...updateTask, status}

        taskApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                const newTask = res.data.data.item
                dispatch(changeTaskStatusAC(newTask.id, newTask.status, newTask.todoListId))
            })
    }
}