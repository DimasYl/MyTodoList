import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string) => void
    removeTask: (taskID: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    changeFilter: (newFilterValue: FilterValueType) => void
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('')
    const all = () => props.changeFilter('all')
    const active = () => props.changeFilter('active')
    const completed = () => props.changeFilter('completed')
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type={"checkbox"}
                       checked={t.isDone}
                       onChange={changeStatus}
                /> <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error? 'error' : ''}
                    onBlur={()=>{setError(null)}}
                />
                <button onClick={addTask}>+</button>
                {error&&<div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={all}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={active}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={completed}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList