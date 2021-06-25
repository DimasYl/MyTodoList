import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, IconButton} from "@material-ui/core";
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {fetchTasksTC, TaskPriorities, TaskStatuses} from "./state/tasks-reducer";
import {FilterValueType} from "./AppWithRedux";
import {RequestStatusType} from "./app/app-reducer";

type TodoListPropsType = {
    id: string
    title: string
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    addTask: (taskTitle: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeFilter: (newFilterValue: FilterValueType, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
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

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('TodoList called')
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchTasksTC(props.id))
    },[])

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
        taskForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {taskForTodolist.map(t => <Task key={t.id}
                                                task={t}
                                                removeTask={props.removeTask}
                                                changeTaskStatus={props.changeTaskStatus}
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

