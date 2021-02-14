import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValueType = 'all' | 'active' | 'completed'


function App() {
    console.log(v1())
    //BLL:
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest Api', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    function removeTask(taskID: string){
        let newTask = tasks.filter(t => t.id !== taskID)
        setTasks(newTask)
    }

    function changeFilter(newFilterValue: FilterValueType) {
        setFilter(newFilterValue)
    }

    function addTask(taskTitle: string){
        let newTask = {
            id: v1(),title: taskTitle, isDone: false
        }
        setTasks([newTask,...tasks])
    }

    function changeStatus(taskID: string, isDone: boolean) {

        const newTask = tasks.map(t => {
            if (t.id === taskID) {
                return {...t, isDone: isDone}
            } else {
                return t
            }
        })
        setTasks(newTask)
    }


    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={'what to learn'}
                tasks={taskForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeStatus={changeStatus}
                changeFilter={changeFilter}
                filter={filter}
            />

        </div>
    );
}

export default App;


