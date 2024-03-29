import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan called')

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ?
        <TextField variant={"outlined"} value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

})