import {useState} from "react";
import AppForm from '../components/UI/AppForm'
import BottomPanel from '../components/UI/BottomPanel'
import StepNumber from '../components/UI/StepNumber'
import Input from "../components/UI/Input";
import * as Yup from 'yup';
import {useAppSelector} from "../hooks/hooks";
import {contactInfoValidationMessages, contactInfoValidations} from "../util/validation";

const FormStepThree = () => {
    const {contactInformation} = useAppSelector(state => state.formMode)

    const [errorMessages, setErrorMessages] = useState(contactInfoValidationMessages())
    const [errors, setErrors] = useState(contactInfoValidations())
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter contact name'),
        email: Yup.string().email('Invalid email format').required('Please enter contact email'),
        phone: Yup.string().required('Please enter contact phone'),
    });

    const handleValidation = async () => {
        try {
            await validationSchema.validate(contactInformation, {abortEarly: false});
            setErrors(contactInfoValidations());
            setErrorMessages(contactInfoValidationMessages());
            return true;
        } catch (validationError) {
            const validationErrors = contactInfoValidations();
            const newErrorMessages = contactInfoValidationMessages();
            validationError.inner.forEach((error) => {
                validationErrors[error.path] = true;
                newErrorMessages[error.path] = error.message;
            });
            setErrors(validationErrors);
            setErrorMessages(newErrorMessages);
            return false;
        }
    };

    return (
        <>
            <StepNumber pageNumber={3}/>
            <div className="container-fluid">
                <AppForm title="Report Contact Information" text="">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="col-md-12">
                                <Input
                                    required={true}
                                    inputType="text"
                                    identifier="name"
                                    placeholder="Contact Name"
                                    label="Contact Name"
                                    isInvalid={errors.name}
                                    errorMessage={errorMessages.name}
                                />
                            </div>
                            <div className="col-md-12">
                                <Input
                                    required={true}
                                    inputType="text"
                                    identifier="phone"
                                    placeholder="Contact Phone"
                                    label="Contact Phone"
                                    isInvalid={errors.phone}
                                    errorMessage={errorMessages.phone}
                                />
                            </div>
                            <div className="col-md-12">
                                <Input
                                    required={true}
                                    inputType="text"
                                    identifier="email"
                                    placeholder="Contact Email"
                                    label="Contact Email"
                                    isInvalid={errors.email}
                                    errorMessage={errorMessages.email}
                                />
                            </div>
                        </div>
                    </div>
                </AppForm>
                <BottomPanel valdiationFn={handleValidation} stepNumber={3}/>
            </div>
        </>
    )
}

export default FormStepThree
