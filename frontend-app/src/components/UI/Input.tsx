import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { formModeActions } from '../store/formSlice';

type InputPropsType = {
	required: boolean;
	inputType: string;
	placeholder: string;
	label: string;
	identifier: string;
	errorMessage: string;
	isInvalid: boolean;
};

const Input: React.FC<InputPropsType> = (props) => {
	const inputValue = useAppSelector((state) => {
		if (props.identifier in state.formMode.propertySpecs) {
			return state.formMode.propertySpecs[props.identifier];
		}
		if (props.identifier in state.formMode.contactInformation) {
			return state.formMode.contactInformation[props.identifier];
		}
		return state.formMode[props.identifier];
	});

	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();

	const handleChangeValue = () => {
		dispatch(formModeActions.changeValue({ inputValue: inputRef.current?.value, inputId: props.identifier }));
	};

	return (
		<div className="mb-4">
			<label className={`form-label fs-4 ${props.required ? 'required' : ''}`} htmlFor={props.identifier}>{props.label}</label>
			<input
				className={`form-control fs-4 ${props.isInvalid ? 'is-invalid' : ''}`}
				id={props.identifier}
				ref={inputRef}
				type={props.inputType}
				placeholder={props.placeholder}
				value={inputValue || ''}
				onChange={handleChangeValue}
			/>
			{props.isInvalid && <p className="invalid-feedback fs-4">{props.errorMessage}</p>}
		</div>
	);
};

export default Input;
