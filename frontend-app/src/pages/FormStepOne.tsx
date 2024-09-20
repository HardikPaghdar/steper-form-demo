import BottomPanel from '../components/UI/BottomPanel'
import AppForm from '../components/UI/AppForm'
import Input from '../components/UI/Input'
import StepNumber from '../components/UI/StepNumber'
import {useAppDispatch, useAppSelector} from '../hooks/hooks'
import {orderInfoValidationMessages, orderInfoValidations} from '../util/validation'
import {useEffect, useState} from 'react'
import Dropdown from "../components/UI/Dropdown";
import {fetchClients, fetchReportTypes, formModeActions} from "../components/store/formSlice";
import Radio from "../components/UI/Radio";
import * as Yup from "yup";

const FormStepOne = () => {
    const dispatch = useAppDispatch()
    const {
        clients,
        clientId,
        clientLoanNumber,
        reportType,
        reportTypes,
    } = useAppSelector(state => state.formMode)
    const [clientSelected, setClientSelected] = useState(false);
    const [errorMessages, setErrorMessages] = useState(orderInfoValidationMessages())
    const [errors, setErrors] = useState(orderInfoValidations())

    const validationSchema = Yup.object().shape({
        clientId: Yup.string().required('Please select client'),
        clientLoanNumber: Yup.string().required('Please enter loan number'),
        reportType: Yup.string().required('Please select report type'),
    });

    useEffect(() => {
        if (clients.length === 0) {
            dispatch(fetchClients())
        }
    }, [clients.length, dispatch])

    useEffect(() => {
        if (!clientId) {
            setClientSelected(false);
        } else {
            dispatch(fetchReportTypes())
            setClientSelected(true);
        }
    }, [clientId, dispatch])

    const handleChange = (id, value) => {
        dispatch(formModeActions.changeValue({inputId: id, inputValue: value}))
    }

    const handleClientDropdownChange = (value) => {
        handleChange('clientLoanNumber', '')
        handleChange('reportType', '')
    };

    const handleValidation = async () => {
        try {
            await validationSchema.validate({clientId, clientLoanNumber, reportType}, {abortEarly: false});
            setErrors(orderInfoValidations());
            setErrorMessages(orderInfoValidationMessages());
            return true;
        } catch (validationError) {
            const validationErrors = orderInfoValidations();
            const newErrorMessages = orderInfoValidationMessages();
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
            <StepNumber pageNumber={1}/>
            <div className="container-fluid">
                <AppForm text="" title="Order Information">
                    <div className="row">
                        <div className="col-md-6">
                            <Dropdown
                                required={true}
                                identifier="clientId"
                                label="Client"
                                options={clients}
                                isInvalid={errors.clientId}
                                errorMessage={errorMessages.clientId}
                                onChange={handleClientDropdownChange}
                            />
                        </div>
                    </div>
                    {clientSelected && <div className="row">
                        <div className="col-md-6">
                            <Input
                                required={true}
                                inputType="text"
                                identifier="clientLoanNumber"
                                placeholder=""
                                label="Loan Number"
                                isInvalid={errors.clientLoanNumber}
                                errorMessage={errorMessages.clientLoanNumber}
                            />
                        </div>
                    </div>}
                    {clientSelected && <div className="row">
                        <div className="col-md-6">
                            <Radio
                                required={true}
                                identifier="reportType"
                                label="Report Type"
                                options={reportTypes}
                                isInvalid={errors.reportType}
                                errorMessage={errorMessages.reportType}
                            />
                        </div>
                    </div>}

                </AppForm>
                <BottomPanel valdiationFn={handleValidation} stepNumber={1}/>
            </div>
        </>
    )
}

export default FormStepOne
