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



export const selectUser = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};
