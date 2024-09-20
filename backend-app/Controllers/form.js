const {sendToQueue} = require('./../services/rabbitmqService');
const {STATUS_MESSAGES, STATUS} = require('./../Configs/constants');
const FormIntakeModel = new (require('./../Models/formIntake'))();

class FormController {
    async add(req, res) {
        let data = req.body;
        data.propertySpecs = JSON.parse(req.body.propertySpecs);
        data.contactInformation = JSON.parse(req.body.contactInformation);
        try {
            if (!data.clientId) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.CLIENT_ID_REQUIRED});
                return;
            } else if (!data.clientLoanNumber) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.CLIENT_LOAN_NUMBER_REQUIRED });
                return;
            } else if (!data.reportType) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.REPORT_TYPE_REQUIRED });
                return;
            } else if (!data.propertyUploadType) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.PROPERTY_UPLOAD_TYPE_REQUIRED });
                return;
            } else if (!data.address) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.ADDRESS_REQUIRED });
                return;
            }  else if (!data.propertyType) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.PROPERTY_TYPE_REQUIRED});
                return;
            }
            else if (!data.propertySpecs) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.PROPERTY_SPECS_REQUIRED });
                return;
            } else if (!data.contactInformation) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.CONTACT_INFORMATION_REQUIRED });
                return;
            }

            let savedRecord = await FormIntakeModel.add(data);

            if (!req.files || req.files.length === 0) {
                return res.handler.validationMessage({ status: STATUS.ERROR, message: 'No files uploaded' });
            }

            // Queue each file for background processing
            req.files.forEach(file => {
                const message = { filePath: file.path, dataId: savedRecord._id.toString() };
                sendToQueue('fileProcessingQueue', message);
            });

            return res.handler.created(savedRecord, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.FORM_SAVE_SUCCESS });
        } catch (error) {
            console.log(error, '---')
            res.handler.serverError(error);
        }
    }
}

module.exports = FormController;
