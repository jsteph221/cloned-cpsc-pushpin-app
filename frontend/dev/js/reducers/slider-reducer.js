const initialState = {
    value: 28,
}

export default function slider(state = initialState, action) {

    switch (action.type){

        case 'SLIDER_CHANGE':
            return Object.assign({}, state, {
                value: action.value,
            })

        default:
            return state

    }

}