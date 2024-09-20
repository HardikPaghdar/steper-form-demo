const mongoose = require('mongoose');


const propertySpecsSchema = new mongoose.Schema({
    aboveGradeSqft: {
        type: Number,
        required: true,
    },
    isThereBasement: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    yearBuilt: {
        type: Number,
        required: true,
    },
    stories: {
        type: Number,
        required: true,
    },
    lotSize: {
        type: Number,
        required: true,
    }
});

const contactInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        maxLength : 15,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const formIntakeSchema = mongoose.Schema({
    clientId: {
        type:String,
        required: [true, 'Client ID is required']
    },
    clientLoanNumber: {
        type:String,
        required: [true, 'Client loan number is required']
    },
    reportType: {
        type:String,
        required: [true, 'Report type is required']
    },
    propertyUploadType: {
        type:String,
        required: [true, 'Property upload type is required']
    },
    address: {
        type:String,
        required: [true, 'Address is required']
    },
    propertyType: {
        type:String,
        required: [true, 'Property type is required']
    },
    propertySpecs: {
        type: propertySpecsSchema,
        required: true
    },
    contactInformation: {
        type: contactInfoSchema,
        required: true
    }
},{
    timestamps:true,
    collection: 'form_intake'
});

formIntakeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

formIntakeSchema.set('toJSON',{
    virtuals: true
});

module.exports = mongoose.model('form_intake', formIntakeSchema);
