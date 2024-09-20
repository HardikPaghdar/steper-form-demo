import React from 'react';

type FileUploadProps = {
    required: boolean;
    label: string;
    identifier: string;
    errorMessage: string;
    isInvalid: boolean;
    handleFileChange?: (e) => void;
};

const FileUpload: React.FC<FileUploadProps> = (props) => {
    return (
        <div className="mb-4">
            <label className={`form-label fs-4 ${props.required ? 'required' : ''}`} htmlFor={props.identifier}>
                {props.label}
            </label>
            <input
                type="file"
                id={props.identifier}
                className={`form-control fs-4 ${props.isInvalid ? 'is-invalid' : ''}`}
                onChange={props.handleFileChange}
                multiple
                accept=".xlsx"
            />
            {props.isInvalid && <p className="invalid-feedback fs-4">{props.errorMessage}</p>}
        </div>
    );
};

export default FileUpload;
