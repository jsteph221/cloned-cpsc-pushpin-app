import {previewImage,imageSaved} from '../actions';

const initialState = {

	src: ""
}

export default function preview(state = initialState, action) {

	switch (action.type){

		case 'PREVIEW_IMAGE':
			return Object.assign({}, state, {
                src:  action.url,
                sizeX: action.sizeX,
                sizeY: action.sizeY,
            })
        case 'IMAGE_SAVED':
            return Object.assign({},state,{
              url: action.url  
            })
        case 'TREE_SELECT':
        	return Object.assign({},state,{
            	selection: action.selection
            })
		default:
			return state

	}
}
	