const initialState = {

}
export default function tree_reducer(state = initialState, action) {

	switch (action.type){

		case 'IMAGE_UP':
			return Object.assign({}, state, {
                new_zindex:  action.index,
                new_object: action.object,
                event: "up"
            })
        case 'IMAGE_DOWN':
        	return Object.assign({}, state, {
                new_zindex:  action.index,
                new_object: action.object,
                event: "down"
            })
        case 'IMAGE_SELECTED':
        	return Object.assign({}, state, {
        		new_image: action.url,
                event: "new"
            })
		default:
			return state

	}
	

}