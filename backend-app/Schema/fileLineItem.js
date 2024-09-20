const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    }
});

const fileLineItemSchema = mongoose.Schema({
    formIntakeId: { type: Schema.Types.ObjectId, required: true, ref: 'form_intake' },
    fileData: [itemsSchema],
},{
    timestamps:true,
    collection: 'file_line_items'
});

fileLineItemSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

fileLineItemSchema.set('toJSON',{
    virtuals: true
});

module.exports = mongoose.model('file_line_items', fileLineItemSchema);
