import { useContext } from "react";
import { WizardContext } from "../WizardContext";

import "./StepContent.scss";

const StepContent = ({ children }) => {
	const [steps, step] = useContext(WizardContext);

	const currentStep = steps[step - 1];

	return (
		<section className={`step-content step-content--${step}`}>
			<h2 className="step-content__heading">{currentStep.title}</h2>
			{currentStep.instructions && (
				<p className="step-content__instructions">
					{currentStep.instructions}
				</p>
			)}
			{children}
		</section>
	);
};

export default StepContent;
