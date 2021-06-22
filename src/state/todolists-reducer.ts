import {v1} from "uuid";
import {todolistApi, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType

export let todolistID1 = v1()
export let todolistID2 = v1()

export type FilterValueType = 'all' | 'active' | 'completed'

const initialState: TodolistDomainType[] = []
export type TodolistDomainType = TodoType & {filter: FilterValueType }

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {

        case "SET-TODOLISTS":{
            return action.todolists.map((tl)=>{
                return {...tl, filter: "all"}
            })
        }

        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all'}, ...state]

        case "CHANGE-TODOLIST-TITLE":
            let todolist1 = state.find(tl => tl.id === action.id)
            if (todolist1) {
                todolist1.title = action.title
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER": {
            let todolist2 = state.find(tl => tl.id === action.id)
            if (todolist2) {
                todolist2.filter = action.filter
            }
        }
        default:
            return state
    }
}
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}

export type SetTodolistActionType = ReturnType<typeof setTodolistAC>

export const setTodolistAC = (todolists: Array<TodoType>) => {
    return {type: "SET-TODOLISTS", todolists} as const
}

export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    todolistApi.getTodo()
        .then((res)=>{
            dispatch(setTodolistAC(res.data))
        })
}


export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodo(title)
        .then((res)=>{

            dispatch(addTodolistAC(res.data.data.item))
        })
}


export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodo(todolistId)
        .then((res)=>{

            dispatch(removeTodolistAC(todolistId))
        })
}

export const updateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodo(todolistId, title)
        .then((res)=>{
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}