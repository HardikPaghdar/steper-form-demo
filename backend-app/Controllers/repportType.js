const { STATUS_MESSAGES,STATUS } = require('./../Configs/constants');

const ReportTypeModel = new (require('./../Models/reportType'))();

class ReportTypeController {
    async list(req, res) {
        try {
            let data = await ReportTypeModel.list();
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.REPORT_TYPE_LIST});
        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = ReportTypeController;
