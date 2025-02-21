import { useContext } from "react";
import { WizardContext } from "../WizardContext";

import "./Steps.scss";

const Steps = () => {
	const [steps, step] = useContext(WizardContext);

	return (
		steps && (
			<div className="steps">
				{steps.map((stepItem, index) => {
					return (
						<span
							key={index + 1}
							className={`step${
								index + 1 === step ? " active" : ""
							}`}
						>
							{index + 1}
						</span>
					);
				})}
			</div>
		)
	);
};

export default Steps;
