const reportTypeSchema = require('./../Schema/reportType');

class ReportTypeModel {

    async list() {
        return await reportTypeSchema.find();
    }

    async add(data) {
        return await reportTypeSchema.create(data);
    }

    async findOne(request_id) {
        return await reportTypeSchema.findById(request_id)
    }

    async update(request_id, data) {
        return await reportTypeSchema.findByIdAndUpdate(request_id, data, { new: true })
    }

    async delete(request_id) {
        return await reportTypeSchema.findByIdAndRemove(request_id)
    }
}

module.exports = ReportTypeModel;
