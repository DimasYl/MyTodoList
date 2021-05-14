import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state,setState] = useState<any>(null)
    useEffect(()=>{
        todolistApi.getTodo()
            .then((res)=>{
                setState(res.data)
            })
    },[])
    return <div> {JSON.stringify(state)} </div>
}

export const CreateTodolists = () => {
    const [state,setState] = useState<any>(null)
    useEffect(()=>{
        let title =  'VeNoM'
            todolistApi.createTodo(title)
                .then((res)=>{
                    setState(res.data)
                })
    },[])
    return <div> {JSON.stringify(state)} </div>
}

export const DeleteTodolists = () => {
    const [state,setState] = useState<any>(null)
    useEffect(()=>{
        const todolistId = '95933af7-0e45-4c99-9ac0-17b3633727d3'
        todolistApi.deleteTodo(todolistId)
            .then((res)=>{
                setState(res.data)
            })
    },[])
    return <div> {JSON.stringify(state)} </div>
}

export const UpdateTodolists = () => {
    const [state,setState] = useState<any>(null)
    useEffect(()=>{
        let title = 'Junior'
        const todolistId = 'ad420326-7d52-40a1-9025-b398f7a33cd2'
           todolistApi.updateTodo(todolistId,title)
                .then((res)=>{
                    setState(res.data)
                })
    },[])
    return <div> {JSON.stringify(state)} </div>
}