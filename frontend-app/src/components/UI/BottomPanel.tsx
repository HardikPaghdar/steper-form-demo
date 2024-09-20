import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/hooks'
import { formModeActions } from '../store/formSlice'

const BottomPanel: React.FC<{ stepNumber: number; valdiationFn: () => any, disableButton?: boolean }> = props => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleSendData = async () => {
		await props.valdiationFn()
	}
	const handleButtonClick = async () => {
		const isValid = await props.valdiationFn();
		if (isValid) {
			dispatch(formModeActions.hideValidationError())
			navigate(`/step-${props.stepNumber + 1}`)
		} else {
			dispatch(formModeActions.showValidationError())
		}
	}
	let button
	if (props.stepNumber === 4) {
		button = (<button className="bottom-panel__btn" disabled={!!props.disableButton} onClick={handleSendData}>Submit Order</button>)
	} else {
		button = (<button className="bottom-panel__btn" disabled={!!props.disableButton} onClick={handleButtonClick}>Next Step</button>)
	}
	return (
		<div className="bottom-panel">
			{props.stepNumber !== 1 && !props.disableButton && (
				<Link className="bottom-panel__text-btn" to={`/step-${props.stepNumber - 1}`}>Go back</Link>
			)}
			{button}
		</div>
	)
}

export default BottomPanel
