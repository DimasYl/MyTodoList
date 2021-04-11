import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValueType = 'all' | 'active' | 'completed'


function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'what to learn', filter: 'all'},
        {id: todolistID2, title: 'what to buy', filter: 'all'}
    ])


    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    function removeTodolist(id: string) {
        dispatchToTodolists(removeTodolistAC(id))
        dispatchToTasks(removeTodolistAC(id))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodolists(changeTodolistTitleAC(id, newTitle))
    }

    function removeTask(taskID: string, todolistID: string) {
        dispatchToTasks(removeTaskAC(taskID, todolistID))
    }

    function changeFilter(newFilterValue: FilterValueType, todolistID: string) {
        dispatchToTodolists(changeTodolistFilterAC(todolistID, newFilterValue))
    }

    function addTask(taskTitle: string, todolistID: string) {
        dispatchToTasks(addTaskAC(taskTitle, todolistID))
    }

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todolistID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, newTitle, todolistID))
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

export default AppWithReducers;


