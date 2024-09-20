const clientSchema = require('./../Schema/client');

class ClientModel {

    async list() {
        return await clientSchema.find();
    }

    async add(data) {
        return await clientSchema.create(data);
    }

    async findOne(request_id) {
        return await clientSchema.findById(request_id)
    }

    async update(request_id, data) {
        return await clientSchema.findByIdAndUpdate(request_id, data, { new: true })
    }

    async delete(request_id) {
        return await clientSchema.findByIdAndRemove(request_id)
    }
}

module.exports = ClientModel;
