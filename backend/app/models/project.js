var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Project', new Schema({
	canvas: String,
	customImages : [{ type: Schema.Types.ObjectId, ref: 'CustomImage' }],
	renderedImages : [{ type: Schema.Types.ObjectId, ref: 'RenderedImage'}]
}));