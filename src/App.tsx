import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValueType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'what to learn', filter: 'all'},
        {id: todolistID2, title: 'what to buy', filter: 'all'}
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest Api', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}],
        [todolistID2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},

        ]
    })

    function removeTodolist(todolistID: string) {
        let todolist = todolists.filter((tl) => tl.id !== todolistID)
        setTodolists(todolist)
        setTasks({...tasks})
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
        }
        setTodolists([...todolists])
    }

    function removeTask(taskID: string, todolistID: string) {
        let todolist = tasks[todolistID]
        tasks[todolistID] = todolist.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValueType, todolistID: string) {
        let todolist = todolists.find((tl) => tl.id === todolistID)
        if (todolist) {
            todolist.filter = newFilterValue
        }
        setTodolists([...todolists])
    }

    function addTask(taskTitle: string, todolistID: string) {
        let todolist = tasks[todolistID]
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        tasks[todolistID] = [newTask, ...todolist]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        let todolistTask = tasks[todolistID]
        let task = todolistTask.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        //достаем нужный массив по todolistID
        let todolistTask = tasks[todolistID]
        //находим нужную таску
        let task = todolistTask.find(tl => tl.id === taskID)
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle
        }
        //засетаем в стейт копию обьекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks})
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

export default App;


