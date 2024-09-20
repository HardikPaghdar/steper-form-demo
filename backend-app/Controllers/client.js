const { STATUS_MESSAGES,STATUS } = require('./../Configs/constants');

const ClientModel = new (require('./../Models/client'))();

class ClientController {
    async list(req, res) {
        try {
            let data = await ClientModel.list();
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.CLIENT_LIST});
        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = ClientController;
