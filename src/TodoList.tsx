import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeFilter: (newFilterValue: FilterValueType, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListPropsType) {

    const all = () => props.changeFilter('all', props.id)
    const active = () => props.changeFilter('active', props.id)
    const completed = () => props.changeFilter('completed', props.id)


    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
        }
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type={"checkbox"}
                       checked={t.isDone}
                       onChange={changeStatus}
                />
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    function addTask(title: string) {
        debugger
        props.addTask(title, props.id)
    }
    function changeTodolistTitle(newTitle: string) {
        props.changeTodolistTitle(props.id, newTitle)
    }
    function removeTodolist() {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeTodolist}>x
                </button>
            </h3>
            <AddItemForm addItem={addTask}/>
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

