import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":
            return [
                ...state, {id: action.todolistId, title: action.title, filter: "all"}
            ]
        case "CHANGE-TODOLIST-TITLE":
            let todolist1 = state.find(tl => tl.id === action.id)
            if (todolist1) {
                todolist1.title = action.title
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER":
            let todolist2 = state.find(tl => tl.id === action.id)
            if (todolist2) {
                todolist2.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("I don't understand this type")
    }
}
export const removeTodolistAC = (id: string):RemoveTodolistActionType  => {
    return { type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id,title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType):ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id,filter}
}