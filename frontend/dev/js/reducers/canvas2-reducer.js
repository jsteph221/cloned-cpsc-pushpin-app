// don't be scared, just some initial objects to play with (fabric's serialized JSON)

const initialState = {
   canvasObject: {
      "objects": [{
         "type": "circle",
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
      }, {
         "type": "rect",
         "originX": "center",
         "originY": "center",
         "left": 126,
         "top": 210,
         "width": 100,
         "height": 100,
         "fill": "#FF0000",
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
      }, {
         "type": "triangle",
         "originX": "center",
         "originY": "center",
         "left": 250,
         "top": 100,
         "width": 100,
         "height": 100,
         "fill": "#00F00F",
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
      }],
      "background": ""
   }
}

export default function canvasObjectReducer(state = initialState, action) {
   switch (action.type) {
      case "OBJECTS_CANVAS_CHANGE":
         return Object.assign({}, state, {
            canvasObject: action.payload.canvasObject,
            selectedObject: action.payload.selectedObject
         });
      default:
         return state
   }
   return state;
}