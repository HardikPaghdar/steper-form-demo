import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {formModeActions} from '../store/formSlice';
import Select from 'react-select';

type DropdownPropsType = {
    required: boolean;
    label: string;
    identifier: string;
    options: { value: string; label: string }[];
    errorMessage: string;
    isInvalid: boolean;
    onChange?: (value: string) => void;
};

const Dropdown: React.FC<DropdownPropsType> = (props) => {
    const selectedValue = useAppSelector((state) => state.formMode[props.identifier]);
    const dispatch = useAppDispatch();

    const handleChange = (e: any) => {
        dispatch(formModeActions.changeValue({inputValue: e.value, inputId: props.identifier}));
        if (props.onChange) {
            props.onChange(e.value);
        }
    };

    return (
        <div className="mb-4">
            <label className={`form-label fs-4 ${props.required ? 'required' : ''}`} htmlFor={props.identifier}>{props.label}</label>
            <Select
                className={`fs-4 ${props.isInvalid ? 'is-invalid' : ''}`}
                classNamePrefix="select"
                id={props.identifier}
                value={selectedValue ? props.options.filter(fl => fl.value === selectedValue) : {value: '', label: 'Select client'}}
                onChange={handleChange}
                options={props.options}
            />

            {props.isInvalid && <p id={`${props.identifier}_error`} className="invalid-feedback fs-4">{props.errorMessage}</p>}
        </div>
    );
};

export default Dropdown;
