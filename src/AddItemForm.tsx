import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (taskTitle: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm called')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Titles is required')
        }
        setTitle('')
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !==null){
            setError(null)
        }
        if (e.key === 'Enter') addTask()
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    return <div>
        <TextField variant={"outlined"}
                   value={title}
                   onChange={changeTitle}
                   onKeyPress={onKeyPressAddTask}
                   error={!!error}
                   label={'Title'}
                   helperText={error}
                   onBlur={() => {
                       setError(null)
                   }}
        />
        <IconButton color={"primary"} onClick={addTask}>
            <AddBox/>
        </IconButton>
    </div>
})