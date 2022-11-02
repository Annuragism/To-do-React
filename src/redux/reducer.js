


const intialState = [];

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            let payload = action.payload
            return [payload,...state]

        case 'DELETE_TASK':
        const filteredArray = state.filter(item => item.id !== action.payload.id)
            return filteredArray
            case 'RESET_ALL_TASK':
            return []
        case 'COMPLETE_TASK':
            const completedTaskArray = state.map((item, index) => {
                if (item.id === action.payload.id) {
                     item.isComplete = action.payload.isComplete;
                }
                return item 
            })
            return completedTaskArray
         case 'EDIT_TASK':
            const EditedArray = state.map((item, index) => {
                if (item.id === action.payload.id) {
                     item.title = action.payload.title;
                }
                return item 
            })
            return EditedArray

        default:
            return state
    }
}

export default reducer