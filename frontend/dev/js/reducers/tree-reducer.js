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
        case 'TEXT_ADDED':
            return Object.assign({}, state, {
                new_image: "https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2015/02/TextFill_image5.png",
                new_id: action.id,
                event: "new"
            })
        case 'FREEHAND_ADDED':
            return Object.assign({}, state, {
                new_image: "https://cdn3.iconfinder.com/data/icons/doodles/100/doodles-36-512.png",
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
        case 'IMAGE_ADDED':
            return Object.assign({}, state, {
        		new_image: action.url,
                event: "new"
            })
        case 'SAVE_TREE':
            return Object.assign({},state,{
                event: "save",
                endP:action.endP
            })
        case 'LOAD_TREE':
            return Object.assign({},state,{
                event: "load",
                endP_l:action.endP
            })
		default:
			return state

	}
	

}