import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";

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
        const onchangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
        }
        return (
            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox onChange={onchangeStatusHandler} checked={t.isDone} color={"primary"}/>
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={removeTask}>
                <Delete/>
                </IconButton>
            </div>
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
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <Button color={"default"} variant={props.filter === 'all' ? "contained" : "text"} onClick={all}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"} onClick={active}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"} onClick={completed}>Completed
                </Button>
            </div>
        </div>
    )
}

