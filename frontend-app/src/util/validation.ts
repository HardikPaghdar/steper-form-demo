export const propertyInfoValidations = () => {
	return {
		propertyUploadType: false, address: false, propertyType: false, aboveGradeSqft: false, isThereBasement: false,
		bedrooms: false, bathrooms: false, yearBuilt: false, stories: false, lotSize: false
	}
}

export const propertyInfoValidationMessages = () => {
	return {
		propertyUploadType: '', address: '', propertyType: '', aboveGradeSqft: '', isThereBasement: '', bedrooms: '',
		bathrooms: '', yearBuilt: '', stories: '', lotSize: '',
	}
}

export const contactInfoValidations = () => {
	return {name: false, email: false, phone: false}
}

export const contactInfoValidationMessages = () => {
	return {name: '', email: '', phone: ''}
}

export const orderInfoValidations = () => {
	return {clientId: false, clientLoanNumber: false, reportType: false}
}

export const orderInfoValidationMessages = () => {
	return {clientId: '', clientLoanNumber: '', reportType: ''}
}

export const fileValidations = () => {
	return {files: false}
}

export const fileValidationMessages = () => {
	return {files: ''}
}
