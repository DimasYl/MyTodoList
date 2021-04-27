import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
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

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.id)
            return stateCopy;
        }
        case "ADD-TASK": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS":{
            let todolistTask = state[action.todolistId]
            let newTaskArray = todolistTask.map(t=> t.id === action.id
                ? {...t, isDone: action.isDone}
            : t )
            state[action.todolistId] = newTaskArray
            return {...state}
        }
        case "CHANGE-TASK-TITLE":{
            let todolistTask = state[action.todolistId]
            let newTaskArray = todolistTask.map(t=> t.id === action.id
                ? {...t, title: action.title}
                : t )
            state[action.todolistId] = newTaskArray
            return {...state}
        }
        case "ADD-TODOLIST":{
            let stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
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

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type:"CHANGE-TASK-STATUS",id,isDone,todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type:"CHANGE-TASK-TITLE",id,title,todolistId}
}
