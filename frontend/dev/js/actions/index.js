const IMAGE_SELECTED = 'IMAGE_SELECTED'

export const pickColor = (color) => {
	return{
		type: "COLOR_PICKED",
		color: color
	}
};

export const textAdd = () => {
	return{
		type: "TEXT_ADDED"
	}
};

export const freehandAdd = () => {
	return{
		type: "FREEHAND_ADDED"
	}
};

export const treeSelect = (id) => {
	return{
		type: "TREE_SELECT",
		selection: id
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

export const imageDeleted = (index, object) => {
	return{
		type: "IMAGE_DELETED",
		index: index,
		object: object
	}
};
export const imageAddedJson = (url) => {
    return {
        type: "IMAGE_ADDED",
        url:url
    }
};

export const selectImage = (image, id) => {
	return{
		type: IMAGE_SELECTED,
		url: image,
		id: id
	}
};

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

