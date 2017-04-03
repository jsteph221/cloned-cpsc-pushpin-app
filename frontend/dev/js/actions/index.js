const IMAGE_SELECTED = 'IMAGE_SELECTED'

export const pickColor = (color) => {
	return{
		type: "COLOR_PICKED",
		color: color
	}
};

export const textAdd = (id) => {
	return{
		type: "TEXT_ADDED",
		id: id
	}
};

export const freehandAdd = (id) => {
	return{
		type: "FREEHAND_ADDED",
		id: id
	}
};

export const treeSelect = (id, num) => {
	return{
		type: "TREE_SELECT",
		id: id,
		tree_num: num
	}
};

export const canvasCleared = () => {
	return{
		type: "CANVAS_CLEARED"
	}
};

export const imageBroughtUp = (index, object) => {
	return{
		type: "IMAGE_UP",
		index: index,
		object: object
	}
};

export const imageSentDown = (index, object) => {
	return{
		type: "IMAGE_DOWN",
		index: index,
		object: object
	}
};

export const imageDeleted = (index, id, object) => {
	return{
		type: "IMAGE_DELETED",
		index: index,
		id: id,
		object: object
	}
};

export const imageAddedJson = (url) => {
    return {
        type: "IMAGE_ADDED",
        url:url
    }
};

export const treeAdd = (image, id) => {
	return{
		type: "TREE_ADD",
		url: image,
		id: id
	}
}

export const selectImage = (image, id) => {
	return{
		type: IMAGE_SELECTED,
		url: image,
		id: id
	}
};
export const saveLayerTree = (key) =>{
    return{
        type:"SAVE_TREE",
        endP:key
    }
}
export const loadLayerTree = (key) =>{
    return{
        type:"LOAD_TREE",
        endP:key
    }
}

export const sliderChange = (size) => {
    return{
        type: 'SLIDER_CHANGE',
        value: size
    }
};

export const previewImage = (image,x,y) => {
	return{
		type: "PREVIEW_IMAGE",
		url: image,
        sizeX:x,
        sizeY:y
	}
};
export const selectRendered = (image)=>{
    return{
        type:'RENDERED_CLICKED',
        url:image
    }
}
export const imageRendered = (key) => {
	return{
		type: "IMAGE_SAVED",
        key: key
	}
}

