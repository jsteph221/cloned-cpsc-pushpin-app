import {previewImage} from '../actions';

const initialState = {

	src: ""
}

export default function preview(state = initialState, action) {

	switch (action.type){

		case 'PREVIEW_IMAGE':
			return Object.assign({}, state, {
                src:  action.url
            })
		default:
			return state

	}
}
	