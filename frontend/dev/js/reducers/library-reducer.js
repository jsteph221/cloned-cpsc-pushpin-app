import {selectUser} from '../actions';

const initialState = {

	fabricImages: []
}

export default function library(state = initialState, action) {

	switch (action.type){

		case 'IMAGE_SELECTED':
			return Object.assign({}, state, {
				fabricImages: [
					...state.fabricImages,
					{
						url: action.url,
						width: 50,
						height: 50,
						left: 300,
						top: 150
					}
				]
			})
		default:
			return state

	}
	

}