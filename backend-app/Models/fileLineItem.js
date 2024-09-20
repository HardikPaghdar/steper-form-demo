const fileLineItemSchema = require('./../Schema/fileLineItem');

class FileLineItemModel {

    async list() {
        return await fileLineItemSchema.find();
    }

    async add(data) {
        return await fileLineItemSchema.create(data);
    }

    async findOne(request_id) {
        return await fileLineItemSchema.findById(request_id)
    }

    async update(request_id, data) {
        return await fileLineItemSchema.findByIdAndUpdate(request_id, data, { new: true })
    }

    async delete(request_id) {
        return await fileLineItemSchema.findByIdAndRemove(request_id)
    }
}

module.exports = FileLineItemModel;
