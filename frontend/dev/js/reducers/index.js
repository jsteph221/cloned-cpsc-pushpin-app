import {combineReducers} from 'redux';
import LibReducer from './library-reducer';
import SliderReducer from './slider-reducer';
import CanvasReducer from './canvas-reducer';
import ColorReducer from './color-reducer';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    slider: SliderReducer,
    library: LibReducer,
    preview: CanvasReducer,
    color: ColorReducer
});

export default allReducers
