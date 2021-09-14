import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    fetchTodolistTC,
    removeTodolistTC, TodolistDomainType,
    updateTodolistTitleTC
} from "./state/todolists-reducer";
import {addTaskTC, changeTaskTitleAC, removeTaskTC, TaskStatuses, updateTaskStatusTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {RequestStatusType} from "./app/app-reducer";
import {ErrorSnackbar} from "./ErrorSnackbar/ErrorSnackbar";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'


const AppWithRedux = React.memo(() => {

    useEffect(()=>{
        dispatch(fetchTodolistTC())
    },[])

    console.log('AppWithRedux called')

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()


    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    },[])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    },[])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(updateTodolistTitleTC(id, newTitle))
    },[])

    const removeTask = useCallback((taskID: string, todolistID: string) => {
            dispatch(removeTaskTC(taskID, todolistID))
    },[])

    const changeFilter = useCallback((newFilterValue: FilterValueType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, newFilterValue))
    },[])

    const addTask = useCallback((taskTitle: string, todolistID: string) => {
        dispatch(addTaskTC(todolistID, taskTitle))
    },[])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskStatusTC(taskId, status, todolistId))


    }, []);

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistID))
    },[])


    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress color="secondary" />}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <p>todolists</p>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let taskForTodolist = tasks[tl.id]

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        entityStatus={tl.entityStatus}
                                        title={tl.title}
                                        tasks={taskForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeStatus}
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
})

export default AppWithRedux;


