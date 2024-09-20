import React from 'react'

const Step: React.FC<{ pageNumber: number; stepNumber: number; text: string }> = props => {
	const isActive: boolean = props.pageNumber === props.stepNumber || props.pageNumber > props.stepNumber;
	return (
		<div className="steps__step">
			<div className="steps__step-indicator">
				<p className={`steps__step-indicator-text`}>
					{props.stepNumber}
				</p>
				{isActive && <div className="steps__bg"/>}
			</div>
			<div className="steps__step-text">
				<p className="steps__step-name">{props.text}</p>
			</div>
		</div>
	)
}

export default Step
