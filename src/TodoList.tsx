import React, {useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, IconButton} from "@material-ui/core";
import {Task} from "./Task";

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

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('TodoList called')

    const all = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const active = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const completed = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    function removeTodolist() {
        props.removeTodolist(props.id)
    }

    let taskForTodolist = props.tasks

    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(t => t.isDone)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {taskForTodolist.map(t => <Task key={t.id}
                                                task={t}
                                                removeTask={props.removeTask}
                                                changeStatus={props.changeStatus}
                                                changeTaskTitle={props.changeTaskTitle}
                                                todolistId={props.id}

                />)}
            </ul>
            <div>
                <Button color={"default"} variant={props.filter === 'all' ? "contained" : "text"}
                        onClick={all}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={active}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                        onClick={completed}>Completed
                </Button>
            </div>
        </div>
    )
})

