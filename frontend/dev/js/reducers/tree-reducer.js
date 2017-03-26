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
        case 'TREE_ADD':
        	return Object.assign({}, state, {
        		new_image: action.url,
        		new_id: action.id,
                event: "new"
            })
        case 'IMAGE_DELETED':
        	return Object.assign({}, state, {
        		index_to_remove: action.index,
        		object_id: action.object,
                event: "delete"
            })
        case 'CANVAS_CLEARED':
        	return Object.assign({}, state, {
                event: "clear"
            })
		default:
			return state

	}
	

}