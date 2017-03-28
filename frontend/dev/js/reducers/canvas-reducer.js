import {previewImage,imageSaved,imageRendered} from '../actions';

const initialState = {

	src: ""
}

export default function canvas_reducer(state = initialState, action) {

	switch (action.type){

		case 'PREVIEW_IMAGE':
			return Object.assign({}, state, {
                src:  action.url,
                sizeX: action.sizeX,
                sizeY: action.sizeY,
                event: "preview"
            })
        case 'IMAGE_SAVED':
            return Object.assign({},state,{
                new_imageKey:action.key,
            })
        case 'TREE_SELECT':
        	return Object.assign({},state,{
            	selection: action.selection,
                event:"tree_select"
            })
		default:
			return state

	}
}
	
	