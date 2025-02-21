import { useState } from "react";
import { WizardContext } from "./WizardContext";

import Steps from "./components/Steps";
import StepContent from "./components/StepContent";
import CsvTable from "./components/CsvTable";
import OverviewTable from "./components/OverviewTable";
import FileDrop from "./components/FileDrop";

import "./App.scss";

const FORM_STEPS = [
	{ title: "User import", instructions: "" },
	{
		title: "Upload CSV File",
		instructions:
			"Specify separator and select CSV file with exactly 6 columns (Email,First name, Last name, Phone, Role and Location). Specify the separator before file upload.",
	},
	{
		title: "Loaded data",
		instructions:
			"Email, First name and Last name are required.Phone should contain just numbers.",
	},
	{
		title: "Confirm import",
		instructions: "Check import overview and confirm by Submitbutton.",
	},
	{ title: "✅", instructions: "" },
];

function App() {
	const [step, setStep] = useState(1);
	const [name, setName] = useState("");
	const [note, setNote] = useState("");
	const [uploadedFile, setUploadedFile] = useState(null);
	const [csvData, setCsvData] = useState([]);
	const [editedData, setEditedData] = useState([]);

	const nameValidation = () => {
		return name.trim().length < 3 ? false : true;
	};
	const noteValidation = () => {
		return note.trim().length > 0 ? true : false;
	};

	// Derived states
	let isNameValid = nameValidation();
	let isNoteValid = noteValidation();

	const handleBackStep = () => {
		if (step > 1) setStep((s) => s - 1);
	};
	const handleNextStep = () => {
		if (step < 5 && validateStep()) setStep((s) => s + 1);
	};

	const validateStep = () => {
		let isStepValid = false;

		switch (step) {
			case 1:
				isNameValid = nameValidation();
				isNoteValid = noteValidation();

				if (!isNameValid) {
					alert("Import name should has at least 3 characters.");
					isStepValid = false;
				} else if (!isNoteValid) {
					alert("You should fill some Note.");
					isStepValid = false;
				} else {
					isStepValid = true;
				}
				break;
			case 2:
				if (csvData.length === 0) {
					alert("Please upload a valid CSV file before proceeding.");
					isStepValid = false;
				} else {
					isStepValid = true;
				}
				break;
			case 3:
				isStepValid = true;
				rowLoop: for (let row of editedData) {
					for (let i = 0; i < 6; i++) {
						if (!validateCell(row[i], i)) {
							alert(
								"Some cells contain invalid data. Please correct them before proceeding."
							);
							isStepValid = false;
							break rowLoop;
						}
					}
				}
				break;
			case 4:
				isStepValid = true;
				break;
			default:
				isStepValid = true;
				break;
		}

		return isStepValid;
	};

	const validateCell = (value, colIndex) => {
		switch (colIndex) {
			case 0: // Email validation
				return value.trim() && /\S+@\S+\.\S+/.test(value);
			case 1: // First name
			case 2: // Last name
				return value.trim() !== "";
			case 3: // Phone number
				return (
					value.trim() === "" ||
					(/^[0-9]+$/.test(value) && value.length >= 9)
				);
			default:
				return true;
		}
	};

	const overviewRows = [
		{ name: "Import name", value: name },
		{ name: "Note", value: note },
		{ name: "User count", value: editedData.length },
	];

	return (
		<WizardContext.Provider value={[FORM_STEPS, step, validateCell]}>
			<div className="wizard">
				<div className="wizard__inner">
					{step < 5 && <Steps />}
					<div>
						{step === 1 && (
							<StepContent>
								<label htmlFor="import-name">
									Import name
									<input
										type="text"
										name="import-name"
										id="import-name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										required
									/>
								</label>
								<label htmlFor="import-note">
									Note
									<textarea
										name="import-note"
										id="import-note"
										value={note}
										onChange={(e) =>
											setNote(e.target.value)
										}
										required
									></textarea>
								</label>
							</StepContent>
						)}
						{step === 2 && (
							<StepContent>
								<FileDrop
									uploadedFile={uploadedFile}
									setUploadedFile={setUploadedFile}
									setEditedData={setEditedData}
									setCsvData={setCsvData}
								/>
							</StepContent>
						)}
						{step === 3 && (
							<StepContent>
								<div className="table-wrapper">
									<CsvTable
										tableData={editedData}
										editedData={editedData}
										setEditedData={setEditedData}
										validateCell={validateCell}
									/>
								</div>
								<p>The table is scrollable ◀︎▶︎</p>
							</StepContent>
						)}
						{step === 4 && (
							<StepContent>
								<OverviewTable rows={overviewRows} />
							</StepContent>
						)}
						{step === 5 && (
							<StepContent>
								Your data has been sent successfully 👍
							</StepContent>
						)}
					</div>
				</div>
				{step < 5 && (
					<div className="wizard__nav">
						<button
							onClick={handleBackStep}
							disabled={step === 1 ? "disabled" : ""}
						>
							Back
						</button>
						{step < 4 && (
							<button
								onClick={handleNextStep}
								disabled={step === 4 ? "disabled" : ""}
							>
								Next
							</button>
						)}
						{step === 4 && (
							<button onClick={handleNextStep}>Submit</button>
						)}
					</div>
				)}
			</div>
		</WizardContext.Provider>
	);
}

export default App;
