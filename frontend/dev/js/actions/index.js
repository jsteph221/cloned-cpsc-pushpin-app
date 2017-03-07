const IMAGE_SELECTED = 'IMAGE_SELECTED'

export const selectImage = (image) => {
	return{
		type: IMAGE_SELECTED,
		url: image
	}
};


export const sliderChange = (size) => {
    return{
        type: 'SLIDER_CHANGE',
        value: size
    }
};



export const previewImage = (image) => {
	return{
		type: "PREVIEW_IMAGE",
		url: image
	}
};
