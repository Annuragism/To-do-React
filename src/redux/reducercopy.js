const intialState = [];

const reducercopy = (state = intialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            let payload = action.payload
            return [payload,...state]

        default:
            return state
    }
}

export default reducercopy