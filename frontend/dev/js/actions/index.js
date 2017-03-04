import {fabric} from 'fabric-webpack';


const IMAGE_SELECTED = 'IMAGE ADD'

export const selectImage = (url) => {
	return{
		type: IMAGE_SELECTED,
		object: {
         "type": "image",
         "crossOrigin": "use-credentials",
         "src": url,
         "originX": "center",
         "originY": "center",
         "left": 50,
         "top": 50,
         "width": 100,
         "height": 100,
         "fill": "#FF00FF",
         "stroke": null,
         "strokeWidth": 1,
         "strokeDashArray": null,
         "strokeLineCap": "butt",
         "strokeLineJoin": "miter",
         "strokeMiterLimit": 10,
         "scaleX": 1,
         "scaleY": 1,
         "angle": 0,
         "flipX": false,
         "flipY": false,
         "opacity": 1,
         "shadow": null,
         "visible": true,
         "clipTo": null,
         "backgroundColor": "",
         "fillRule": "nonzero",
         "globalCompositeOperation": "source-over",
         "transformMatrix": null,
         "radius": 50,
         "startAngle": 0,
         "endAngle": 6.283185307179586
      }
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

export const previewImage = (image) => {
	return{
		type: "PREVIEW_IMAGE",
		url: image
	}
};
