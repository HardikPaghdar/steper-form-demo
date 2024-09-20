//GLOBAL STATUS
exports.STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}

//GLOBAL MESSAGES
exports.STATUS_MESSAGES = {
    CLIENT_LIST: "Clients retrieved successfully.",
    REPORT_TYPE_LIST: "Report types retrieved successfully.",
    FORM_SAVE_SUCCESS: "Data saved successfully.",
    CLIENT_ID_REQUIRED: "Client id is required.",
    CLIENT_LOAN_NUMBER_REQUIRED: "Client loan number is required.",
    REPORT_TYPE_REQUIRED: "Report type is required.",
    PROPERTY_UPLOAD_TYPE_REQUIRED: "Property upload type is required.",
    ADDRESS_REQUIRED: "Address is required.",
    PROPERTY_TYPE_REQUIRED: "Property type is required.",
    PROPERTY_SPECS_REQUIRED: "Property specs are required.",
    CONTACT_INFORMATION_REQUIRED: "Contact information required.",
}

exports.STATUS = {
    ERROR: 0,
    SUCCESS: 1,
}

