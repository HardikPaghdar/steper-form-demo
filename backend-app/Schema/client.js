const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Name is required']
    },
},{
    timestamps:true,
    collection: 'clients'
});

ClientSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ClientSchema.set('toJSON',{
    virtuals: true
});

module.exports = mongoose.model('clients', ClientSchema);
