const mongoose = require('mongoose');

const reportTypeSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Name is required']
    },
},{
    timestamps:true,
    collection: 'report_types'
});

// Changing "_id" key to "id"
reportTypeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

reportTypeSchema.set('toJSON',{
    virtuals: true
});

module.exports = mongoose.model('report_types', reportTypeSchema);
