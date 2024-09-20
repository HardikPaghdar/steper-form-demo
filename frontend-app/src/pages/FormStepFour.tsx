import {useEffect, useState} from "react";
import AppForm from '../components/UI/AppForm'
import BottomPanel from '../components/UI/BottomPanel'
import StepNumber from '../components/UI/StepNumber'
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import * as Yup from "yup";
import {fileValidationMessages, fileValidations} from "../util/validation";
import FileUpload from "../components/UI/FileUpload";
import {submitDataAndSubscribe} from "../components/store/formSlice";
import {toast} from "react-toastify";
import io, {Socket} from 'socket.io-client';

const FormStepFour = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.formMode)
    const [socket, setSocket] = useState<Socket>(null);
    const [formId, setFormId] = useState('');
    const [errorMessages, setErrorMessages] = useState(fileValidationMessages())
    const [errors, setErrors] = useState(fileValidations())
    const [selectedFiles, setSelectedFiles] = useState([])
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [fileUploadLineItems, setFileUploadLineItems] = useState<any>([]);

    const fileValidationSchema = Yup.object().shape({
        files: Yup.array()
            .of(
                Yup.object().shape({
                    fileName: Yup.string().required('File name is required'),
                    fileSize: Yup.number().max(5000000, 'File size must be less than 5MB'),
                    fileType: Yup.string().oneOf(['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'], 'Invalid file type'),
                })
            )
            .max(4, 'You can upload a maximum of 4 files')
            .test('has-files', 'At least one file is required', value => value && value.length > 0)
    });

    useEffect(() => {
        const newSocket = io(`${import.meta.env.VITE_SOCKET_URL}`);
        setSocket(newSocket);
        return () => {
            if (newSocket) {
                newSocket.close();
            }
        };
    }, []);

    useEffect(() => {
        if (socket && formId) {
            socket.on(`fileProcessed-${formId}`, (eventData: any) => {
                const {processedData} = eventData;
                setFileUploadLineItems((prevState) => ({
                    ...prevState,
                    lineItems: [...(prevState.lineItems || []), processedData]
                }));
            });
            // Clean up the listener when dataId changes or component unmounts
            return () => {
                socket.off(`fileProcessed-${formId}`);
            };
        }
    }, [socket, formId]);

    const submitData = async () => {
        const isFilesValid = await handleFileValidation();
        if (!isFilesValid) {
            return;
        }
        const formData = new FormData();
        formData.append('clientId', data.clientId)
        formData.append('clientLoanNumber', data.clientLoanNumber)
        formData.append('reportType', data.reportType)
        formData.append('propertyUploadType', data.propertyUploadType)
        formData.append('address', data.address)
        formData.append('propertyType', data.propertyType)
        formData.append('propertySpecs', JSON.stringify(data.propertySpecs))
        formData.append('contactInformation', JSON.stringify(data.contactInformation))
        const filesArray = Array.from(selectedFiles);
        filesArray.forEach((file) => {
            formData.append(`files`, file);
        });

        try {
            setDisableSubmit(true);
            const response = await dispatch(submitDataAndSubscribe(formData));
            if (response.type.endsWith('fulfilled')) {
                const {meta} = response.payload;
                const {status, message} = meta;
                if (status === 0) {
                    setDisableSubmit(false)
                    toast.error(message);
                } else {
                    setFormId(response.payload.data._id)
                    toast.success(message);
                }
            } else {
                setDisableSubmit(false)
                toast.error('An unexpected error occurred.');
            }
        } catch (error) {
            setDisableSubmit(false)
            toast.error(error.message);
        }
    }

    const handleFileValidation = async () => {
        try {
            const fileObjects = Array.from(selectedFiles).map(file => ({
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
            }));
            await fileValidationSchema.validate({files: fileObjects}, {abortEarly: false});

            setErrors(fileValidations);
            setErrorMessages(fileValidationMessages());
            return true;
        } catch (validationError) {
            const validationErrors = fileValidations();
            const newErrorMessages = fileValidationMessages();

            validationError.inner.forEach((error) => {
                validationErrors[error.path] = true;
                newErrorMessages[error.path] = error.message;
            });

            setErrors(validationErrors);
            setErrorMessages(newErrorMessages);
            return false;
        }
    };

    const fileChange = (e) => {
        const files = e.target.files;
        setSelectedFiles(files);
    }

    return (
        <>
            <StepNumber pageNumber={4}/>
            <div className="container-fluid">
                <AppForm title="Review" text="">
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <FileUpload
                                required={true}
                                label="Upload Files"
                                identifier="files"
                                errorMessage={errorMessages.files}
                                isInvalid={errors.files}
                                handleFileChange={fileChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="row col-md-8">
                            <div className="col-md-6 mb-4">
                                <div className="col-md-12 border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Order Information</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Client Loan Number
                                        <span className="fs-4">{data.clientLoanNumber ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Report Type
                                        <span className="fs-4">{data.reportType ?? ''}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="col-md-12 border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Property Information</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Residential Property Type
                                        <span className="fs-4">{data.propertyType ?? ''}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-12 d-flex justify-content-between border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Property Specs</label>
                                    <label className="form-label fs-4 fw-bold">Current</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Above Grade Sqft
                                        <span className="fs-4">{data?.propertySpecs.aboveGradeSqft ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Bedrooms
                                        <span className="fs-4">{data?.propertySpecs.bedrooms ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Bathrooms
                                        <span className="fs-4">{data?.propertySpecs.bathrooms ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Year Built
                                        <span className="fs-4">{data?.propertySpecs.yearBuilt ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Stories
                                        <span className="fs-4">{data?.propertySpecs.stories ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Lot size
                                        <span className="fs-4">{data.propertySpecs && data.propertySpecs.lotSize ? data.propertySpecs.lotSize + ' Sqft' : ''}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="col-md-12 border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Report Contact Information</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Contact Name
                                        <span className="fs-4">{data.contactInformation.name ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Contact Phone
                                        <span className="fs-4">{data.contactInformation.phone ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Contact Email
                                        <span className="fs-4">{data.contactInformation.email ?? ''}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {fileUploadLineItems.lineItems && <div className="col-md-4 border-start">
                            <div className="col-md-12 mb-4">
                                <div className="col-md-12 border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">File Upload Line Items</label>
                                </div>
                                <ul key="file-line-item" className="line-items-list list-group list-group-flush overflow-scroll">
                                    {fileUploadLineItems?.lineItems?.map((val, key) => {
                                        return (
                                            <div key={`${key}-line-item-sub`}>
                                                <li key={key} className="list-group-item d-flex justify-content-between align-items-center fs-4 fw-bold mt-3">
                                                    DESCRIPTION OF WORK
                                                    <span className="fs-4 fw-bold">BUDGET</span>
                                                </li>
                                                {val.map((v, k) => (
                                                    <li key={`${key}-${k}`} className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                                        {v.description}
                                                        <span className="fs-4">{v.budget}</span>
                                                    </li>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>}
                    </div>
                </AppForm>
                <BottomPanel valdiationFn={submitData} stepNumber={4} disableButton={disableSubmit}/>
            </div>
        </>
)
}

export default FormStepFour
