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
                new_id: action.id,
                event: "new"
            })
        case 'TEXT_ADDED':
            return Object.assign({}, state, {
                new_image: "https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2015/02/TextFill_image5.png",
                event: "new"
            })
        case 'FREEHAND_ADDED':
            return Object.assign({}, state, {
                new_image: "https://cdn3.iconfinder.com/data/icons/doodles/100/doodles-36-512.png",
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