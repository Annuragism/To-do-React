export function addTask({id,title,isComplete}) {
    return {
        payload : {
            id,
            title,
            isComplete,
            
        },
        type:"ADD_TASK"
    }
}

export function deleteTask({id}) {
    return {
        payload : {
            id
            
        },
        type:"DELETE_TASK"
    }
}
export function ResetAllTask() {
    return {
        type:"RESET_ALL_TASK"
    }
}
export function completeTask({id,isComplete}) {
    return {
        payload : {
            id,
            isComplete
            
        },
        type:"COMPLETE_TASK"
    }
}
export function EditTask({title,id}) {
    return {
        payload : {
            title,
            id
            
        },
        type:"EDIT_TASK"
    }
}