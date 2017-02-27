const IMAGE_SELECTED = 'IMAGE_SELECTED'

export const selectImage = (image) => {
	return{
		type: IMAGE_SELECTED,
		url: image
	}
};


export const selectUser = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};
