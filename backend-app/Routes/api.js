const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto')

const clientController = new (require('./../Controllers/client'))();
const reportTypeController = new (require('./../Controllers/repportType'))();
const formIntakeController = new (require('./../Controllers/form'))();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, generateRandomString(8)+'-'+Date.now() + path.extname(file.originalname));
    }
});

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() !== '.xlsx') {
        return cb(new Error('Only .xlsx files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {files: 4}
}).array('files', 4);

function multerErrorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        console.log(err);
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                return res.handler.validationMessage({status: STATUS.ERROR, message: 'File size too large (max 2MB per file)'});
            case 'LIMIT_FILE_COUNT':
                return res.handler.validationMessage({status: STATUS.ERROR, message: 'Too many files (max 4 files allowed)'});
            default:
                return res.handler.validationMessage({status: STATUS.ERROR, message: err.message});
        }
    } else if (err) {
        console.list(err);
        return res.handler.validationMessage({status: STATUS.ERROR, message: err.message});
    }
    next();
}

router.route('/clients').get(clientController.list);
router.route('/report-types').get(reportTypeController.list);
router.route('/form').post(upload, multerErrorHandler, (req, res) => formIntakeController.add(req, res));
module.exports = router
