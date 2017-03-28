import {selectUser} from '../actions';

const initialState = {

	src: ""
}
export default function library(state = initialState, action) {

	switch (action.type){

		case 'IMAGE_SELECTED':
			return Object.assign({}, state, {
                src:  action.url,
                event: "draw"
            })
        case 'RENDERED_CLICKED':
            var index = action.url.lastIndexOf('/');
            var key = action.url.slice(index);
            return Object.assign({},state,{
                key:key,
                event: "addJson"
            })
		default:
			return state

	}
}