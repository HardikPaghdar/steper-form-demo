import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {formModeActions} from '../store/formSlice';

type RadioPropsType = {
    required: boolean;
    label: string;
    identifier: string;
    options: { value: string; label: string }[];
    errorMessage: string;
    isInvalid: boolean;
    isColumnStructure?: boolean;
    onChange?: (value: string) => void;
};

const Radio: React.FC<RadioPropsType> = (props) => {
    const selectedValue = useAppSelector((state) => {
        if (props.identifier in state.formMode.propertySpecs) {
            return state.formMode.propertySpecs[props.identifier];
        }
        return state.formMode[props.identifier];
    });
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(formModeActions.changeValue({inputValue: e.target.value, inputId: props.identifier}));
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    return (
        <div className="mb-4">
            <label
                className={`form-label fs-4 ${props.required ? 'required' : ''}`}
                htmlFor={props.identifier}
            >
                {props.label}
            </label>

            <div className={!props.isColumnStructure ? 'd-flex' : ''}>
                {props.options.map((option) => (
                    <div key={option.value} className="form-check px-0 pe-4">
                        <input
                            type="radio"
                            name={props.identifier}
                            id={`${props.identifier}-${option.value}`}
                            className="btn-check fs-4"
                            onChange={handleChange}
                            checked={selectedValue === option.value}
                            value={option.value}
                        />
                        <label
                            htmlFor={`${props.identifier}-${option.value}`}
                            className={`btn btn-outline-primary fs-4 ${props.isColumnStructure ? 'width-400' : ''}`}
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            {props.isInvalid && <p className="d-flex invalid-feedback fs-4">{props.errorMessage}</p>}

        </div>

    );
};

export default Radio;
