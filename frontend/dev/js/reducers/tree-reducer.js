const initialState = {

}
export default function tree_reducer(state = initialState, action) {

	switch (action.type){

		case 'IMAGE_UP':
			return Object.assign({}, state, {
                new_zindex:  action.index,
                object_id: action.object,
                event: "up"
            })
        case 'IMAGE_DOWN':
        	return Object.assign({}, state, {
                new_zindex:  action.index,
                object_id: action.object,
                event: "down"
            })
        case 'IMAGE_SELECTED':
        	return Object.assign({}, state, {
        		new_image: action.url,
                event: "new"
            })
        case 'IMAGE_DELETED':
        	return Object.assign({}, state, {
        		index_to_remove: action.index,
        		object_id: action.object,
                event: "delete"
            })
		default:
			return state

	}
	

}