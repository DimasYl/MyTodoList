import React, {useEffect, useState} from 'react'
import {taskApi} from "../api/tasks-api";

export default {
    title: 'API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7bc5d7c3-6064-41bb-8793-dd2eec236b7f'
        taskApi.getTask(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7bc5d7c3-6064-41bb-8793-dd2eec236b7f'
        let title = 'Black'
        taskApi.createTask(todolistId, title)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '7bc5d7c3-6064-41bb-8793-dd2eec236b7f'
        let taskId = '3b4ddebe-541e-4b6c-a2fc-3c2ae2d0d374'
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '7bc5d7c3-6064-41bb-8793-dd2eec236b7f'
        let title = 'Ziza'
        let taskId = '2e83c6d5-9786-45fb-9075-569af6031297'

        taskApi.updateTask(todolistId, title, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}

