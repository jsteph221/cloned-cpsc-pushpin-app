import {selectUser,previewImage} from '../actions';

const initialState = {
	src: ""
}
export default function library(state = initialState, action) {

	switch (action.type){

		case 'IMAGE_SELECTED':
			return Object.assign({}, state, {
                src:  action.url,
            	new_id: action.id,
                event: "draw"
            })
        case 'RENDERED_CLICKED':
            var index = action.url.lastIndexOf('/');
            var key = action.url.slice(index);
            return Object.assign({},state,{
                key:key,
                event: "addJson"
            })
        case 'PREVIEW_IMAGE':
			return Object.assign({}, state, {
                src:  action.url,
                sizeX: action.sizeX,
                sizeY: action.sizeY,
                event: "preview"
            })
        
		default:
			return state

	}
}