const formIntakeSchema = require('./../Schema/formIntake');

class FormIntakeModel {

    async list() {
        return await formIntakeSchema.find();
    }

    async add(data) {
        return await formIntakeSchema.create(data);
    }

    async findOne(request_id) {
        return await formIntakeSchema.findById(request_id)
    }

    async update(request_id, data) {
        return await formIntakeSchema.findByIdAndUpdate(request_id, data, { new: true })
    }

    async delete(request_id) {
        return await formIntakeSchema.findByIdAndRemove(request_id)
    }
}

module.exports = FormIntakeModel;
