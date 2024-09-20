import Step from './Step'

const StepNumber: React.FC<{ pageNumber: number }> = props => {
	return (
		<div className="steps">
			<Step pageNumber={props.pageNumber} stepNumber={1} text="Order Information" />
			<Step pageNumber={props.pageNumber} stepNumber={2} text="Property Information" />
			<Step pageNumber={props.pageNumber} stepNumber={3} text="Recipients" />
			<Step pageNumber={props.pageNumber} stepNumber={4} text="Review" />
		</div>
	)
}

export default StepNumber
