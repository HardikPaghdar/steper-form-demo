import {useEffect, useState} from 'react'
import BottomPanel from '../components/UI/BottomPanel'
import AppForm from '../components/UI/AppForm'
import StepNumber from '../components/UI/StepNumber'
import {useAppDispatch, useAppSelector} from '../hooks/hooks'
import {propertyInfoValidations, propertyInfoValidationMessages} from "../util/validation";
import Radio from "../components/UI/Radio";
import Input from "../components/UI/Input";
import * as Yup from 'yup';
import {formModeActions} from "../components/store/formSlice";

const FormStepOne = () => {
    const dispatch = useAppDispatch()
    const {
        propertyUploadType,
        address,
        propertyType,
        propertySpecs,
    } = useAppSelector(state => state.formMode)

    const [errorMessages, setErrorMessages] = useState(propertyInfoValidationMessages())
    const [errors, setErrors] = useState(propertyInfoValidations())

    const validationSchema = Yup.object().shape({
        propertyUploadType: Yup.string().required('Please select upload type'),
        address: Yup.string().required('Please enter address'),
        propertyType: Yup.string().required('Please select property type'),
        aboveGradeSqft: Yup.string().required('Please enter value'),
        isThereBasement: Yup.string().required('Please select value'),
        bedrooms: Yup.string().required('Please enter value'),
        bathrooms: Yup.string().required('Please enter value'),
        yearBuilt: Yup.string().required('Please enter value'),
        stories: Yup.string().required('Please enter value'),
        lotSize: Yup.string().required('Please enter value'),
    });
    const [showPropertyAndAddress, setShowPropertyAndAddress] = useState(false);
    const [showPropertySpecs, setShowPropertySpecs] = useState(false);


    useEffect(() => {
        if (!propertyUploadType || propertyUploadType === 'batch') {
            setShowPropertyAndAddress(false);
            setShowPropertySpecs(false)
        } else {
            setShowPropertyAndAddress(true);
        }
    }, [propertyUploadType])

    useEffect(() => {
        if (!propertyType) {
            setShowPropertySpecs(false);
        } else {
            setShowPropertySpecs(true);
        }
    }, [propertyType])

    const handleChange = (id, value) => {
        dispatch(formModeActions.changeValue({inputId: id, inputValue: value}))
    }

    const handlePropertyUploadTypeChange = (value) => {
        if (value === 'batch') {
            handleChange('address', '');
            handleChange('propertyType', '');
            setErrors(propertyInfoValidations());
            setErrorMessages(propertyInfoValidationMessages());
            dispatch(formModeActions.resetPropertySpecs())
        }
    };

    const handlePropertyTypeChange = () => {
        dispatch(formModeActions.resetPropertySpecs())
    };

    const handleValidation = async () => {
        try {
            await validationSchema.validate({propertyUploadType, address, propertyType, ...propertySpecs}, {abortEarly: false});
            setErrors(propertyInfoValidations());
            setErrorMessages(propertyInfoValidationMessages());
            return true;
        } catch (validationError) {
            const validationErrors = propertyInfoValidations();
            const newErrorMessages = propertyInfoValidationMessages();
            validationError.inner.forEach((error) => {
                validationErrors[error.path] = true;
                newErrorMessages[error.path] = error.message;
            });
            setErrors(validationErrors);
            setErrorMessages(newErrorMessages);
            return false;
        }
    }

    return (
        <>
            <StepNumber pageNumber={2}/>
            <div className="container-fluid">
                <AppForm title="Property Information" text="">
                    <div className="plan-container">
                        <div className="row">
                            <div className="col-md-6">
                                <Radio
                                    required={true}
                                    identifier="propertyUploadType"
                                    label="Property Upload Type"
                                    options={[
                                        {value: 'single', label: 'Single'},
                                        {value: 'batch', label: 'Batch'},
                                    ]}
                                    onChange={handlePropertyUploadTypeChange}
                                    isInvalid={errors.propertyUploadType}
                                    errorMessage={errorMessages.propertyUploadType}
                                />
                            </div>
                        </div>

                        <div className="row">
                            {showPropertyAndAddress && <div className="col-md-4">
                                <div className="col-md-12">
                                    <Input
                                        required={true}
                                        inputType="text"
                                        identifier="address"
                                        placeholder="Address"
                                        label="Address"
                                        isInvalid={errors.address}
                                        errorMessage={errorMessages.address}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <Radio
                                        required={true}
                                        identifier="propertyType"
                                        label="Select the property type"
                                        options={[
                                            {value: 'sfr-detached', label: 'Single-Family Residential(SFR) - Detached'},
                                            {
                                                value: 'townhouse-rowhouse',
                                                label: 'Townhouse/Rowhouse (Single-Family Attached)'
                                            },
                                            {value: 'condominium', label: 'Condominium'},
                                            {value: 'duplex', label: 'Duplex (Both Units - Single Ownership)'},
                                            {value: 'triplex', label: 'Triplex'},
                                            {value: 'quadruplex', label: 'Quadruplex'},
                                            {value: 'mobile', label: 'Mobile'},
                                        ]}
                                        isInvalid={errors.propertyType}
                                        errorMessage={errorMessages.propertyType}
                                        isColumnStructure={true}
                                        onChange={handlePropertyTypeChange}
                                    />
                                </div>
                            </div>}
                            {showPropertySpecs && <div className="col-md-4">
                                <div className="col-md-12 border-bottom mb-4">
                                    <label className="form-label fs-4 fw-bold">Property Specs</label>
                                </div>
                                <div className="col-md-12">
                                    <Input
                                        required={true}
                                        inputType="number"
                                        identifier="aboveGradeSqft"
                                        placeholder="Current"
                                        label="Above Grade Sqft"
                                        isInvalid={errors.aboveGradeSqft}
                                        errorMessage={errorMessages.aboveGradeSqft}
                                    />
                                </div>
                                <Radio
                                    required={true}
                                    identifier="isThereBasement"
                                    label="Is there a basement"
                                    options={[
                                        {value: 'yes', label: 'Yes'},
                                        {value: 'no', label: 'No'},
                                    ]}
                                    isInvalid={errors.isThereBasement}
                                    errorMessage={errorMessages.isThereBasement}
                                />
                                <div className="col-md-12">
                                    <Input
                                        required={true}
                                        inputType="number"
                                        identifier="bedrooms"
                                        placeholder="Current"
                                        label="Bedrooms"
                                        isInvalid={errors.bedrooms}
                                        errorMessage={errorMessages.bedrooms}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <Input
                                        required={true}
                                        inputType="number"
                                        identifier="bathrooms"
                                        placeholder="Current"
                                        label="Bathrooms"
                                        isInvalid={errors.bathrooms}
                                        errorMessage={errorMessages.bathrooms}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <Input
                                        required={true}
                                        inputType="number"
                                        identifier="yearBuilt"
                                        placeholder="Current"
                                        label="Year Built"
                                        isInvalid={errors.yearBuilt}
                                        errorMessage={errorMessages.yearBuilt}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <Input
                                        required={true}
                                        inputType="number"
                                        identifier="stories"
                                        placeholder="Current"
                                        label="Stories"
                                        isInvalid={errors.stories}
                                        errorMessage={errorMessages.stories}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <Input
                                        required={true}
                                        inputType="number"
                                        identifier="lotSize"
                                        placeholder="Sqft"
                                        label="Lot Size"
                                        isInvalid={errors.lotSize}
                                        errorMessage={errorMessages.lotSize}
                                    />
                                </div>
                            </div>}
                        </div>

                    </div>
                </AppForm>
                <BottomPanel valdiationFn={handleValidation} stepNumber={2}/>
            </div>
        </>
    )
}

export default FormStepOne
