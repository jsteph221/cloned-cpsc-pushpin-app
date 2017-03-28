import {selectUser} from '../actions';

const initialState = {

	src: ""
}
export default function library(state = initialState, action) {

	switch (action.type){

		case 'IMAGE_SELECTED':
			return Object.assign({}, state, {
                src:  action.url,
                draw: true,
            	new_id: action.id
            })
		default:
			return state

	}
	

}