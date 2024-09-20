

class ResponseHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    sender(code, data, meta, error) {
        this.res
            .status(code)
            .json({
                data,
                meta
                
            })
        if(error) {
			// HANDLE LOGS AND OTHER STUFF
            // console.log("ResponseHandler -> sender -> error", error)
        }
    }

    
    custom(...args) { this.sender(...args) }

    

    // 2XX SUCCESS
    success(data, meta) { 
        this.sender(
            STATUS_CODES.SUCCESS,
            data, 
            meta
        ) 
    }

    created(data, meta) { 
        this.sender(
            STATUS_CODES.CREATED,
            data, 
            meta
        )
    }

    validationMessage(meta) { 
        this.sender(
            STATUS_CODES.SUCCESS,
            null, 
            meta
        )
    }

    // 4XX CLIENT ERROR
    badRequest(data, message, info) {
        this.sender(
            STATUS_CODES.BAD_REQUEST,
            message || 'Request line contained invalid characters.',
            data, info
        )
    }

    unauthorized(data, message, info) { 
        this.sender(
            STATUS_CODES.UNAUTHORIZED,
            message || 'You are not authorized to access.',
            data, info
        )
    }

    forbidden(data, message, info) { 
        this.sender(
            STATUS_CODES.FORBIDDEN,
            message || 'You are not authorized to access.',
            data, info
        )
    }

    alreadyReport(data, message, info) { 
        this.sender(
            STATUS_CODES.NOT_VALID_DATA,
            message || 'Already Reported',
            data, info
        )
    }

    notValidEmail(data, message, info) { 
        this.sender( 
            STATUS_CODES.NOT_FOUND,
            message || 'Mailchimp is use only valid email, Please use valid email!!',
            data, info
        )
    }

    notFound(data, message, info) { 
        this.sender( 
            STATUS_CODES.NOT_FOUND,
            message || 'Resource associated with the request could not be found.',
            data, info
        )
    }


    preconditionFailed(data, message, info) { 
        this.sender( 
            STATUS_CODES.PRECONDITION_FAILED,
            message || 'Please complete other steps first',
            data, info
        )
    }

    validationError(data, message, info) { 
        this.sender( 
            STATUS_CODES.VALIDATION_ERROR,
            message || 'Validation error !',
            data, info
        )
    }
    
    
    // 5XX SERVER ERROR
    serverError(error, data, message){ 
        if(error.name === "ValidationError")
            return this.validationError(error)

        this.sender(
            STATUS_CODES.SERVER_ERROR,
            message || 'Request failed due to an internal error.',
            data, error
        )
    }
}

module.exports = ResponseHandler;