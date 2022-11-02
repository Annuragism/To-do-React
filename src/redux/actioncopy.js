export function addUser({id,name}) {
    return {
        payload : {
            id,
            name
        },
        type:"ADD_TASK"
    }
}
