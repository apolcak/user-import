import { useContext } from "react";
import { WizardContext } from "../WizardContext";

import "./CsvTable.scss";

const columns = [
	"Email",
	"First Name",
	"Last Name",
	"Phone",
	"Role",
	"Location",
];

const CsvTable = ({ tableData, editedData, setEditedData }) => {
	const [steps, step, validateCell] = useContext(WizardContext);

	const handleCellChange = (rowIndex, colIndex, newValue) => {
		const newData = [...editedData];
		newData[rowIndex][colIndex] = newValue;
		setEditedData(newData);
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						{columns.map((col) => (
							<th key={col}>{col}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tableData.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, colIndex) => (
								<td key={colIndex}>
									<input
										type="text"
										value={cell}
										onChange={(e) =>
											handleCellChange(
												rowIndex,
												colIndex,
												e.target.value
											)
										}
										className={
											!validateCell(cell, colIndex)
												? "is-invalid"
												: ""
										}
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default CsvTable;
