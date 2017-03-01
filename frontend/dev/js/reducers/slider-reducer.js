const initialState = {
    value: 100,
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