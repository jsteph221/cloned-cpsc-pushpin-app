const initialState = {

}
export default function colorPicker(state = initialState, action) {

	switch (action.type){

		case 'COLOR_PICKED':
			return Object.assign({}, state, {
                color:  action.color
            })
		default:
			return state

	}
	

}