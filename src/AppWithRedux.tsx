import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TasksStateType, TodolistType} from "./App";
import {AppRootStateType} from "./state/store";


export type FilterValueType = 'all' | 'active' | 'completed'


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id))
        dispatch(removeTodolistAC(id))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
        dispatch(action)
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    function removeTask(taskID: string, todolistID: string) {
        dispatch(removeTaskAC(taskID, todolistID))
    }

    function changeFilter(newFilterValue: FilterValueType, todolistID: string) {
        dispatch(changeTodolistFilterAC(todolistID, newFilterValue))
    }

    function addTask(taskTitle: string, todolistID: string) {
        dispatch(addTaskAC(taskTitle, todolistID))
    }

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistID))
    }


    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge='start' color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let taskForTodolist = tasks[tl.id]
                            if (tl.filter === 'active') {
                                taskForTodolist = tasks[tl.id].filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                taskForTodolist = tasks[tl.id].filter(t => t.isDone)
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeStatus={changeStatus}
                                        changeFilter={changeFilter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


