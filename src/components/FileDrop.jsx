import { useState } from "react";

import Dropzone from "react-dropzone";
import Papa from "papaparse";

import "./FileDrop.scss";

const FileDrop = ({
	uploadedFile,
	setUploadedFile,
	setEditedData,
	setCsvData,
}) => {
	const [separator, setSeparator] = useState(",");
	// const [uploadedFile, setUploadedFile] = useState(null);

	const handleFileUpload = (acceptedFiles) => {
		// Check number of uploaded files
		if (acceptedFiles.length !== 1) {
			alert("Please upload exactly one file.");
			clearFileSelection();
			return;
		}

		const file = acceptedFiles[0];

		// Check file type
		if (!file.name.endsWith(".csv")) {
			alert("Invalid file type. Please upload a CSV file.");
			clearFileSelection();
			return;
		}

		setUploadedFile(file);

		Papa.parse(file, {
			delimiter: separator,
			complete: (result) => {
				const parsedData = result.data;
				// Ensure there are 6 columns per row
				if (parsedData[0].length !== 6) {
					alert(
						"CSV must contain exactly 6 columns. Doublecheck your file or try different separator."
					);
					clearFileSelection();
					return;
				}
				setCsvData(parsedData);
				setEditedData(parsedData);
			},
		});
	};

	const handleRemoveFile = () => {
		clearFileSelection();
	};

	const clearFileSelection = () => {
		setUploadedFile(null);
		setCsvData([]);
		setEditedData([]);
	};

	return (
		<>
			<label htmlFor="csv-separator" className="separator">
				Specify a separator:
				<input
					type="text"
					id="csv-separator"
					value={separator}
					onChange={(e) => setSeparator(e.target.value)}
				/>
			</label>
			<Dropzone onDrop={handleFileUpload}>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()} className="dropzone">
						<input {...getInputProps()} />
						<p>
							Drag and drop a CSV file here, or click to select a
							file
						</p>
					</div>
				)}
			</Dropzone>
			{uploadedFile && (
				<aside className="uploaded-file">
					<h4 className="uploaded-file__heading">Selected file:</h4>
					<div className="uploaded-file__list">
						<button
							onClick={handleRemoveFile}
							className="uploaded-file__remove"
							title="Remove file"
						>
							❌
						</button>
						<i>{uploadedFile.name}</i>
						<small>({uploadedFile.size}&nbsp;b)</small>
					</div>
				</aside>
			)}
		</>
	);
};

export default FileDrop;
